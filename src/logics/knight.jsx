export function Knight(board, from, to, piece) {
    const rowDiff = from.row - to.row;
    const colDiff = from.col - to.col;
    const target = board[to.row][to.col];
    // console.log(piece);

    if ((Math.abs(rowDiff) === 2 && Math.abs(colDiff) === 1) || (Math.abs(rowDiff) === 1 && Math.abs(colDiff) === 2)) {

        if (piece === "N" && target === target.toLowerCase()) return true;
        if (piece === "n" && target === target.toUpperCase()) return true;
    }
    // alert("Invalid Move!!!");
    return false;
}