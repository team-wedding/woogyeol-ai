import { createClient } from "@supabase/supabase-js";
import { NextApiResponse } from "next";
import { NextResponse } from "next/server";

// export async function POST(req: Request, res: NextApiResponse) {
//   const { prompt } = await req.json();
//   const { data, error } = await supabase.from("phrases").insert({ prompt });
//   if (error) return res.json({ error: error.message });
//   return res.json({ data });
// }
// const supabase = createClient();
// export async function GET() {
//   const { data, error } = await supabase.from("phrases").select("*");
//   if (error) return NextResponse.json({ error: error.message });
//   return NextResponse.json({ data });
// }
