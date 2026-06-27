import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";

// GET /api/projects — List user's projects
export async function GET(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const status = searchParams.get("status");

    const where = {
      userId: session.user.id,
      ...(status && { status }),
    };

    const [projects, total] = await Promise.all([
      db.project.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
        select: {
          id: true,
          title: true,
          status: true,
          niche: true,
          duration: true,
          fileSize: true,
          viralityScore: true,
          progress: true,
          thumbnailUrl: true,
          exportedPlatforms: true,
          createdAt: true,
          updatedAt: true,
        },
      }),
      db.project.count({ where }),
    ]);

    // Serialize BigInt
    const serialized = projects.map((p) => ({
      ...p,
      fileSize: p.fileSize.toString(),
    }));

    return NextResponse.json({
      success: true,
      data: {
        projects: serialized,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      },
    });
  } catch (error) {
    console.error("Projects list error:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}
