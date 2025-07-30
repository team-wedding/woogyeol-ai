"use client";

import { useState } from "react";
import { useNotification } from "@/app/hooks/useNotification";

interface Message {
  fromUserId: string;
  message: string;
}

export default function Chat({
  userId,
  opponentId,
}: {
  userId: string;
  opponentId: string;
}) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  const { sendMessage } = useNotification(userId, {
    onChat: ({ fromUserId, message }) => {
      console.log("📨 받은 메시지:", message);
      setMessages((prev) => [...prev, { fromUserId, message }]);
    },
  });

  const handleSubmit = () => {
    if (!input.trim()) return;
    sendMessage(opponentId, input);
    setMessages((prev) => [...prev, { fromUserId: userId, message: input }]);
    setInput("");
  };

  return (
    <div className="max-w-md mx-auto mt-10 border rounded-lg p-4 shadow">
      <div className="h-64 overflow-y-auto border-b mb-4 p-2 space-y-2 bg-gray-50">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-2 rounded ${
              msg.fromUserId === userId
                ? "bg-blue-200 text-right ml-auto w-fit"
                : "bg-gray-300 text-left mr-auto w-fit"
            }`}
          >
            <p>{msg.message}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 border rounded px-3 py-2"
          placeholder="메시지를 입력하세요"
        />
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          전송
        </button>
      </div>
    </div>
  );
}
