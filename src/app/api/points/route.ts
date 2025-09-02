// File: app/api/points/route.ts
import { initAdmin } from "@/config/firebaseAdmin";
import { getFirestore, Timestamp, FieldValue } from "firebase-admin/firestore";
import { NextRequest, NextResponse } from "next/server";

// Interface for Points document
interface PointsDocument {
  volunteering: number;
  facebook: number;
  intra: number;
  competitions: number;
  projects: number;
  blogs: number;
  forum: number;
  roll: string;
  name: string;
  email: string;
  totalPoints: number;
  createdAt: Timestamp;
  updatedAt?: Timestamp;
}
 
export async function GET(req: NextRequest) {
  try {
    await initAdmin();
    const firestore = getFirestore();

    // First, get all points documents without ordering
    const pointsSnapshot = await firestore
      .collection("points")
      .get();

    const points: any[] = [];
    pointsSnapshot.forEach((doc) => {
      const data = doc.data();
      points.push({
        id: doc.id,
        ...data,
        // Convert Firestore Timestamp to ISO string for frontend
        createdAt: data.createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
        updatedAt: data.updatedAt?.toDate?.()?.toISOString() || null,
      });
    });

    // Sort manually in JavaScript instead of using Firestore ordering
    points.sort((a, b) => {
      // First by totalPoints (descending)
      if (b.totalPoints !== a.totalPoints) {
        return b.totalPoints - a.totalPoints;
      }
      // Then by createdAt (ascending) if totalPoints are equal
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    });

    return NextResponse.json({
      success: true,
      data: points,
      count: points.length
    });
  } catch (error) {
    console.error("Error fetching points:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch points" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await initAdmin();
    const firestore = getFirestore();
    const data = await req.json();

    // Validate required fields
    if (!data.roll || !data.name || !data.email) {
      return NextResponse.json(
        { success: false, error: "Roll, name, and email are required" },
        { status: 400 }
      );
    }

    // Check if roll already exists
    const existingDoc = await firestore
      .collection("points")
      .where("roll", "==", data.roll)
      .get();
    
    if (!existingDoc.empty) {
      return NextResponse.json(
        { success: false, error: "A member with this roll number already exists" },
        { status: 400 }
      );
    }

    // Calculate total points
    const totalPoints = 
      (data.volunteering || 0) +
      (data.facebook || 0) +
      (data.intra || 0) +
      (data.competitions || 0) +
      (data.projects || 0) +
      (data.blogs || 0) +
      (data.forum || 0);

    // Create new document
    const newPointsDoc: Omit<PointsDocument, 'id'> = {
      volunteering: data.volunteering || 0,
      facebook: data.facebook || 0,
      intra: data.intra || 0,
      competitions: data.competitions || 0,
      projects: data.projects || 0,
      blogs: data.blogs || 0,
      forum: data.forum || 0,
      roll: data.roll,
      name: data.name,
      email: data.email,
      totalPoints,
      createdAt: Timestamp.now()
    };

    const docRef = await firestore.collection("points").add(newPointsDoc);

    return NextResponse.json({
      success: true,
      id: docRef.id,
      message: "Points document created successfully"
    });
  } catch (error) {
    console.error("Error creating points document:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create points document" },
      { status: 500 }
    );
  }
}