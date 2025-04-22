import { JSX, useState } from "react";
import styles from "./GameBoard.module.css";
import { PATH_SHAPES, PathShape, PathType } from "../../types/path";
import { Cell } from "../../types/cell";
import { Position } from "../../types/position";

type Props = {
    grid: Cell[][];
    hasPlacedTile: boolean;
    rotation: number;
    selectedPath: PathType;
    monsterAvailableToSummon: boolean;
    cardSelected: boolean;
    selectedMonsterPosition: Position | null;
    onClickTile: (row: number, col: number) => void;
    isPlacementLegal: (row: number, col: number) => boolean;
    diceRollAllowsSummon: () => boolean;
    canMoveSelectedMonsterTo: (row: number, col: number) => boolean;
};

function GameBoard({grid, hasPlacedTile, monsterAvailableToSummon, cardSelected, selectedMonsterPosition, canMoveSelectedMonsterTo, onClickTile, isPlacementLegal, diceRollAllowsSummon, rotation, selectedPath } : Props) {
    const [hoverCoords, setHoverCoords] = useState<[number, number] | null>(null);

    const rotatePathShape = (shape: PathShape): PathShape => shape.map(([r, c]) => [c, -r]);

    const getRotatedPathShape = (): PathShape => {
        let shape = PATH_SHAPES[selectedPath];
        for (let i = 0; i < rotation; i++) {
            shape = rotatePathShape(shape);
        }
        return shape;
    };

    const handleMouseEnter = (row: number, col: number) => {
        setHoverCoords([row, col]);
    };

    const handleMouseLeave = () => {
        setHoverCoords(null);
    };

    const renderCell = (r: number, c: number): JSX.Element => {
        const cell = grid[r][c];
        let cellClass = styles.cell;

        if (grid[r][c].player) {
            cellClass +=
            grid[r][c]?.player === 1 ? ` ${styles.player1}` : ` ${styles.player2}`;
        }

        if (hoverCoords && diceRollAllowsSummon() && !hasPlacedTile && monsterAvailableToSummon && cardSelected) {
            const [hr, hc] = hoverCoords;
            const shape = getRotatedPathShape();
            const isLegal = isPlacementLegal(hr, hc);

            for (const [dr, dc] of shape) {
                if (hr + dr === r && hc + dc === c) {
                    cellClass += ` ${isLegal ? styles.preview : styles.invalid}`;
                }
            }
        }

        if (selectedMonsterPosition) {
            const from = selectedMonsterPosition;
            if (from && from[0] === r && from[1] === c) {
                cellClass += ` ${styles.selectedMonster}`;
            }

            if (from) {
                if (canMoveSelectedMonsterTo(r, c)) {
                    cellClass += ` ${styles.movable}`;
                }
            }
        }

        return (
            <div
                key={`${r}-${c}`}
                className={cellClass}
                onClick={() => onClickTile(r, c)}
                onMouseEnter={() => handleMouseEnter(r, c)}
                onMouseLeave={handleMouseLeave}
            >
                {cell.monster && (
                    <img
                        src={cell.monster.icon}
                        alt={cell.monster.name}
                        className={styles.monsterIcon}
                    />
                )}
            </div>
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