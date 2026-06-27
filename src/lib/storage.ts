import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

// Works with both AWS S3 and Cloudflare R2 (same S3-compatible API)
const s3 = new S3Client({
  region: process.env.S3_REGION || "auto",
  endpoint: process.env.S3_ENDPOINT, // For R2: https://<account_id>.r2.cloudflarestorage.com
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID!,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
  },
});

const BUCKET = process.env.S3_BUCKET_NAME || "clipwise-uploads";

/**
 * Generate a pre-signed URL for the client to upload directly to S3/R2.
 * This avoids routing large video files through your server.
 */
export async function getUploadPresignedUrl(
  key: string,
  contentType: string,
  maxSizeBytes?: number
): Promise<string> {
  const command = new PutObjectCommand({
    Bucket: BUCKET,
    Key: key,
    ContentType: contentType,
    ...(maxSizeBytes && { ContentLength: maxSizeBytes }),
  });

  const url = await getSignedUrl(s3, command, { expiresIn: 3600 }); // 1 hour
  return url;
}

/**
 * Generate a pre-signed URL for downloading/streaming a file.
 */
export async function getDownloadPresignedUrl(key: string): Promise<string> {
  const command = new GetObjectCommand({
    Bucket: BUCKET,
    Key: key,
  });

  const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
  return url;
}

/**
 * Get a file's content as a buffer (used for sending to AI services).
 */
export async function getFileBuffer(key: string): Promise<Buffer> {
  const command = new GetObjectCommand({
    Bucket: BUCKET,
    Key: key,
  });

  const response = await s3.send(command);

  if (!response.Body) {
    throw new Error(`File not found: ${key}`);
  }

  const chunks: Uint8Array[] = [];
  const stream = response.Body as AsyncIterable<Uint8Array>;
  for await (const chunk of stream) {
    chunks.push(chunk);
  }

  return Buffer.concat(chunks);
}

/**
 * Delete a file from storage.
 */
export async function deleteFile(key: string): Promise<void> {
  const command = new DeleteObjectCommand({
    Bucket: BUCKET,
    Key: key,
  });

  await s3.send(command);
}

/**
 * Generate the storage key (path) for a user's upload.
 */
export function generateUploadKey(
  userId: string,
  projectId: string,
  filename: string
): string {
  // Sanitize filename
  const safe = filename.replace(/[^a-zA-Z0-9._-]/g, "_");
  return `uploads/${userId}/${projectId}/${safe}`;
}

/**
 * Generate the storage key for an exported video.
 */
export function generateExportKey(
  userId: string,
  projectId: string,
  exportId: string,
  platform: string
): string {
  return `exports/${userId}/${projectId}/${exportId}_${platform}.mp4`;
}
