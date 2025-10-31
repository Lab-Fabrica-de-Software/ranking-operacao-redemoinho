import { db } from "@/app/lib/firebase";
import { Ranking, Score } from "@/app/types/score";
import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
  Timestamp,
  where,
} from "firebase/firestore";
import { NextResponse } from "next/server";
import { notifyScoreUpdate } from "./events/route";

export async function POST(req: Request) {
  try {
    const { playerName, score, time }: Partial<Score> = await req.json();

    if (!playerName || score === undefined || time === undefined) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
      });
    }

    const scoresRef = collection(db, "scores");

    const existingQuery = query(scoresRef, where("playerName", "==", playerName));
    const existingSnapshot = await getDocs(existingQuery);

    if (!existingSnapshot.empty) {
      return new Response(
        JSON.stringify({ error: "Player name already exists" }),
        { status: 400 }
      );
    }

    const newScore: Omit<Score, "id"> = {
      playerName,
      score,
      time,
      createdAt: new Date(),
    };

    await addDoc(scoresRef, {
      ...newScore,
      createdAt: Timestamp.now(),
    });

    notifyScoreUpdate();

    return NextResponse.json({ message: "Score added successfully" }, { status: 201 });
  } catch (error) {
    console.log("Error adding score:", error);
    return NextResponse.json({ error: "Failed to add score" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const playerName = searchParams.get("playerName")?.toLowerCase();

    const q = query(collection(db, "scores"), orderBy("score", "desc"), orderBy("time", "asc"));
    const snapshot = await getDocs(q);

    if (snapshot.empty) { 
      return NextResponse.json({ message: "No results found." }, { status: 404 });
    }

    let scores: Score[] = snapshot.docs.map((doc, index) => {
      const data = doc.data();
      return {
        id: doc.id,
        playerName: data.playerName,
        score: data.score,
        time: data.time / 60,
        createdAt: data.createdAt?.toDate(),
        position: index + 1,
      };
    });

    if (playerName) {
      scores = scores.filter(score =>
        score.playerName.toLowerCase().includes(playerName)
      );
    }

    const ranking: Ranking = {
      scores,
      lastUpdated: new Date(),
    };

    return NextResponse.json(ranking, { status: 200 });
  } catch (error) {
    console.error("Error fetching scores:", error);
    return NextResponse.json({ error: "Failed to fetch scores" }, { status: 500 });
  }
}