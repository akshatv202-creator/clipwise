import { create } from "zustand";
import { User, Project, VideoAnalysis } from "@/types";

interface AppState {
  user: User | null;
  projects: Project[];
  currentProject: Project | null;
  currentAnalysis: VideoAnalysis | null;
  isAuthenticated: boolean;
  sidebarOpen: boolean;
  uploadProgress: number;
  processingProgress: number;
  setUser: (user: User | null) => void;
  setProjects: (projects: Project[]) => void;
  setCurrentProject: (project: Project | null) => void;
  setCurrentAnalysis: (analysis: VideoAnalysis | null) => void;
  setAuthenticated: (auth: boolean) => void;
  toggleSidebar: () => void;
  setUploadProgress: (progress: number) => void;
  setProcessingProgress: (progress: number) => void;
  addProject: (project: Project) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
}

export const useStore = create<AppState>((set) => ({
  user: null,
  projects: [],
  currentProject: null,
  currentAnalysis: null,
  isAuthenticated: false,
  sidebarOpen: true,
  uploadProgress: 0,
  processingProgress: 0,
  setUser: (user) => set({ user }),
  setProjects: (projects) => set({ projects }),
  setCurrentProject: (project) => set({ currentProject: project }),
  setCurrentAnalysis: (analysis) => set({ currentAnalysis: analysis }),
  setAuthenticated: (auth) => set({ isAuthenticated: auth }),
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setUploadProgress: (progress) => set({ uploadProgress: progress }),
  setProcessingProgress: (progress) => set({ processingProgress: progress }),
  addProject: (project) => set((state) => ({ projects: [project, ...state.projects] })),
  updateProject: (id, updates) =>
    set((state) => ({
      projects: state.projects.map((p) => (p.id === id ? { ...p, ...updates } : p)),
    })),
}));
