import React from "react";
import { Bishop } from "../logics/bishop";
import { Knight } from "../logics/knight";
import { Pawn } from "../logics/pawn";
import { Queen } from "../logics/queen";
import { Rook } from "../logics/rook";
import { FindKing } from "./findKing";

export function Checks(board, piece) {

    const to = FindKing(board, piece);
    const enemys = (piece === piece.toUpperCase()) ? "white" : "black";

    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {

            const from = { row, col };
            const curr = board[row][col];

            if (curr === curr.toLowerCase() && enemys === "black") continue;
            if (curr === curr.toUpperCase() && enemys === "white") continue;

            if (curr.toUpperCase() === "P") {
                if (Pawn(board, from, to, board[from.row][from.col])) {

                    return true;
                }
            } else if (curr.toUpperCase() === "R") {
                if (Rook(board, from, to, board[from.row][from.col])) {

                    return true;
                }
            } else if (curr.toUpperCase() === "B") {
                if (Bishop(board, from, to, board[from.row][from.col])) {

                    return true;
                }
            } else if (curr.toUpperCase() === "N") {
                if (Knight(board, from, to, board[from.row][from.col])) {

                    return true;
                }
            } else if (curr.toUpperCase() === "Q") {
                if (Queen(board, from, to, board[from.row][from.col])) {

                    return true;
                }
            }
        }
    } return false;

}