import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { generateSRT, generateVTT } from "@/lib/ai/transcribe";

// GET /api/projects/:id/captions?format=srt|vtt
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const { searchParams } = new URL(request.url);
    const format = searchParams.get("format") || "srt";

    const project = await db.project.findFirst({
      where: { id, userId: session.user.id },
      select: { segments: true, title: true },
    });

    if (!project) {
      return NextResponse.json(
        { error: "Project not found" },
        { status: 404 }
      );
    }

    if (!project.segments) {
      return NextResponse.json(
        { error: "No captions available. Process the video first." },
        { status: 400 }
      );
    }

    const segments = project.segments as Array<{
      start: number;
      end: number;
      text: string;
    }>;

    let content: string;
    let mimeType: string;
    let extension: string;

    if (format === "vtt") {
      content = generateVTT(segments);
      mimeType = "text/vtt";
      extension = "vtt";
    } else {
      content = generateSRT(segments);
      mimeType = "application/x-subrip";
      extension = "srt";
    }

    const filename = `${project.title || "captions"}.${extension}`;

    return new Response(content, {
      headers: {
        "Content-Type": mimeType,
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  } catch (error) {
    console.error("Captions error:", error);
    return NextResponse.json(
      { error: "Failed to generate captions" },
      { status: 500 }
    );
  }
}
