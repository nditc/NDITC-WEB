import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: Request) {
  try {
    const { image } = await req.json();

    if (!image) return NextResponse.json({ error: "No image provided" }, { status: 400 });

    const uploadResponse = await cloudinary.uploader.upload(image, {
      folder: "profile-pictures",
      transformation: [
        { width: 400, height: 400, crop: "fill" },
        { quality: "auto" },
        { format: "auto" },
      ],
    });

    return NextResponse.json({ success: true, imageUrl: uploadResponse.secure_url });
  } catch (err) {
    console.error("Upload error:", err);
    return NextResponse.json({ error: "Failed to upload image" }, { status: 500 });
  }
}
