"use client";

// import Chat from "@/app/view/Chat";
// import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
// import Component from "@/app/view/selector";

export interface Phrase {
  id: string;
  phrase: string;
  clicked: number;
}

export default function Home() {
  const [rankPhrase, setRankPhrase] = useState<Phrase[]>([]);
  const [isLoading, setIsLoading] = useState(true); 
  const incrementClicked = async (phraseId: string) => {
      setIsLoading(true);
     const count = rankPhrase.find((phrase) => phrase.id === phraseId)!.clicked += 1; // 클릭 수 증가
    try {
      const res = await fetch("/api/phrase", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phraseId , clickCount:count }),
      });
      const result = await res.json();
      if (!res.ok) {
        console.error("❌ 오류:", result.error);
        return;
      }
      console.log("✅ 업데이트 성공:", result.data);
      setIsLoading(false);
    } catch (err) {
      console.error("❌ 네트워크 오류:", err);
      setIsLoading(false)
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/phrase");
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await res.json();
      data.data.sort((a : Phrase,b : Phrase) => {
        return b.clicked-a.clicked ; // 클릭 수 기준으로 내림차순 정렬
      });
      setRankPhrase(data.data as Phrase[]);
      console.log("가져온 데이터:", data);
    };
    fetchData();
  }, [isLoading]);

  // const searchParams = useSearchParams();
  // const userId = searchParams.get("user") ?? "unknown";
  // const opponentId = userId === "user123" ? "user456" : "user123";
  return (
    <div className="flex flex-col items-center justify-items-center min-h-screen p-8 pb-2 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {/* <Component /> */}
      {/* <Chat userId={userId} opponentId={opponentId} /> */}
      <div className="max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4">인기 문구</h1>
        <ul className="space-y-2">
          {rankPhrase.length !== 0 &&
            rankPhrase.map((phrase, index) => (
              <li
                key={index}
                className="p-4 bg-white rounded-lg shadow hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => incrementClicked(phrase.id)}
              >
                <span className="font-semibold">{phrase.phrase}</span>
                <span className="text-sm text-gray-500 ml-2">
                  {phrase.clicked}
                </span>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
