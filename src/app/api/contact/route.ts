import { NextResponse } from "next/server";
const nodemailer = require("nodemailer");

export async function POST(request: any) {
  const password = process.env.NEXT_PUBLIC_EMAIL_PASSWORD;
  const myEmail = process.env.NEXT_PUBLIC_PERSONAL_EMAIL;

  console.log("dealing with request");
  const formData = await request.formData();
  const name = formData.get("name");
  const email = formData.get("email");
  const message = formData.get("message");

  // create transporter object
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "info.nditc.official@gmail.com",
      pass: "wgmtmezjhewycapo",
    },
  });

  try {
    const mail = await transporter.sendMail({
      from: "nditc.official@gmail.com",
      to: "nditc.official@gmail.com",
      replyTo: email,
      subject: `Website Contact Mail from ${email}`,
      name: name,
      message: message,
      html: `
            <p>Name: ${name} </p>
            <p>Email: ${email} </p>
            <p>Message: ${message} </p>
            `,
    });

    return NextResponse.json({ message: "Success: email was sent" });
  } catch (error) {
    return NextResponse.json({ message: "Error: email wasn't sent" });
  }
}
