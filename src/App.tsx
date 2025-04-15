import { useEffect, useState } from 'react';
import './App.css'
import GameBoard from './components/gameBoard/GameBoard';
import { DieFace } from './types/dice';
import { PATH_SHAPES, PathShape, PathType } from './types/path';
import TurnControls from './components/turnControls/TurnControls';
import { Cell } from './types/cell';

function App() {
    const ROWS = 13;
    const COLS = 19;
    const [currentPlayer, setCurrentPlayer] = useState<1 | 2>(1);
    const [hasRolled, setHasRolled] = useState(false);
    const [canSummon, setCanSummon] = useState(false);
    const [diceRollResults, setDiceRollResults] = useState<DieFace[]>([]);
    const [hasPlacedTile, setHasPlacedTile] = useState(false);
    const [canEndTurn, setCanEndTurn] = useState(false);
    const [rotation, setRotation] = useState<number>(0);
    const [selectedPathType, setSelectedPathType] = useState<PathType>("Cross");

    const [grid, setGrid] = useState<Cell[][]>(() => {
        const initialGrid: Cell[][] = Array.from({ length: ROWS }, () =>
            Array.from({ length: COLS }, () => null)
        );    
        initialGrid[Math.floor(ROWS / 2)][0] = {player: 1};
        initialGrid[Math.floor(ROWS / 2)][COLS - 1] = {player: 2};    
        return initialGrid;
    });

    const endTurn = () => {
        if (!canEndTurn) return;

        setCurrentPlayer((prev) => (prev === 1 ? 2 : 1));
        setHasRolled(false);
        setDiceRollResults([]);
        setHasPlacedTile(false);
        setCanSummon(false);
    }

    useEffect(() => {
        if (!hasRolled) {
            setCanEndTurn(false);
            return;
        } 

        const summonCount = diceRollResults.flat().filter((symbol) => symbol.startsWith("summon")).length;
        if (summonCount >= 2 && !hasPlacedTile){
            setCanSummon(true);
            setCanEndTurn(false);
            return;
        }

        setCanSummon(false);
        setCanEndTurn(true);
    }, [hasRolled, hasPlacedTile]);

    const onSetPathType = (newType: PathType) => {
        setSelectedPathType(newType);
    }

    const handlePlaceTile = (row: number, col: number) => {
        // socket.emit("placePathSegment", {row, col, selectedPath, rotation});
        const shape = getRotatedPathShape();
        const newGrid = grid.map((r) => [...r]);

        for (const [dr, dc] of shape) {
            const r = row + dr;
            const c = col + dc;
            newGrid[r][c] = { player: currentPlayer };
        }

        setGrid(newGrid);
        setHasPlacedTile(true);
    };

    const rotatePathShape = (shape: PathShape): PathShape => shape.map(([r, c]) => [c, -r]);
    
    const getRotatedPathShape = (): PathShape => {
        let shape = PATH_SHAPES[selectedPathType];
        for (let i = 0; i < rotation; i++) {
            shape = rotatePathShape(shape);
        }
        return shape;
    };

    return (
        <div style={{ padding: "2rem", textAlign: "center" }}>
            <GameBoard grid={grid}
                       currentPlayer={currentPlayer}
                       diceRollResults={diceRollResults}
                       hasPlacedTile={hasPlacedTile}
                       rotation={rotation}
                       selectedPath={selectedPathType}
                       onPlaceTile={handlePlaceTile} />

            <TurnControls canSummon={canSummon}
                          currentPlayer={currentPlayer}
                          canEndTurn={canEndTurn}
                          onEndTurn={endTurn}
                          hasRolled={hasRolled}
                          setHasRolled={setHasRolled}
                          diceRollResults={diceRollResults}
                          setDiceRollResults={setDiceRollResults}
                          setRotation={setRotation}
                          onPathTypeChange={onSetPathType}
                          selectedPathType={selectedPathType} />
        </div>
      );
}

export default App
