"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface WSMessage {
  type: string;
  data: Record<string, unknown>;
}

export function useWebSocket(projectId: string | null) {
  const ws = useRef<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [lastMessage, setLastMessage] = useState<WSMessage | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!projectId) return;

    const wsUrl = process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:8000/ws";
    const socket = new WebSocket(`${wsUrl}?projectId=${projectId}`);

    socket.onopen = () => {
      setIsConnected(true);
      socket.send(JSON.stringify({ type: "subscribe_progress", projectId }));
    };

    socket.onmessage = (event) => {
      try {
        const message: WSMessage = JSON.parse(event.data);
        setLastMessage(message);
        if (message.type === "progress_update" && typeof message.data?.overallProgress === "number") {
          setProgress(message.data.overallProgress as number);
        }
      } catch (e) {
        console.error("WebSocket message parse error:", e);
      }
    };

    socket.onclose = () => setIsConnected(false);
    socket.onerror = () => setIsConnected(false);
    ws.current = socket;

    return () => { socket.close(); };
  }, [projectId]);

  const sendMessage = useCallback((message: Record<string, unknown>) => {
    if (ws.current?.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify(message));
    }
  }, []);

  return { isConnected, lastMessage, progress, sendMessage };
}
