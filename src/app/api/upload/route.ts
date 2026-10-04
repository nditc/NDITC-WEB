import cloudinary from "@/config/cloudinary";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { image, folder } = await req.json();

    if (!image)
      return NextResponse.json({ error: "No image provided" }, { status: 400 });

    const uploadResponse = await cloudinary.uploader.upload(image, {
      folder: folder || "uploads",
      transformation: [{ quality: "auto" }, { format: "auto" }],
    });

    return NextResponse.json({ success: true, imageUrl: uploadResponse.secure_url });
  } catch (err) {
    console.error("Upload error:", err);
    return NextResponse.json({ error: "Failed to upload image" }, { status: 500 });
  }
}
