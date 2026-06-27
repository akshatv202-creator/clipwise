import OpenAI from "openai";
import { getFileBuffer } from "@/lib/storage";

function getOpenAI() {
  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
}

export interface TranscriptionSegment {
  start: number;
  end: number;
  text: string;
}

export interface TranscriptionResult {
  text: string;
  language: string;
  duration: number;
  segments: TranscriptionSegment[];
}

/**
 * Transcribe a video/audio file using OpenAI Whisper.
 * Downloads the file from S3, sends to Whisper, returns word-level timestamps.
 */
export async function transcribeVideo(
  fileKey: string
): Promise<TranscriptionResult> {
  // 1. Download file from S3/R2
  const fileBuffer = await getFileBuffer(fileKey);

  // 2. Create a File object for the OpenAI API
  const file = new File([new Uint8Array(fileBuffer)], "video.mp4", { type: "video/mp4" });

  // 3. Send to Whisper for transcription with timestamps
  const transcription = await getOpenAI().audio.transcriptions.create({
    file: file,
    model: "whisper-1",
    response_format: "verbose_json",
    timestamp_granularities: ["segment"],
  });

  // 4. Parse and return structured result
  const rawResult = transcription as unknown as {
    text: string;
    language?: string;
    duration?: number;
    segments?: Array<{ start: number; end: number; text: string }>;
  };

  const segments: TranscriptionSegment[] = (rawResult.segments || []).map((seg) => ({
    start: seg.start,
    end: seg.end,
    text: seg.text.trim(),
  }));

  return {
    text: rawResult.text,
    language: rawResult.language || "en",
    duration: rawResult.duration || 0,
    segments,
  };
}

/**
 * Generate SRT subtitle file content from transcription segments.
 */
export function generateSRT(segments: TranscriptionSegment[]): string {
  return segments
    .map((seg, i) => {
      const startTime = formatSRTTimestamp(seg.start);
      const endTime = formatSRTTimestamp(seg.end);
      return `${i + 1}\n${startTime} --> ${endTime}\n${seg.text}\n`;
    })
    .join("\n");
}

/**
 * Generate VTT subtitle file content from transcription segments.
 */
export function generateVTT(segments: TranscriptionSegment[]): string {
  const lines = segments.map((seg) => {
    const startTime = formatVTTTimestamp(seg.start);
    const endTime = formatVTTTimestamp(seg.end);
    return `${startTime} --> ${endTime}\n${seg.text}`;
  });
  return `WEBVTT\n\n${lines.join("\n\n")}`;
}

function formatSRTTimestamp(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  const ms = Math.floor((seconds % 1) * 1000);
  return `${pad(h)}:${pad(m)}:${pad(s)},${ms.toString().padStart(3, "0")}`;
}

function formatVTTTimestamp(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  const ms = Math.floor((seconds % 1) * 1000);
  return `${pad(h)}:${pad(m)}:${pad(s)}.${ms.toString().padStart(3, "0")}`;
}

function pad(n: number): string {
  return n.toString().padStart(2, "0");
}
