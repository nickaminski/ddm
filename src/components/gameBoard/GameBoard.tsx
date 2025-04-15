import { JSX, useState } from "react";
import styles from "./GameBoard.module.css";
import { DieFace } from "../../types/dice";
import { PATH_SHAPES, PathShape, PathType } from "../../types/path";
import { Cell } from "../../types/cell";

type Props = {
    grid: Cell[][];
    currentPlayer: 1 | 2;
    diceRollResults: DieFace[];
    hasPlacedTile: boolean;
    rotation: number;
    selectedPath: PathType;
    onPlaceTile: (row: number, col: number) => void;
};

function GameBoard({grid, currentPlayer, diceRollResults, hasPlacedTile, onPlaceTile, rotation, selectedPath } : Props) {
    const [hoverCoords, setHoverCoords] = useState<[number, number] | null>(null);

    const rotatePathShape = (shape: PathShape): PathShape => shape.map(([r, c]) => [c, -r]);

    const getRotatedPathShape = (): PathShape => {
        let shape = PATH_SHAPES[selectedPath];
        for (let i = 0; i < rotation; i++) {
            shape = rotatePathShape(shape);
        }
        return shape;
    };

    const canPlaceTileThisTurn = (): boolean => {
        const allSymbols = diceRollResults.flat();
        const summonCount = allSymbols.filter(sym => sym.startsWith("summon")).length;
        return summonCount >= 2;
    };

    const isPlacementLegal = (row: number, col: number): boolean => {
        const shape = getRotatedPathShape();
        let connectsToOwnPath = false;

        for (const [dr, dc] of shape) {
            const r = row + dr;
            const c = col + dc;

            // Out of bounds
            if (r < 0 || r >= grid.length || c < 0 || c >= grid[0].length) return false;

            // Overlapping
            if (grid[r][c] !== null) return false;

            // Check neighbors for own path
            const neighbors = [
                [r - 1, c],
                [r + 1, c],
                [r, c - 1],
                [r, c + 1],
            ];

            for (const [nr, nc] of neighbors) {
                if (
                    nr >= 0 &&
                    nr < grid.length &&
                    nc >= 0 &&
                    nc < grid[0].length &&
                    grid[nr][nc]?.player === currentPlayer
                ) {
                    connectsToOwnPath = true;
                }
            }
        }
        return connectsToOwnPath;
    };

    const handleMouseEnter = (row: number, col: number) => {
        setHoverCoords([row, col]);
    };

    const handleMouseLeave = () => {
        setHoverCoords(null);
    };

    const handleClick = (row: number, col: number) => {
        if (!hasPlacedTile && canPlaceTileThisTurn() && isPlacementLegal(row, col)) {
            onPlaceTile(row, col);
        }
    };

    const renderCell = (r: number, c: number): JSX.Element => {
        let cellClass = styles.cell;

        if (grid[r][c]) {
            cellClass +=
            grid[r][c]?.player === 1 ? ` ${styles.player1}` : ` ${styles.player2}`;
        }

        if (hoverCoords && canPlaceTileThisTurn() && !hasPlacedTile) {
            const [hr, hc] = hoverCoords;
            const shape = getRotatedPathShape();
            const isLegal = isPlacementLegal(hr, hc);

            for (const [dr, dc] of shape) {
                if (hr + dr === r && hc + dc === c) {
                    cellClass += ` ${isLegal ? styles.preview : styles.invalid}`;
                }
            }
        }

        return (
            <div
                key={`${r}-${c}`}
                className={cellClass}
                onClick={() => handleClick(r, c)}
                onMouseEnter={() => handleMouseEnter(r, c)}
                onMouseLeave={handleMouseLeave}
            />
        );
    };

    return (
        <div>
            <div className={styles.board}>
                {grid.map((row, rIdx) =>
                    row.map((_, cIdx) => renderCell(rIdx, cIdx))
                )}
            </div>
        </div>
    );
};

export default GameBoard;