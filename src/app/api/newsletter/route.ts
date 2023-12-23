import { NextResponse } from "next/server";

export async function POST(request: any) {
  const formData = await request.formData();

  formData.append("b_252af46a54f45725aea40941c_53b7f78f01", "");

  const email = formData.get("email");

  try {
    const req = await fetch(
      "https://nditc.us14.list-manage.com/subscribe/post?u=252af46a54f45725aea40941c&amp;id=53b7f78f01&amp;f_id=004391e0f0",
      { body: JSON.stringify({ email: email }) }
    );

    return NextResponse.json({ message: "Success: Newsletter Added" });
  } catch (error) {
    return NextResponse.json({ message: "Error: Newsletter failed" });
  }
}
