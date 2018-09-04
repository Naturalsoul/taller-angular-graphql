export type Game = {
    id: number,
    title: string,
    platform: string
}

export type Query = {
    games: Game[]
}