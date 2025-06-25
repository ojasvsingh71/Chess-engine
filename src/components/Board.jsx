import React, { useState } from "react";
import pieces from "../assets";
import { Pawn } from "../logics/pawn";
import { Rook } from "../logics/rook";
import { Bishop } from "../logics/bishop";
import { Knight } from "../logics/knight";
import { Queen } from "../logics/queen";
import { King } from "../logics/king";
import { Checks } from "./checks";

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
    const [turn, setTurn] = useState(1);
    const [check, setCheck] = useState(0);

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
            const piece = board[from.row][from.col];

            if (piece === piece.toLowerCase() && turn) {
                setSelected(null);
                alert(`It's white's turn!!!`);
                return;
            }

            if (piece === piece.toUpperCase() && !turn) {
                setSelected(null);
                alert(`It's black's turn!!!`);
                return;
            }

            if (piece.toUpperCase() === "P") {
                if (!Pawn(board, from, to, board[from.row][from.col])) {
                    setSelected(null);
                    return;
                }
            } else if (piece.toUpperCase() === "R") {
                if (!Rook(board, from, to, board[from.row][from.col])) {
                    setSelected(null);
                    return;
                }
            } else if (piece.toUpperCase() === "B") {
                if (!Bishop(board, from, to, board[from.row][from.col])) {
                    setSelected(null);
                    return;
                }
            } else if (piece.toUpperCase() === "N") {
                if (!Knight(board, from, to, board[from.row][from.col])) {
                    setSelected(null);
                    return;
                }
            } else if (piece.toUpperCase() === "Q") {
                if (!Queen(board, from, to, board[from.row][from.col])) {
                    setSelected(null);
                    return;
                }
            } else if (piece.toUpperCase() === "K") {
                if (!King(board, from, to, board[from.row][from.col])) {
                    setSelected(null);
                    return;
                }
            }



            const newBoard = board.map(r => [...r]);
            newBoard[to.row][to.col] = board[from.row][from.col];
            newBoard[from.row][from.col] = "";
            setBoard(newBoard);
            setTurn(!turn);
            setSelected(null);

            if (Checks(newBoard, "k")) {
                alert(`Black is in check!`);
                setCheck(1);
            }
            if (Checks(newBoard, "K")) {
                alert(`White is in check!`);
                setCheck(1);
            }

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