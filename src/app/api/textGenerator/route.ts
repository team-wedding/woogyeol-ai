import { GoogleGenAI } from "@google/genai";
import { NextApiRequest, NextApiResponse } from "next";

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents:
      "청첩장에 사용할만한 문구 50자내로 추천해줘 문구만 작성해 다른 인사말 말고",
    config: {
      systemInstruction: "너는 30대 완전 작가인데",
      thinkingConfig: {
        thinkingBudget: 0, // Disables thinking
      },
    },
  });
  console.log(response.text);

  return Response.json({
    method: "GET",
    message: response.text,
    data: response,
  });
}
