"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Film, Cloud, CheckCircle, X, Sparkles } from "lucide-react";
import { ArrowRight, FileVideo, Clock, HardDrive } from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import ProgressBar from "@/components/ui/ProgressBar";
import { formatFileSize } from "@/lib/utils";

export default function UploadPage() {
  const router = useRouter();
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [projectId, setProjectId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [processingStarted, setProcessingStarted] = useState(false);

  const uploadFile = async (selectedFile: File) => {
    setFile(selectedFile);
    setIsUploading(true);
    setUploadProgress(0);
    setError(null);

    try {
      // 1. Get presigned URL from our API
      const presignRes = await fetch("/api/upload/presign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          filename: selectedFile.name,
          fileSize: selectedFile.size,
          contentType: selectedFile.type,
        }),
      });

      const presignData = await presignRes.json();
      if (!presignRes.ok) {
        throw new Error(presignData.error || "Failed to get upload URL");
      }

      const { uploadUrl, projectId: pid } = presignData.data;
      setProjectId(pid);

      // 2. Upload directly to S3/R2 with progress
      await new Promise<void>((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.upload.onprogress = (e) => {
          if (e.lengthComputable) {
            setUploadProgress((e.loaded / e.total) * 100);
          }
        };
        xhr.onload = () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            resolve();
          } else {
            reject(new Error(`Upload failed: ${xhr.status}`));
          }
        };
        xhr.onerror = () => reject(new Error("Upload network error"));
        xhr.open("PUT", uploadUrl);
        xhr.setRequestHeader("Content-Type", selectedFile.type);
        xhr.send(selectedFile);
      });

      // 3. Notify backend upload is complete
      await fetch("/api/upload/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectId: pid }),
      });

      setIsUploading(false);
      setIsComplete(true);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Upload failed";
      setError(msg);
      setIsUploading(false);
    }
  };

  const startProcessing = async () => {
    if (!projectId) return;
    setProcessingStarted(true);
    router.push(`/processing?id=${projectId}`);
  };

  const resetUpload = () => {
    setFile(null);
    setUploadProgress(0);
    setIsUploading(false);
    setIsComplete(false);
    setProjectId(null);
    setError(null);
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) uploadFile(f);
  }, []);

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const f = e.target.files?.[0];
      if (f) uploadFile(f);
    },
    []
  );

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Upload Video</h1>
        <p className="text-sm text-zinc-400 mt-1">
          Drop your raw footage and let AI do the magic
        </p>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-sm text-red-400">
          {error}
        </div>
      )}

      <AnimatePresence mode="wait">
        {!file ? (
          <motion.div
            key="dropzone"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <label
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className="block cursor-pointer"
            >
              <div
                className={`border-2 border-dashed rounded-3xl p-16 text-center transition-all duration-300 ${
                  isDragging
                    ? "border-violet-500 bg-violet-500/5"
                    : "border-zinc-800 hover:border-violet-500/50"
                }`}
              >
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-500/20 to-cyan-500/20 border border-violet-500/20 flex items-center justify-center mb-6">
                    <Upload className="w-8 h-8 text-violet-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {isDragging
                      ? "Drop your video here"
                      : "Drag & drop your video"}
                  </h3>
                  <p className="text-sm text-zinc-400 mb-6">
                    or click to browse • MP4, MOV, AVI, MKV, WebM
                  </p>
                  <div className="flex items-center gap-6 text-xs text-zinc-500">
                    <span className="flex items-center gap-1">
                      <Film className="w-3 h-3" /> Any resolution
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" /> Any duration
                    </span>
                    <span className="flex items-center gap-1">
                      <HardDrive className="w-3 h-3" /> Up to 10GB
                    </span>
                  </div>
                </div>
              </div>
            </label>
          </motion.div>
        ) : (
          <motion.div
            key="progress"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Card variant="glass" padding="lg">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
                    <FileVideo className="w-6 h-6 text-violet-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium">{file.name}</h3>
                    <p className="text-sm text-zinc-500">
                      {formatFileSize(file.size)}
                    </p>
                  </div>
                </div>
                {!isUploading && (
                  <button
                    onClick={resetUpload}
                    className="text-zinc-500 hover:text-white p-1"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>

              {isUploading && (
                <div className="space-y-3">
                  <ProgressBar
                    value={uploadProgress}
                    variant="glow"
                    size="md"
                    showLabel
                    label="Uploading to cloud..."
                  />
                  <div className="flex items-center gap-2 text-xs text-zinc-400">
                    <Cloud className="w-3 h-3 animate-pulse" />
                    <span>Direct upload to storage • Resumable</span>
                  </div>
                </div>
              )}

              {isComplete && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <div className="flex items-center gap-2 text-emerald-400">
                    <CheckCircle className="w-5 h-5" />
                    <span className="text-sm font-medium">
                      Upload complete!
                    </span>
                  </div>
                  <div className="flex gap-3">
                    <Button
                      variant="primary"
                      size="lg"
                      icon={<Sparkles className="w-4 h-4" />}
                      onClick={startProcessing}
                      loading={processingStarted}
                    >
                      Start AI Processing
                    </Button>
                    <Button
                      variant="secondary"
                      size="lg"
                      icon={<ArrowRight className="w-4 h-4" />}
                      onClick={() =>
                        router.push(`/projects`)
                      }
                    >
                      Go to Projects
                    </Button>
                  </div>
                </motion.div>
              )}
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
