export interface Boardgame {
    rank: number;
    gameId: number;
    name: string;
    thumbnail: string;
    yearPublished: number
}

export type Boardgames = Boardgame[];