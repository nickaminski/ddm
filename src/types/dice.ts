export type SymbolType = "summon1" | "summon2" | "summon3" | "summon4" | "progress" | "attack" | "magic" | "trap" | "defense";

// Each face has 1–2 symbols, depending on balance
export type DieFace = SymbolType[];

export const DICE_SETS: DieFace[][] = [
    // Set 1
    [
        ["summon1"],  // 1st die face
        ["summon1"],  // 2nd die face
        ["summon1"],   // 3rd die face
        ["summon1"],          // 4th die face
        ["defense", "defense"],   // 5th die face
        ["progress"],            // 6th die face
    ],
    // Set 2
    [
        ["summon2"],  // 1st die face
        ["summon2"],  // 2nd die face
        ["summon2"],          // 3rd die face
        ["magic"],  // 4th die face
        ["attack", "attack"],            // 5th die face
        ["progress", "progress"],// 6th die face
    ],
    // Set 3
    [
        ["summon3"], // 1st die face
        ["summon3"],// 2nd die face
        ["progress"],          // 3rd die face
        ["progress"], // 4th die face
        ["trap", "trap"],// 5th die face
        ["attack"],// 6th die face
    ],
    // Set 4
    [
        ["summon4"],  // 1st die face
        ["progress", "progress"],          // 2nd die face
        ["magic", "magic"],          // 3rd die face
        ["defense"],            // 4th die face
        ["trap"],  // 5th die face
        ["attack"],  // 6th die face
    ]
];