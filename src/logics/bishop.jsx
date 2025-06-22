export function Bishop(board, from, to, piece) {
    const rowDiff = from.row - to.row;
    const colDiff = from.col - to.col;
    const target = board[to.row][to.col];
    console.log(piece);

    if (Math.abs(rowDiff) !== Math.abs(colDiff)) {
        alert("Invalid Move!!!");
        return false;
    }

    const rstep = rowDiff > 0 ? -1 : 1;
    const cstep = colDiff > 0 ? -1 : 1;

    let i = from.row + rstep;
    let j = from.col + cstep;
    while (i >= 0 && j >= 0 && i <= 8 && j <= 8 && i !== to.row && j !== to.col) {
        // console.log(i, j);
        if (board[i][j] !== "") {
            alert("Invalid Move!!!");
            return false;
        }
        i += rstep;
        j += cstep;
    }
    if (target === "") return true;
    if (piece === "B" && target === target.toLowerCase()) return true;
    if (piece === "b" && target === target.toUpperCase()) return true;

    alert("Invalid Move!!!");

    return false;
}