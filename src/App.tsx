import { useEffect, useState } from 'react';
import './App.css'
import GameBoard from './components/gameBoard/GameBoard';
import { DieFace, NonSummonSymbolType } from './types/dice';
import { PATH_SHAPES, PathShape, PathType } from './types/path';
import TurnControls from './components/turnControls/TurnControls';
import { Cell } from './types/cell';
import { CrestPoolModel } from './components/crestPool/crestPool';
import PlayerStatus from './components/playerStatus/playerStatus';

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
    const [player1CrestPool, setPlayer1CrestPool] = useState<CrestPoolModel>([
        { type: "progress", count: 0 },
        { type: "attack", count: 0 },
        { type: "defense", count: 0 },
        { type: "magic", count: 0 },
        { type: "trap", count: 0 }
    ]);
    const [player2CrestPool, setPlayer2CrestPool] = useState<CrestPoolModel>([
        { type: "progress", count: 0 },
        { type: "attack", count: 0 },
        { type: "defense", count: 0 },
        { type: "magic", count: 0 },
        { type: "trap", count: 0 }
    ]);

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

    useEffect(() => {
        const allSymbols = diceRollResults.flat();
        const counts = allSymbols.reduce<Record<NonSummonSymbolType, number>>((acc, sym) => {
            if (!sym.startsWith("summon")) {
                acc[sym as NonSummonSymbolType]++;
            }
            return acc;
        }, {
            progress: 0,
            attack: 0,
            defense: 0,
            magic: 0,
            trap: 0
        });

        if (currentPlayer === 1) {
            setPlayer1CrestPool((prev) => {
                var newCrestPool: CrestPoolModel = [];
                newCrestPool.push({ type: "progress", count: prev.find(x => x.type == "progress")!.count + counts.progress});
                newCrestPool.push({ type: "attack", count: prev.find(x => x.type == "attack")!.count + counts.attack});
                newCrestPool.push({ type: "defense", count: prev.find(x => x.type == "defense")!.count + counts.defense});
                newCrestPool.push({ type: "magic", count: prev.find(x => x.type == "magic")!.count + counts.magic});
                newCrestPool.push({ type: "trap", count: prev.find(x => x.type == "trap")!.count + counts.trap});
                return newCrestPool;
            });
        } else if (currentPlayer === 2) {
            setPlayer2CrestPool((prev) => {
                var newCrestPool: CrestPoolModel = [];
                newCrestPool.push({ type: "progress", count: prev.find(x => x.type == "progress")!.count + counts.progress});
                newCrestPool.push({ type: "attack", count: prev.find(x => x.type == "attack")!.count + counts.attack});
                newCrestPool.push({ type: "defense", count: prev.find(x => x.type == "defense")!.count + counts.defense});
                newCrestPool.push({ type: "magic", count: prev.find(x => x.type == "magic")!.count + counts.magic});
                newCrestPool.push({ type: "trap", count: prev.find(x => x.type == "trap")!.count + counts.trap});
                return newCrestPool;
            });
        }

    }, [diceRollResults]);

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
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ marginRight: '1rem' }}>
                    <PlayerStatus player={1} heartPoints={3} crestPool={player1CrestPool} />
                </div>
                <GameBoard grid={grid}
                        currentPlayer={currentPlayer}
                        diceRollResults={diceRollResults}
                        hasPlacedTile={hasPlacedTile}
                        rotation={rotation}
                        selectedPath={selectedPathType}
                        onPlaceTile={handlePlaceTile} />
                <div style={{ marginLeft: '1rem' }}>
                    <PlayerStatus player={2} heartPoints={3} crestPool={player2CrestPool} />
                </div>
            </div>

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
