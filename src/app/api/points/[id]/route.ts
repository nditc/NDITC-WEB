// File: app/api/points/[id]/route.ts
import { initAdmin } from "@/config/firebaseAdmin";
import { getFirestore, Timestamp } from "firebase-admin/firestore";
import { NextRequest, NextResponse } from "next/server";

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

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await initAdmin();
    const firestore = getFirestore();
    const { id } = params;

    const doc = await firestore.collection("points").doc(id).get();

    if (!doc.exists) {
      return NextResponse.json(
        { success: false, error: "Points document not found" },
        { status: 404 }
      );
    }

    const data = doc.data();
    
    return NextResponse.json({
      success: true,
      data: {
        id: doc.id,
        ...data,
        // Convert Firestore Timestamp to ISO string for frontend
        createdAt: data?.createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
        updatedAt: data?.updatedAt?.toDate?.()?.toISOString() || null,
      }
    });
  } catch (error) {
    console.error("Error fetching points document:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch points document" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await initAdmin();
    const firestore = getFirestore();
    const { id } = params;
    const data = await req.json();

    // Check if document exists
    const doc = await firestore.collection("points").doc(id).get();
    if (!doc.exists) {
      return NextResponse.json(
        { success: false, error: "Points document not found" },
        { status: 404 }
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

    // Prepare update data
    const updateData: Partial<PointsDocument> = {
      volunteering: data.volunteering || 0,
      facebook: data.facebook || 0,
      intra: data.intra || 0,
      competitions: data.competitions || 0,
      projects: data.projects || 0,
      blogs: data.blogs || 0,
      forum: data.forum || 0,
      totalPoints,
      updatedAt: Timestamp.now()
    };

    // Only update these fields if provided
    if (data.roll) updateData.roll = data.roll;
    if (data.name) updateData.name = data.name;
    if (data.email) updateData.email = data.email;

    await firestore.collection("points").doc(id).update(updateData);

    return NextResponse.json({
      success: true,
      message: "Points document updated successfully"
    });
  } catch (error) {
    console.error("Error updating points document:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update points document" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await initAdmin();
    const firestore = getFirestore();
    const { id } = params;

    // Check if document exists
    const doc = await firestore.collection("points").doc(id).get();
    if (!doc.exists) {
      return NextResponse.json(
        { success: false, error: "Points document not found" },
        { status: 404 }
      );
    }

    await firestore.collection("points").doc(id).delete();

    return NextResponse.json({
      success: true,
      message: "Points document deleted successfully"
    });
  } catch (error) {
    console.error("Error deleting points document:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete points document" },
      { status: 500 }
    );
  }
}