import Tile from "./Tile.js";

export default class Board {
    constructor(size) {
        // Number of rows or columns of the board (size * size board)
        this.size = size;

        // ID of the last tile
        this.lastId = size * size - 1;

        // List of game tiles, with position & coordinates
        this.gameTiles = this.initBoard();

    }

    // Create the list of tiles with the starting order
    initBoard() {
        const startBoard = createStartBoard(this.size);
        const tiles = [];

        for (let i = 0; i < startBoard.length; i++) {
            const tile = new Tile(startBoard[i], i, this.size);
            tiles[i] = tile;
        }

        return tiles;
    }

    // Get a tile from the list by its ID
    getTile(id) {
        return this.gameTiles.find(tile => tile.id == id);
    }

    // Check if the current tile is next to the blank tile
    checkNextToBlank(tile) {
        return tile.checkNeighbors(this.getTile(this.lastId));
    }

    // Check if the game is completed
    checkVictory() {
        for (const tile of this.gameTiles) {
            // If any tile is at the wrong place, then the board isn't completed
            if (tile.pos != tile.id) {
                return false;
            }
        }
        return true;
    }
}

// Create the (solved) board list with the right size
function createBoardList(size) {
    const boardList = [];
    for (let i = 0; i < size * size; i++) {
        boardList[i] = i;
    }
    return boardList;
}

// Counts inversions in shuffled board list
function countInversions(boardList) {
    // Inversion -> when a tile is preceeded by a bigger tile, except the last (blank)
    let inversions = 0;

    // We iterate first on the whole board (except the first because it has no previous tile)
    for (let i = 1; i < boardList.length; i++) {
        // We iterate on all previous tiles
        for (let j = 0; j < i; j++) {
            // We check if the tile j is bigger than the tile i, but is not the "last" (biggest) tile
            if (
                boardList[i] < boardList[j]
                && boardList[j] !== boardList.length - 1
            ) {
                inversions++;
            }
        }
    }

    return inversions;
}

// Check if the shuffled board is solvable
function checkSolvable(board, size) {
    let inv = countInversions(board);

    // For even-sized boards, we need the row position of the "blank" tile
    const blankTileRow = Math.trunc(board.indexOf(board.length - 1) / size);

    if (
        // Odd-sized boards : solvable if inversions are even
        (size % 2 === 1 && inv % 2 === 0)
        // Even-sized boards : solvable if inversions + row position of the blank tile is odd
        || (size % 2 === 0 && (blankTileRow + inv) % 2 === 1)
    ) {
        return true;
    } else {
        return false;
    }
}

// Create the starting board, with tiles in random positions
function createStartBoard(size) {
    let board;

    do {
        board = createBoardList(size);

        for (let i = board.length - 1; i > 0; i--) {
            // Select a random element of the list :
            const randomId = Math.floor(Math.random() * (i + 1));

            // Invert the current element with the random one :
            const actualNumber = board[i];
            board[i] = board[randomId];
            board[randomId] = actualNumber;
        }
    } while (!checkSolvable(board, size));

    return board;
}
