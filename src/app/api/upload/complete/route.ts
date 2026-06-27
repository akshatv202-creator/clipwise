import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { projectId } = await request.json();

    if (!projectId) {
      return NextResponse.json(
        { error: "Missing projectId" },
        { status: 400 }
      );
    }

    // Verify project belongs to user
    const project = await db.project.findFirst({
      where: { id: projectId, userId: session.user.id },
    });

    if (!project) {
      return NextResponse.json(
        { error: "Project not found" },
        { status: 404 }
      );
    }

    // Update project status to ready for analysis
    await db.project.update({
      where: { id: projectId },
      data: {
        status: "analyzing",
        progress: 5,
      },
    });

    // Update user's storage usage
    await db.user.update({
      where: { id: session.user.id },
      data: {
        storageUsed: { increment: project.fileSize },
      },
    });

    return NextResponse.json({
      success: true,
      data: {
        projectId,
        status: "analyzing",
        message: "Upload complete. Ready for AI processing.",
      },
    });
  } catch (error) {
    console.error("Upload complete error:", error);
    return NextResponse.json(
      { error: "Failed to finalize upload" },
      { status: 500 }
    );
  }
}
