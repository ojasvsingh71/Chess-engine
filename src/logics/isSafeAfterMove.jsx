import { Checks } from "../components/checks";

export function isSafeAfterMove(board, from, to, piece) {

    const sim = board.map(r => [...r]);
    sim[to.row][to.col] = piece;
    sim[from.row][from.col] = "";

    const myKing = piece === piece.toUpperCase() ? "K" : "k";
    return !Checks(sim, myKing);
}