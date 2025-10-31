export interface Score {
    id?: string;
    playerName: string;
    score: number;
    time: number;
    createdAt?: Date | string;
    position?: number;
}

export interface Ranking {
    scores: Score[];
    lastUpdated?: Date | string;
}