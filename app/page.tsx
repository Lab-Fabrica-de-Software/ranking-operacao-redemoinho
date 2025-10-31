import RankingTableContainer from "./containers/rankingTableContainer";
import { Ranking } from "./types/score";


async function getScores(): Promise<Ranking> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/scores`, {
    cache: "no-store", 
  });
  return res.json();
}

export default async function Home() {
  const initialData = await getScores();

  return (
    <main>
      <RankingTableContainer initialData={initialData}/>
    </main>
  );
}
