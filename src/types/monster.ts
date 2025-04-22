export type Monster = {
    player?: number;             // Who owns the monster
    name: string;
    level: number;
    tribe: string;
    attack: number;
    defense: number;
    health: number;
    image: string;
    icon: string;
}