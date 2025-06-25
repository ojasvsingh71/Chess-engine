export function Pawn(Board, from, to, piece) {
    const direction = (piece === "P" ? -1 : 1);
    // console.log(piece)
    const startRow = (piece === "P" ? 6 : 1);
    const diffRow = to.row - from.row;
    const diffCol = to.col - from.col;
    const target = Board[to.row][to.col];

    if (diffCol == 0 && direction === diffRow && target === "") return true;
    
    if (diffCol == 0 && diffRow === 2 * direction && from.row === startRow && target === "" && Board[to.row - direction][to.col] === "") return true;

    if (Math.abs(diffCol) === 1 && diffRow === direction && target != "" && ((piece === "P" && target === target.toLowerCase()) || (piece === "p" && target === target.toUpperCase()))) return true;
    // alert("Not a valid move!!!")
    return false;
}