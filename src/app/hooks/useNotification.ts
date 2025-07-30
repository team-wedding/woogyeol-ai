import { useEffect, useRef } from "react";

interface ChatData {
  fromUserId: string;
  message: string;
}

interface UseNotificationOptions {
  onNotify?: (msg: string) => void;
  onChat?: (data: ChatData) => void;
}

export const useNotification = (
  userId: string,
  { onNotify, onChat }: UseNotificationOptions
) => {
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (!userId) return;

    const socket = new WebSocket("ws://localhost:3005");
    socketRef.current = socket;

    socket.onopen = () => {
      socket.send(JSON.stringify({ type: "init", userId }));
    };

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === "notification" && onNotify) {
          onNotify(data.message);
        }
        if (data.type === "chat" && onChat) {
          onChat({ fromUserId: data.fromUserId, message: data.message });
        }
      } catch (err) {
        console.error("메시지 파싱 실패:", err);
      }
    };

    return () => {
      socket.close();
    };
  }, [userId, onNotify, onChat]);

  return {
    socketRef,
    sendMessage: (toUserId: string, message: string) => {
      if (
        socketRef.current &&
        socketRef.current.readyState === WebSocket.OPEN
      ) {
        socketRef.current.send(
          JSON.stringify({
            type: "chat",
            fromUserId: userId,
            toUserId,
            message,
          })
        );
      }
    },
  };
};
