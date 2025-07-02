import React, { useState } from "react";
import pieces from "../assets";
import { Pawn } from "../logics/pawn";
import { Rook } from "../logics/rook";
import { Bishop } from "../logics/bishop";
import { Knight } from "../logics/knight";
import { Queen } from "../logics/queen";
import { King } from "../logics/king";
import { Checks } from "./checks";
import { isSafeAfterMove } from "../logics/isSafeAfterMove";

function getImageKey(piece) {
    if (!piece) return null;
    const color = piece === piece.toUpperCase() ? "w" : "b";
    const type = piece.toUpperCase();
    return `${color}${type}`;
}


function tryMove(board, from, to, piece) {
    const type = piece.toUpperCase();
    const legalPieceMove =
        (type === "P" && Pawn(board, from, to, piece)) ||
        (type === "R" && Rook(board, from, to, piece)) ||
        (type === "B" && Bishop(board, from, to, piece)) ||
        (type === "N" && Knight(board, from, to, piece)) ||
        (type === "Q" && Queen(board, from, to, piece)) ||
        (type === "K" && King(board, from, to, piece));

    if (!legalPieceMove) return false;
    if (!isSafeAfterMove(board, from, to, piece)) return false;

    return true;
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
    const [gameOver, setGameOver] = useState(false);

    const handleClick = (row, col) => {

        if (gameOver) return;
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

            if (!tryMove(board, from, to, piece)) {
                setSelected(null);
                return;
            }



            const newBoard = board.map(r => [...r]);
            newBoard[to.row][to.col] = board[from.row][from.col];
            newBoard[from.row][from.col] = "";
            setBoard(newBoard);
            setTurn(!turn);
            setSelected(null);

            const opponentKing = piece === piece.toUpperCase() ? "k" : "K";
            const isInCheck = Checks(newBoard, opponentKing);

            if (isInCheck) {

                let hasEscape = false;

                for (let r1 = 0; r1 < 8; r1++) {
                    for (let c1 = 0; c1 < 8; c1++) {
                        const current = newBoard[r1][c1];
                        if (!current) continue;

                        const isWhitePiece = current === current.toUpperCase();
                        if ((opponentKing === "k" && isWhitePiece) || (opponentKing === "K" && !isWhitePiece)) continue;

                        for (let r2 = 0; r2 < 8; r2++) {
                            for (let c2 = 0; c2 < 8; c2++) {
                                if (tryMove(newBoard, { row: r1, col: c1 }, { row: r2, col: c2 }, current)) {
                                    hasEscape = true;
                                    break;
                                }
                            }
                            if (hasEscape) break;
                        }
                        if (hasEscape) break;
                    }
                    if (hasEscape) break;
                }

                if (!hasEscape) {
                    alert(`${turn ? "Black" : "White"} is checkmated! Game over.`);
                    setGameOver(true);
                    setSelected(null);
                    setCheck(1);
                    return;
                } else {
                    alert(`${turn ? "Black" : "White"} is in check!`);
                }
            }


        }
    };


    return (
        <div className="flex flex-col items-center">
            {gameOver && <div className="text-center text-red-600 mt-4 font-bold text-xl">Game Over: {!turn ? "Black" : "White"} is checkmated!</div>}

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
        </div>
    );
}

export default Board;