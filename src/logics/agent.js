import { Pawn } from "./pawn";
import { Rook } from "./rook";
import { Bishop } from "./bishop";
import { Knight } from "./knight";
import { Queen } from "./queen";
import { King } from "./king";
import { isSafeAfterMove } from "./isSafeAfterMove";

/**
 * Fully Observable Agent:
 * - perceives entire board (2D array)
 * - enumerates legal moves using piece functions + isSafeAfterMove
 * - picks moves by: highest-value capture -> safe move (not immediately attacked) -> random
 */

const MATERIAL = { P: 1, N: 3, B: 3, R: 5, Q: 9, K: 100 };

function cloneBoard(board) {
    return board.map(row => row.slice());
}

function isWhitePiece(p) {
    return p && p === p.toUpperCase();
}

function pieceType(p) {
    return p ? p.toUpperCase() : null;
}

// Tell whether a raw piece can move from -> to (based solely on piece movement rules)
function rawPieceCanMove(board, from, to, piece) {
    if (!piece) return false;
    const type = piece.toUpperCase();
    if (type === "P") return Pawn(board, from, to, piece);
    if (type === "N") return Knight(board, from, to, piece);
    if (type === "B") return Bishop(board, from, to, piece);
    if (type === "R") return Rook(board, from, to, piece);
    if (type === "Q") return Queen(board, from, to, piece);
    if (type === "K") return King(board, from, to, piece);
    return false;
}

// Simulate a move on a cloned board (best-effort en-passant handling)
function simulateMove(board, from, to) {
    const newBoard = cloneBoard(board);
    const piece = newBoard[from.row][from.col];
    if (!piece) return newBoard;

    // best-effort en-passant: pawn diagonal into empty square removes captured pawn behind that square
    if (piece.toUpperCase() === "P" && from.col !== to.col && newBoard[to.row][to.col] === "") {
        // captured pawn sits at same row as from, at destination column
        newBoard[from.row][to.col] = "";
    }

    newBoard[to.row][to.col] = piece;
    newBoard[from.row][from.col] = "";
    return newBoard;
}

// Check if a square is attacked by given color (byColor = 'w' or 'b')
function isSquareAttacked(board, square, byColor) {
    for (let r = 0; r < 8; r++) {
        for (let c = 0; c < 8; c++) {
            const p = board[r][c];
            if (!p) continue;
            const pIsWhite = isWhitePiece(p);
            if ((byColor === "w" && !pIsWhite) || (byColor === "b" && pIsWhite)) continue;
            const from = { row: r, col: c };
            const to = { row: square.row, col: square.col };
            if (rawPieceCanMove(board, from, to, p)) return true;
        }
    }
    return false;
}

export function allLegalMoves(board, color) {
    const moves = [];
    for (let r = 0; r < 8; r++) {
        for (let c = 0; c < 8; c++) {
            const p = board[r][c];
            if (!p) continue;
            const pIsWhite = isWhitePiece(p);
            if ((color === "w" && !pIsWhite) || (color === "b" && pIsWhite)) continue;
            const from = { row: r, col: c };

            for (let tr = 0; tr < 8; tr++) {
                for (let tc = 0; tc < 8; tc++) {
                    const to = { row: tr, col: tc };
                    if (!rawPieceCanMove(board, from, to, p)) continue;
                    if (!isSafeAfterMove(board, from, to, p)) continue;
                    moves.push({ from, to });
                }
            }
        }
    }
    return moves;
}

export class FullyObservableAgent {
    constructor(color) {
        this.color = color; 
    }

    evaluateCapture(board, to) {
        const tgt = board[to.row][to.col];
        if (!tgt) return 0;
        const type = tgt.toUpperCase();
        return MATERIAL[type] || 0;
    }

    // returns a move object { from, to } or null if none
    pickMove(board) {
        const legal = allLegalMoves(board, this.color);
        if (!legal || legal.length === 0) return null;

        // captures: sort by highest material gain
        const captures = legal
            .map(m => ({ ...m, value: this.evaluateCapture(board, m.to) }))
            .filter(m => m.value > 0);
        if (captures.length > 0) {
            captures.sort((a, b) => b.value - a.value);
            return captures[0];
        }

        // safe moves: after move, ensure moved square is NOT attacked by enemy
        const enemy = this.color === "w" ? "b" : "w";
        const safeMoves = [];
        for (const m of legal) {
            const sim = simulateMove(board, m.from, m.to);
            // if moved piece ended up on to, check whether that square is attacked by enemy
            if (!isSquareAttacked(sim, m.to, enemy)) safeMoves.push(m);
        }
        if (safeMoves.length > 0) {
            return safeMoves[Math.floor(Math.random() * safeMoves.length)];
        }

        return legal[Math.floor(Math.random() * legal.length)];
    }
}
