export function Queen(board, from, to, piece) {
    const rowDiff = from.row - to.row;
    const colDiff = from.col - to.col;
    const target = board[to.row][to.col];
    console.log(piece);

    if (rowDiff === 0) {
        const step = from.col > to.col ? -1 : 1;

        for (let i = from.col + step; i !== to.col; i += step) {
            if (board[from.row][i] !== "") {
                alert("Not a valid move!!!")
                return false;
            }
        }

        if (piece === "Q" && target === target.toLowerCase()) return true;
        if (piece === "q" && target === target.toUpperCase()) return true;
    } else if (colDiff === 0) {
        const step = from.row > to.row ? -1 : 1;

        for (let i = from.row + step; i !== to.row; i += step) {
            if (board[i][from.col] !== "") {
                alert("Not a valid move!!!")
                return false;
            }
        }

        if (piece === "Q" && target === target.toLowerCase()) return true;
        if (piece === "q" && target === target.toUpperCase()) return true;
    }
    
    if (Math.abs(rowDiff) !== Math.abs(colDiff)) {
        alert("Invalid Move!!!");
        return false;
    }

    const rstep = rowDiff > 0 ? -1 : 1;
    const cstep = colDiff > 0 ? -1 : 1;

    let i = from.row + rstep;
    let j = from.col + cstep;
    while (i !== to.row && j !== to.col) {
        // console.log(i, j);
        if (board[i][j] !== "") {
            alert("Invalid Move!!!");
            return false;
        }
        i += rstep;
        j += cstep;
    }

    if (piece === "Q" && target === target.toLowerCase()) return true;
    if (piece === "q" && target === target.toUpperCase()) return true;

    alert("Not a valid move!!!")

    return false;
}