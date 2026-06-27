import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { transcribeVideo } from "@/lib/ai/transcribe";
import { analyzeContent, generateSEOContent } from "@/lib/ai/analyze";

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { projectId } = await request.json();

    // Get project
    const project = await db.project.findFirst({
      where: { id: projectId, userId: session.user.id },
    });

    if (!project) {
      return NextResponse.json(
        { error: "Project not found" },
        { status: 404 }
      );
    }

    if (!project.fileKey) {
      return NextResponse.json(
        { error: "No file uploaded for this project" },
        { status: 400 }
      );
    }

    // Update status: analyzing
    await db.project.update({
      where: { id: projectId },
      data: { status: "analyzing", progress: 10 },
    });

    // Step 1: Transcribe video with Whisper
    let transcription;
    try {
      transcription = await transcribeVideo(project.fileKey);

      await db.project.update({
        where: { id: projectId },
        data: {
          transcription: transcription.text,
          language: transcription.language,
          duration: transcription.duration,
          segments: JSON.parse(JSON.stringify(transcription.segments)),
          progress: 40,
        },
      });
    } catch (err) {
      console.error("Transcription failed:", err);
      await db.project.update({
        where: { id: projectId },
        data: { status: "failed", progress: 0 },
      });
      return NextResponse.json(
        { error: "Transcription failed" },
        { status: 500 }
      );
    }

    // Step 2: Analyze content with GPT (niche, scores, style)
    let analysis;
    try {
      analysis = await analyzeContent(transcription);

      await db.project.update({
        where: { id: projectId },
        data: {
          niche: analysis.niche,
          viralityScore: analysis.viralityScore,
          hookScore: analysis.hookScore,
          retentionScore: analysis.retentionScore,
          editingStyle: JSON.parse(JSON.stringify(analysis.editingStyle)),
          analysisData: JSON.parse(JSON.stringify(analysis)),
          progress: 70,
          status: "processing",
        },
      });
    } catch (err) {
      console.error("Analysis failed:", err);
      // Don't fail the whole pipeline — transcription still succeeded
      analysis = null;
    }

    // Step 3: Generate SEO content
    let seoContent = null;
    try {
      seoContent = await generateSEOContent(
        transcription,
        analysis?.niche || "General"
      );

      await db.project.update({
        where: { id: projectId },
        data: {
          analysisData: JSON.parse(JSON.stringify({
            ...(analysis || {}),
            seo: seoContent,
          })),
          progress: 90,
        },
      });
    } catch (err) {
      console.error("SEO generation failed:", err);
    }

    // Mark as ready
    await db.project.update({
      where: { id: projectId },
      data: { status: "ready", progress: 100 },
    });

    // Deduct AI credits
    await db.user.update({
      where: { id: session.user.id },
      data: { credits: { decrement: 10 } },
    });

    return NextResponse.json({
      success: true,
      data: {
        projectId,
        transcription: {
          text: transcription.text,
          language: transcription.language,
          duration: transcription.duration,
          segmentCount: transcription.segments.length,
        },
        analysis: analysis
          ? {
              niche: analysis.niche,
              viralityScore: analysis.viralityScore,
              hookScore: analysis.hookScore,
              retentionScore: analysis.retentionScore,
              editingStyle: analysis.editingStyle,
              sentiment: analysis.sentiment,
              targetAudience: analysis.targetAudience,
            }
          : null,
        seo: seoContent,
        status: "ready",
      },
    });
  } catch (error) {
    console.error("Process start error:", error);
    return NextResponse.json(
      { error: "Processing failed" },
      { status: 500 }
    );
  }
}
