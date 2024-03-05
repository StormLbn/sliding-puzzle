import Board from "./Board.js";

//// Variables

// Image generation
const errorImage = "https://images.unsplash.com/source-404?fit=crop&fm=jpg&h=800&q=60&w=1200";
const defaultImage = "assets/not-found.jpg";
const apiBaseUrl = "https://source.unsplash.com/random/600x600/?";
let imageUrl;

// HTML elements
const puzzleElt = document.querySelector("section#puzzle");
const fullImg = document.querySelector("section#full");
let blankTileElt;
let tilesElts;

let gameBoard;
let victory = false;


//// Functions

// Generate picture from Unsplash :
const generateImage = async (keyword) => {
    try {
        const response = await fetch(apiBaseUrl + keyword);

        return response.url === errorImage ? defaultImage : response.url;
    } catch (error) {
        console.log(error);
    }
}

// Generate board :
const generateBoard = (board) => {
    puzzleElt.innerHTML = "";

    for (let i = 0; i < board.gameTiles.length; i++) {
        const currentTile = board.gameTiles[i];

        const imgElt = document.createElement('img');
        imgElt.setAttribute("src", imageUrl);
        imgElt.setAttribute("alt", "Puzzle tile #" + currentTile.id);

        const tileElt = document.createElement('div');
        tileElt.setAttribute("id", "t" + currentTile.id);
        tileElt.setAttribute("class", "tile");
        tileElt.style.order = currentTile.pos;

        if (currentTile.id === board.lastId) {
            tileElt.classList.add("blank");
        }

        tileElt.appendChild(imgElt);
        puzzleElt.appendChild(tileElt);
    }
}

// Move a tile to the blank position
const moveTile = (tileId) => {
    const currentTile = gameBoard.getTile(tileId);

    if (gameBoard.checkNextToBlank(currentTile)) {
        const blankTile = gameBoard.getTile(gameBoard.lastId);
        const tilePos = currentTile.pos;

        currentTile.setPosition(blankTile.pos);
        blankTile.setPosition(tilePos);

        document.querySelector("div#t" + currentTile.id).style.order = currentTile.pos;
        document.querySelector("div#t" + blankTile.id).style.order = blankTile.pos;
    }
}

// Handler for click event
const handleTileClick = (event) => {
    moveTile(event.currentTarget.id.slice(1));

    if (gameBoard.checkVictory()) {
        endGame();
    }
}

// Instructions when game is completed
const endGame = () => {
    // TODO set victory display
    console.log("Congratulations !");

    blankTileElt.classList.remove("blank");

    tilesElts.forEach(tileElt => tileElt.removeEventListener("click", handleTileClick));
}

// Start a new game :
const startGame = (boardSize) => {
    const board = new Board(boardSize);
    generateBoard(board);
    
    tilesElts = document.querySelectorAll("div.tile:not(.blank)");
    blankTileElt = document.querySelector("div.blank");

    tilesElts.forEach(tileElt => tileElt.addEventListener("click", handleTileClick));
    return board;
}


//// Main

// Set image
imageUrl = await generateImage("landscape");

const fullImgElt = document.createElement('img');
fullImgElt.setAttribute("src", imageUrl);
fullImg.appendChild(fullImgElt);

// Launch game
gameBoard = startGame(3);
