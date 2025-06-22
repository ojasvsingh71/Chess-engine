export function Rook(board, from, to, piece) {
    const rowDiff = from.row - to.row;
    const colDiff = from.col - to.col;
    const target = board[to.row][to.col];

    if (rowDiff === 0) {
        const step = from.col > to.col ? -1 : 1;

        for (let i = from.col + step; i !== to.col; i+=step) {
            if (board[from.row][i] !== "") {
                alert("Not a valid move!!!")
                return false;
            }
        }

        if (piece === "R" && target === target.toLowerCase()) return true;
        if (piece === "r" && target === target.toUpperCase()) return true;
    } else if (colDiff === 0) {
        const step = from.row > to.row ? -1 : 1;

        for (let i = from.row+step; i !==to.row; i+=step) {
            if (board[i][from.col] !== "") {
                alert("Not a valid move!!!")
                return false;
            }
        }

        if (piece === "R" && target === target.toLowerCase()) return true;
        if (piece === "r" && target === target.toUpperCase()) return true;
    }

    alert("Not a valid move!!!")

    return false;
}