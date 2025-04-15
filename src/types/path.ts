export type PathType = "Cross" | "Z" | "T" | "Hook" | "Zag";
export type PathShape = [number, number][];

export const PATH_SHAPES: Record<PathType, PathShape> = {
    Cross: [[0, 0], [0, 1], [0, -1], [1, 0], [2, 0], [-1, 0]],
    Z: [[0, 0], [-1, -1], [-1, 0], [1, 0], [2, 0], [2, 1]],
    T: [[0, 0], [-1, -1], [-1, 0], [-1, 1], [1, 0], [2, 0]],
    Hook: [[0, 0], [0, -1], [-1, 0], [-1, 1], [1, 0], [2, 0]],
    Zag: [[0, 0], [-1, 0], [-1, -1], [-2, -1], [0, 1], [1, 1]]
};