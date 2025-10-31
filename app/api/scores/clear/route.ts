import { NextResponse } from "next/server";
import { db } from "@/app/lib/firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";

export async function DELETE(req: Request) {
  try {
    const adminKey = req.headers.get("x-admin-key");
    if (adminKey !== process.env.ADMIN_KEY) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    const snapshot = await getDocs(collection(db, "scores"));
    const deletions = snapshot.docs.map((d) => deleteDoc(doc(db, "scores", d.id)));
    await Promise.all(deletions);

    return NextResponse.json({ message: "Ranking cleaned successfully" });
  } catch (error) {
    console.error("Error cleaning ranking:", error);
    return NextResponse.json({ error: "Error cleaning ranking" }, { status: 500 });
  }
}
