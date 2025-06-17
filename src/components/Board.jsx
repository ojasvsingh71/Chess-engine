import React from "react";


function Board() {
    const size = 8;
    const board = [];

    for (let row = 0; row < size; row++) {
        const cells = [];

        for (let col = 0; col < size; col++) {
            const isB = (row + col) % 2 === 1;
            cells.push(
                <div
                    key={row * 10 + col}
                    className={`w-16 h-16 ${isB ? 'bg-gray-800' : 'bg-white'}`}
                >
                </div>
            );
        } board.push(...cells);
    }

    return (
        <div className="grid grid-cols-8 border border-gray-700 mx-auto mt-10">
            {board}
        </div>
    )
}

export default Board;