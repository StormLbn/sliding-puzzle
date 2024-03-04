export default class Tile {
    constructor(id, pos, boardSize) {
        // Tile position in solved board
        this.id = id;

        // Size of the board (n * n)
        this.boardSize = boardSize;

        // Setting position of the tile, in list position and coordinates
        this.setPosition(pos, boardSize);
    }

    // Set position and calculate corresponding coordinates
    setPosition(pos) {
        // Position in the list
        this.pos = pos;

        // x coordinate on the board
        this.x = Math.trunc(pos / this.boardSize);
        
        // y coordinate on the board
        this.y = pos % this.boardSize;
    }
    
    // Set coordinates and calculate corresponding position in list
    setCoordinates(x, y) {
        this.x = x;
        this.y = y;
        this.pos = x * this.boardSize + y;
    }
}