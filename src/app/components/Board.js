"use client";

import { create } from "zustand";
import { combine } from "zustand/middleware";
import Square from "@/app/components/Square";


// zustand store
const useGameStore = create(
    combine({ squares: Array(9).fill(null), xIsNext: true}, (set) => {
        return {
            setSquares: (nextSquares) => {
                set((state) => ({ 
                    squares: 
                        typeof nextSquares === 'function' ? nextSquares(state.squares) : nextSquares
                }));
            },
            setXIsNext: (nextXIsNext) => {
                set((state) => ({ 
                    xIsNext: 
                        typeof nextXIsNext === 'function' ? nextXIsNext(state.xIsNext) : nextXIsNext
                }));
            },
        };
    })
);

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }   
    return null;
}

function calculateTurns(squares) {
    return squares.filter(square => square !== null).length;
}

function calculateStatus(winner, turns, player) {
    if (!winner && !turns) return 'Draw';
    if (winner) return 'Winner: ' + winner;
    return 'Next player: ' + player;
}

export default function Board() {
    const xIsNext = useGameStore((state) => state.xIsNext);
    const setXIsNext = useGameStore((state) => state.setXIsNext);
    const squares = useGameStore((state) => state.squares);
    const setSquares = useGameStore((state) => state.setSquares);
    const winner = calculateWinner(squares);
    const turns = calculateTurns(squares);
    const player = xIsNext ? "X" : "O";
    const status = calculateStatus(winner, turns, player);

    function handleClick(i) {
        if (squares[i] || winner) return
        const nextSquares = squares.slice();
        nextSquares[i] = player;
        setSquares(nextSquares);
        setXIsNext(!xIsNext);
    }

    return (
        <div className="card flex flex-col items-center justify-center bg-accent p-4 shadow-lg rounded-box">
            <div className="font-bold mb-2 items-center justify-center text-neutral-content">
                {status}
            </div>
            <div className="grid grid-cols-3 gap-3">
                {squares.map((square, squareIndex) => (
                    <Square key={squareIndex} 
                        value={square}
                        onSquareClick={() => {handleClick(squareIndex)}}
                    />
                ))}
            </div>
        </div>
    );
}