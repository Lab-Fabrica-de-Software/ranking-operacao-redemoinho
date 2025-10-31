"use client";
import { useEffect } from "react";

import { Ranking } from "@/app/types/score";
import useSWR from "swr";
import RankingTable from "../components/rankingTable";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function RankingTableContainer() {
    const { data, mutate } = useSWR<Ranking>("/api/scores", fetcher);

    useEffect(() => {
        const events = new EventSource("/api/scores/events");

        events.addEventListener("update", () => {
            mutate();
        });

        return () => {
            events.close();
        };
    }, [mutate]);

    if (!data) {
        return <div>Loading...</div>;
    }

    return <RankingTable ranking={data} />;
}
