import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { getUploadPresignedUrl, generateUploadKey } from "@/lib/storage";

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { filename, fileSize, contentType } = await request.json();

    if (!filename || !fileSize || !contentType) {
      return NextResponse.json(
        { error: "Missing required fields: filename, fileSize, contentType" },
        { status: 400 }
      );
    }

    // Validate file type
    const allowedTypes = [
      "video/mp4",
      "video/quicktime",
      "video/x-msvideo",
      "video/x-matroska",
      "video/webm",
    ];
    if (!allowedTypes.includes(contentType)) {
      return NextResponse.json(
        { error: "Unsupported video format" },
        { status: 400 }
      );
    }

    // Check storage limit
    const user = await db.user.findUnique({
      where: { id: session.user.id },
      select: { storageUsed: true, storageLimit: true },
    });

    if (user && user.storageUsed + BigInt(fileSize) > user.storageLimit) {
      return NextResponse.json(
        { error: "Storage limit exceeded. Please upgrade your plan." },
        { status: 403 }
      );
    }

    // Create project record
    const project = await db.project.create({
      data: {
        title: filename.replace(/\.[^.]+$/, ""),
        userId: session.user.id,
        fileSize: BigInt(fileSize),
        status: "uploading",
      },
    });

    // Generate storage key and presigned URL
    const key = generateUploadKey(session.user.id, project.id, filename);
    const uploadUrl = await getUploadPresignedUrl(key, contentType);

    // Save file key to project
    await db.project.update({
      where: { id: project.id },
      data: { fileKey: key },
    });

    return NextResponse.json({
      success: true,
      data: {
        uploadUrl,
        projectId: project.id,
        key,
      },
    });
  } catch (error) {
    console.error("Upload presign error:", error);
    return NextResponse.json(
      { error: "Failed to generate upload URL" },
      { status: 500 }
    );
  }
}
