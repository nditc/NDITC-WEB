import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

  try {
    const data = await req.json(); 
    if (!data?.ndc_roll || !data?.email) { 
      return NextResponse.json(
        { error: "Missing required fields: ndc_roll and email" },
        { status: 400 },
      );
    }

    const apiUrl = `https://memberapi.nditc.net/roll/20${data?.ndc_roll?.substring(1, 3)}/${data?.ndc_roll}/`;

    const memberDOC = await fetch(apiUrl, {
      headers: { Authorization: "Token " + process.env.MEMBER_API_PRIVATE_KEY },
      method: "GET",
      cache: "no-store",
    }); 


    if (!memberDOC.ok) { 
      return NextResponse.json(
        { error: "No such Club Member exists" },
        { status: 404 },
      );
    }

    const member = await memberDOC.json(); 
    if (member.college_roll != data.ndc_roll) { 
      return NextResponse.json(
        { error: "No such Club Member exists" },
        { status: 404 },
      );
    }

    const responseData = {
      ndc_id: `${member.uniqueID}`,
      mobile: member.contact_number,
      name: member.name,
      address: member.present_address, 
      roll: member.college_roll,
      success: true,
    };
 

    return NextResponse.json(responseData);

  } catch (error) {
    console.error("Error in route handler:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}