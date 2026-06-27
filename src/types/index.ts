export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  plan: "starter" | "pro" | "business" | "enterprise";
  credits: number;
  storageUsed: number;
  storageLimit: number;
}

export interface Project {
  id: string;
  title: string;
  thumbnail?: string;
  duration: number;
  status: "uploading" | "analyzing" | "processing" | "ready" | "exported" | "failed";
  niche?: string;
  createdAt: string;
  updatedAt: string;
  progress: number;
  exportedPlatforms?: string[];
}

export interface VideoAnalysis {
  language: string;
  speakers: number;
  objects: string[];
  faces: number;
  emotions: string[];
  cameraMovement: string[];
  voiceTone: string;
  lighting: string;
  background: string;
  environment: string;
  products: string[];
  brandLogos: string[];
  textDetected: string[];
  storyStructure: string;
  sceneChanges: number;
  brollOpportunities: number;
  silenceSegments: number;
  mistakes: number;
  duplicateClips: number;
  fillerWords: number;
  musicTiming: string;
  hookPotential: number;
  audienceRetention: number;
  viralityScore: number;
  detectedNiche: string;
  suggestedNiches: string[];
}

export interface ExportSettings {
  platform: string;
  ratio: string;
  resolution: string;
  fps: number;
  format: string;
  quality: string;
}

export interface Subscription {
  plan: "starter" | "pro" | "business" | "enterprise";
  price: number;
  features: string[];
  limits: {
    uploads: number;
    storage: number;
    exports: number;
    aiCredits: number;
  };
}
