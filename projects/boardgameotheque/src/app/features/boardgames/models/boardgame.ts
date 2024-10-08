import { Timestamp } from "firebase/firestore";

export interface Boardgame {
    rank: number;
    gameId: string;
    name: string;
    thumbnail: string;
    yearPublished: number;
    action: string;
    created: Timestamp;
    updated: Timestamp;
}

export type Boardgames = Boardgame[];