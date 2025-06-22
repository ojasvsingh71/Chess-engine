export function King(board, from, to, piece) {
    const rowDiff = from.row - to.row;
    const colDiff = from.col - to.col;
    const target = board[to.row][to.col];
    console.log(piece);

    if ((Math.abs(rowDiff) === 1 && Math.abs(colDiff) === 1) || (Math.abs(rowDiff) === 0 && Math.abs(colDiff) === 1) || (Math.abs(rowDiff) === 1 && Math.abs(colDiff) === 0)) {
        if (piece === "K" && target === target.toLowerCase()) return true;
        if (piece === "k" && target === target.toUpperCase()) return true;
    }

    alert("Invalid Move!!!");

    return false;
}