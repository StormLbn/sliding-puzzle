import Board from "./Board.js";

//// Variables

// Image generation
const errorImage = "https://images.unsplash.com/source-404?fit=crop&fm=jpg&h=800&q=60&w=1200";
const defaultImage = "assets/not-found.jpg";
const apiBaseUrl = "https://source.unsplash.com/random/600x600/?";
let imageUrl;

// HTML elements
const puzzleElt = document.querySelector("section#puzzle");
const fullImgElt = document.createElement('img');
let tilesElts;

let gameBoard;


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

// Start a new game :
const startGame = (boardSize) => {
    const board = new Board(boardSize);

    generateBoard(board);
    console.log(board.gameTiles);

    return board;
}


//// Main

imageUrl = await generateImage("landscape");

fullImgElt.setAttribute("src", imageUrl);
document.querySelector("section#full").appendChild(fullImgElt);

gameBoard = startGame(3);

//// TODO refactor

tilesElts = document.querySelectorAll("div.tile:not(.blank)");

tilesElts.forEach(tileElt => tileElt.addEventListener("click", () => {
    const id = tileElt.id.slice(1);
    console.log("Tile ID = " + id);

    console.log("Game board :");
    console.log(gameBoard.gameTiles);

    const currentTile = gameBoard.getTile(id);
    console.log("Current tile :");
    console.log(currentTile);

    const blankTile = gameBoard.getTile(gameBoard.lastId);
    console.log("Blank tile :");
    console.log(blankTile);

    console.log("Current and blank tile next to each other : " + gameBoard.checkNextToBlank(currentTile));
}));