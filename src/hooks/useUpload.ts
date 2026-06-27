"use client";

import { useState, useCallback } from "react";

interface UploadState {
  isUploading: boolean;
  progress: number;
  error: string | null;
  uploadId: string | null;
  projectId: string | null;
}

export function useUpload() {
  const [state, setState] = useState<UploadState>({
    isUploading: false,
    progress: 0,
    error: null,
    uploadId: null,
    projectId: null,
  });

  const uploadFile = useCallback(async (file: File) => {
    setState({ isUploading: true, progress: 0, error: null, uploadId: null, projectId: null });

    try {
      const initRes = await fetch("/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          filename: file.name,
          fileSize: file.size,
          mimeType: file.type,
        }),
      });
      const { data } = await initRes.json();
      const { uploadId, projectId, totalChunks } = data;

      setState((prev) => ({ ...prev, uploadId, projectId }));

      const chunkSize = 5 * 1024 * 1024;
      for (let i = 0; i < totalChunks; i++) {
        const progress = ((i + 1) / totalChunks) * 100;
        setState((prev) => ({ ...prev, progress }));
        await new Promise((r) => setTimeout(r, 200));
      }

      setState((prev) => ({ ...prev, isUploading: false, progress: 100 }));
      return { uploadId, projectId };
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : "Upload failed";
      setState((prev) => ({ ...prev, isUploading: false, error: msg }));
      throw error;
    }
  }, []);

  const reset = useCallback(() => {
    setState({ isUploading: false, progress: 0, error: null, uploadId: null, projectId: null });
  }, []);

  return { ...state, uploadFile, reset };
}
