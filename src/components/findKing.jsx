export function FindKing(board, piece) {
    console.log(piece);
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            if (board[row][col] === piece) {
                console.log({ row, col });
                return { row, col };
            }
        }
    }
    console.log("Couldn't find the king :<");
    return (null);
}