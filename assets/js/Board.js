import Tile from "./Tile.js";

export default class Board {
    constructor(size) {
        // Number of rows or columns of the board (size * size board)
        this.size = size;

        // List of game tiles, with position & coordinates
        this.gameBoard = this.initBoard();
    }

    // Create the (solved) board with the right size
    #createBoard() {
        const board = [];
        for (let i = 0; i < this.size * this.size; i++) {
            board[i] = i;
        }
        return board;
    }

    // Counts inversions in shuffled board
    #countInversions(board) {
        // Inversion -> when a tile is preceeded by a bigger tile, except the last (blank)
        let inversions = 0;

        // We iterate first on the whole board except the first (because it has no previous tile)
        for (let i = 1; i < board.length; i++) {
            // We iterate on all previous tiles
            for (let j = 0; j < i; j++) {
                // We check if the tile j is bigger than the tile j, but is not the "last" (biggest) tile
                if (
                    board[i] < board[j]
                    && board[j] !== board.length - 1
                ) {
                    inversions++;
                }
            }
        }

        return inversions;
    }

    // Check if the shuffled board is solvable
    #checkSolvable(board) {
        let inv = this.#countInversions(board);

        // For even-sized boards, we need the row position of the "blank" tile
        const blankTileRow = Math.trunc(board.indexOf(board.length - 1) / this.size);

        if (
            // Odd-sized boards : solvable if inversions are even
            (this.size % 2 === 1 && inv % 2 === 0)
            // Even-sized boards : solvable if inversions + row position of the blank tile is odd
            || (this.size % 2 === 0 && (blankTileRow + inv) % 2 === 1)
        ) {
            return true;
        } else {
            return false;
        }
    }

    // Create the starting board, with tiles in random positions
    #createStartBoard() {
        let board;

        do {
            board = this.#createBoard();

            for (let i = board.length - 1; i > 0; i--) {
                // Select a random element of the list :
                const randomId = Math.floor(Math.random() * (i + 1));

                // Invert the current element with the random one :
                const actualNumber = board[i];
                board[i] = board[randomId];
                board[randomId] = actualNumber;
            }
        } while (!this.#checkSolvable(board));

        return board;
    }

    // Create the list of tiles with the starting order
    initBoard() {
        const startBoard = this.#createStartBoard();
        const tiles = [];

        for (let i = 0; i < startBoard.length; i++) {
            const tile = new Tile(startBoard[i], i, this.size);
            tiles[i] = tile;
        }

        return tiles;
    }

    // Check if the game is completed
    checkVictory() {
        for (const tile of this.gameBoard) {
            // If any tile is at the wrong place, then the board isn't completed
            if (tile.pos !== tile.id) {
                return false;
            }
        }
        return true;
    }
}