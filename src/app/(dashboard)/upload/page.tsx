"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Film, Cloud, CheckCircle, X, Sparkles, ArrowRight, FileVideo, Clock, HardDrive } from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import ProgressBar from "@/components/ui/ProgressBar";
import { formatFileSize } from "@/lib/utils";

export default function UploadPage() {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<{ name: string; size: number } | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const simulateUpload = (name: string, size: number) => {
    setUploadedFile({ name, size });
    setIsUploading(true);
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) { clearInterval(interval); setIsUploading(false); setIsComplete(true); return 100; }
        return prev + Math.random() * 15;
      });
    }, 300);
  };

  const resetUpload = () => { setUploadedFile(null); setUploadProgress(0); setIsUploading(false); setIsComplete(false); };

  const handleDragOver = useCallback((e: React.DragEvent) => { e.preventDefault(); setIsDragging(true); }, []);
  const handleDragLeave = useCallback(() => { setIsDragging(false); }, []);
  const handleDrop = useCallback((e: React.DragEvent) => { e.preventDefault(); setIsDragging(false); const file = e.dataTransfer.files[0]; if (file) simulateUpload(file.name, file.size); }, []);
  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => { const file = e.target.files?.[0]; if (file) simulateUpload(file.name, file.size); }, []);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div><h1 className="text-2xl font-bold text-white">Upload Video</h1><p className="text-sm text-zinc-400 mt-1">Drop your raw footage and let AI do the magic</p></div>
      <AnimatePresence mode="wait">
        {!uploadedFile ? (
          <motion.div key="dropzone" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <label onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop} className="block cursor-pointer">
              <div className={`border-2 border-dashed rounded-3xl p-16 text-center transition-all duration-300 ${isDragging ? "border-violet-500 bg-violet-500/5" : "border-zinc-800 hover:border-violet-500/50"}`}>
                <input type="file" accept="video/*" onChange={handleFileSelect} className="hidden" />
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-500/20 to-cyan-500/20 border border-violet-500/20 flex items-center justify-center mb-6"><Upload className="w-8 h-8 text-violet-400" /></div>
                  <h3 className="text-xl font-semibold text-white mb-2">{isDragging ? "Drop your video here" : "Drag & drop your video"}</h3>
                  <p className="text-sm text-zinc-400 mb-6">or click to browse • MP4, MOV, AVI, MKV • Up to 10GB</p>
                  <div className="flex items-center gap-6 text-xs text-zinc-500"><span className="flex items-center gap-1"><Film className="w-3 h-3" /> Any resolution</span><span className="flex items-center gap-1"><Clock className="w-3 h-3" /> Any duration</span><span className="flex items-center gap-1"><HardDrive className="w-3 h-3" /> Up to 10GB</span></div>
                </div>
              </div>
            </label>
          </motion.div>
        ) : (
          <motion.div key="progress" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Card variant="glass" padding="lg">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center"><FileVideo className="w-6 h-6 text-violet-400" /></div>
                  <div><h3 className="text-white font-medium">{uploadedFile.name}</h3><p className="text-sm text-zinc-500">{formatFileSize(uploadedFile.size)}</p></div>
                </div>
                {!isUploading && <button onClick={resetUpload} className="text-zinc-500 hover:text-white p-1"><X className="w-5 h-5" /></button>}
              </div>
              {isUploading && <div className="space-y-3"><ProgressBar value={uploadProgress} variant="glow" size="md" showLabel label="Uploading..." /><div className="flex items-center gap-2 text-xs text-zinc-400"><Cloud className="w-3 h-3 animate-pulse" /><span>Chunked transfer • Resume enabled</span></div></div>}
              {isComplete && <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4"><div className="flex items-center gap-2 text-emerald-400"><CheckCircle className="w-5 h-5" /><span className="text-sm font-medium">Upload complete</span></div><div className="flex gap-3"><Button variant="primary" size="lg" icon={<Sparkles className="w-4 h-4" />}>Start AI Processing</Button><Button variant="secondary" size="lg" icon={<ArrowRight className="w-4 h-4" />}>Configure</Button></div></motion.div>}
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card variant="glass" hover padding="md"><div className="text-center"><div className="w-12 h-12 rounded-xl bg-violet-500/10 flex items-center justify-center mx-auto mb-3"><Sparkles className="w-5 h-5 text-violet-400" /></div><h3 className="text-sm font-medium text-white mb-1">Auto Mode</h3><p className="text-xs text-zinc-500">AI detects everything automatically</p></div></Card>
        <Card variant="glass" hover padding="md"><div className="text-center"><div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center mx-auto mb-3"><Film className="w-5 h-5 text-cyan-400" /></div><h3 className="text-sm font-medium text-white mb-1">Template Mode</h3><p className="text-xs text-zinc-500">Choose from 50+ editing templates</p></div></Card>
        <Card variant="glass" hover padding="md"><div className="text-center"><div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center mx-auto mb-3"><Cloud className="w-5 h-5 text-amber-400" /></div><h3 className="text-sm font-medium text-white mb-1">Batch Mode</h3><p className="text-xs text-zinc-500">Upload multiple videos in queue</p></div></Card>
      </div>
    </div>
  );
}
