import { initAdmin } from "@/config/firebaseAdmin";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const data = await req.json();
  await initAdmin();

  const memberDOC = await fetch(
    `https://memberapi.nditc.net/roll/20${data?.ndc_id?.substring(1, 3)}/${data?.ndc_id}/`,
    {
      headers: { Authorization: "Token " + process.env.MEMBER_API_PRIVATE_KEY },
      method: "GET",
      cache: "no-store",
    },
  );

  if (!memberDOC.ok) {
    return NextResponse.json(
      { error: "No such Club Member exists" },
      { status: 404 },
    );
  }

  const member = await memberDOC.json();

  return NextResponse.json({
    memberID: `${member.uniqueID}`,
    success: true,
  });
}