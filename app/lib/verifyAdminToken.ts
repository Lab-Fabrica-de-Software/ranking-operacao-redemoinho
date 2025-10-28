
import { NextResponse } from "next/server";
import { admin } from "./firebaseAdmin";

export async function verifyAdminToken(req: Request) {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Missing validation Token" }, { status: 401 });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    if (!decodedToken.admin) { 
      return NextResponse.json({ error: "Access not allowed" }, { status: 403 });
    }
    return null;
  } catch {
    return NextResponse.json({ error: "Invalid Token" }, { status: 401 });
  }
}
