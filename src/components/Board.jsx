import React, { useState } from "react";
import pieces from "../assets";
import { Pawn } from "../logics/pawn";

function getImageKey(piece) {
    if (!piece) return null;
    const color = piece === piece.toUpperCase() ? "w" : "b";
    const type = piece.toUpperCase();
    return `${color}${type}`;
}

function Board() {
    const initialBoard = [
        ["r", "n", "b", "q", "k", "b", "n", "r"],
        ["p", "p", "p", "p", "p", "p", "p", "p"],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["P", "P", "P", "P", "P", "P", "P", "P"],
        ["R", "N", "B", "Q", "K", "B", "N", "R"]
    ];

    const [board, setBoard] = useState(initialBoard);
    const [selected, setSelected] = useState(null);

    const handleClick = (row, col) => {
        const clickedPiece = board[row][col];

        if (selected && selected.row === row && selected.col === col) {
            setSelected(null);
            return;
        }

        if (!selected) {
            if (clickedPiece) {
                setSelected({ row, col });
            }
        } else {
            const from = selected;
            const to = { row, col };

            if (!Pawn(board, from, to, board[from.row][from.col])) {
                setSelected(null);
                return;
            }

            const newBoard = board.map(r => [...r]);
            newBoard[to.row][to.col] = board[from.row][from.col];
            newBoard[from.row][from.col] = "";
            setBoard(newBoard);

            setSelected(null);
        }
    };


    return (
        <div className="grid grid-cols-8 border border-gray-700 mx-auto mt-10 w-fit">
            {board.map((row, rowIndex) =>
                row.map((cell, colIndex) => {
                    const isBlack = (rowIndex + colIndex) % 2 === 1;
                    const imgKey = getImageKey(cell);
                    const isSelected = selected?.row === rowIndex && selected?.col === colIndex;
                    return (
                        <div
                            key={`${rowIndex}-${colIndex}`}
                            className={`w-16 h-16 flex items-center justify-center text-[32px] leading-none font-normal ${isBlack ? 'bg-gray-500' : 'bg-white'} 
                            ${isSelected ? "ring-2 ring-yellow-400" : ""}`}
                            onClick={() => handleClick(rowIndex, colIndex)}
                        >
                            {imgKey && (
                                <img
                                    src={pieces[imgKey]}
                                    alt={cell}
                                    className="w-12 h-12 pointer-events-none"
                                />
                            )}

                        </div>

                    );
                })
            )}
        </div>
    );
}

export default Board;