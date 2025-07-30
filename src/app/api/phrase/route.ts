import { createClient } from "@supabase/supabase-js";
import { NextApiResponse } from "next";
import { NextResponse } from "next/server";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables");
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function POST(req: Request, res: NextApiResponse) {
  try {
    const { phraseId , clickCount} = await req.json();

    const { data, error: updateError } = await supabase
      .from("phrases")
      .update({ clicked: clickCount})
      .eq("id", phraseId)
      .select()

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 400 });
    }
    return NextResponse.json({data});
  } catch (err) {
    console.error("❌ 네트워크 오류:", err);
      return NextResponse.json({err}, { status: 400 });
  }
}

export async function GET() {
  const { data, error } = await supabase.from("phrases").select("*");
  if (error) return NextResponse.json({ error: error.message });
  return NextResponse.json({ data });
}
