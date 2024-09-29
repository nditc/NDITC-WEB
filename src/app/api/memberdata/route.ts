import { initAdmin } from "@/config/firebaseAdmin";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const data = await req.json();
  await initAdmin();

  const memberDOC = await fetch(
    `https://memberapi.nditc.net/uid/${data.ndc_id}/`,
    {
      headers: { Authorization: "Token " + process.env.MEMBER_API_PRIVATE_KEY },
      method: "GET",
      cache: "no-store",
    },
  );

  const member = await memberDOC.json();

  console.log(member);

  if (!memberDOC.ok) {
    return NextResponse.json(
      { error: "No such Club Member exists" },
      { status: 404 },
    );
  }

  return NextResponse.json(member);
}
