"use client";
import Component from "@/app/view/selector";
import { useEffect } from "react";

export default function Home() {
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const res = await fetch("/api/textGenerator");
  //     // const res = await fetch("/api/phrase", {
  //     //   method: "GET",
  //     // });
  //     if (!res.ok) {
  //       throw new Error("Failed to fetch data");
  //     }
  //     const data = await res.json();
  //   };
  //   fetchData();
  // }, []);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Component />
    </div>
  );
}
