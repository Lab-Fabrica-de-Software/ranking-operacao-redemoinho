"use client";

import { useEffect } from "react";
import useSWR from "swr";
import { Ranking } from "@/app/types/score";
import RankingTable from "../components/rankingTable";

const fetcher = (url: string) => fetch(url).then(res => res.json());

interface Props {
    initialData: Ranking;
}

export default function RankingTableContainer({ initialData }: Props) {
    const { data, mutate } = useSWR<Ranking>("/api/scores", fetcher, {
        fallbackData: initialData, // usa os dados do server sem loading
    });

    useEffect(() => {
        const events = new EventSource("/api/scores/events");

        events.addEventListener("update", () => {
            mutate();
        });

        return () => events.close();
    }, [mutate]);

    return <RankingTable ranking={data!} />;
}
