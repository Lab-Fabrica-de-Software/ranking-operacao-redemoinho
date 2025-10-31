import { NextRequest, NextResponse } from "next/server";
import { db } from "@/app/lib/firebase";
import { doc, deleteDoc, getDoc } from "firebase/firestore";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } | Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) return NextResponse.json({ error: "Missing required params" }, { status: 400 });

    const scoreRef = doc(db, "scores", id);
    const scoreSnapshot = await getDoc(scoreRef);

    if (!scoreSnapshot.exists()) return NextResponse.json({ error: "Score not found" }, { status: 404 });

    await deleteDoc(scoreRef);

    return NextResponse.json({ message: "Score deleted successfully" });
  } catch (error) {
    console.error("Error deleting score:", error);
    return NextResponse.json({ error: "Error deleting score" }, { status: 500 });
  }
}
