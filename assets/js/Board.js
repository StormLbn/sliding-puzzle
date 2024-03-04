import Tile from "./Tile.js";

export default class Board {
    constructor(size) {
        // Number of rows or columns of the board (size * size board)
        this.size = size;

        // List of game tiles, with position & coordinates
        this.gameTiles = this.generateTiles();
    }

    // Create the (solved) board with the right size
    createBoard() {
        const board = [];
        for (let i = 0; i < this.size * this.size; i++) {
            board[i] = i;
        }
        return board;
    }
    
    // Check if the shuffled board is solvable
    checkSolvable() {
        // TODO
        console.log("checkSolvable() method to do, always returns true");
        return true;
    }

    // Create the starting board, with tiles in random positions
    createStartBoard() {
        let board;
        
        do {
            board = this.createBoard();

            for (let i = board.length - 1; i > 0; i--) {
                // Select a random element of the list :
                const randomId = Math.floor(Math.random() * (i + 1));

                // Invert the current element with the random one :
                const actualNumber = board[i];
                board[i] = board[randomId];
                board[randomId] = actualNumber;
            }
        } while (!this.checkSolvable());

        return board;
    }

    // Create the list of tiles with the starting order
    generateTiles() {
        const startBoard = this.createStartBoard();
        const tiles = [];

        for (let i = 0; i < startBoard.length; i++) {
            const tile = new Tile(startBoard[i], i, this.size);
            tiles[i] = tile;
        }

        return tiles;
    }

    // Check if the game is completed
    checkVictory() {
        for (const tile of this.gameTiles) {
            // If any tile is at the wrong place, then the board isn't completed
            if (tile.pos !== tile.id) {
                return false;
            }
        }
        return true;
    }
}