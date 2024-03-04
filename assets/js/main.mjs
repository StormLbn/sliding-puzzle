import Board from "./Board.js";

//// Variables

// Image generation
const errorImage = "https://images.unsplash.com/source-404?fit=crop&fm=jpg&h=800&q=60&w=1200";
const defaultImage = "assets/not-found.jpg"
const apiBaseUrl = "https://source.unsplash.com/random/600x600/?"
let imageUrl;

// HTML elements
const puzzle = document.querySelector("section#puzzle");
const fullImgElt = document.createElement('img')

let board;


//// Functions

// Generate picture from Unsplash :
const generateImage = async () => {
    try {
        const response = await fetch(apiBaseUrl + "landscape");

        return response.url === errorImage ? defaultImage : response.url;
    } catch (error) {
        console.log(error);
    }
}

// Generate board :
const generateBoard = (board) => {

    for (let i = 0; i < board.gameBoard.length; i++) {
        const currentTile = board.gameBoard[i];

        const imgElt = document.createElement('img');
        imgElt.setAttribute("src", imageUrl);
        imgElt.setAttribute("alt", "Puzzle tile #" + currentTile.id);

        const tileElt = document.createElement('div');
        tileElt.setAttribute("id", "t" + currentTile.id);
        tileElt.setAttribute("class", "tile");
        tileElt.style.order = currentTile.pos;

        if (currentTile.id === board.gameBoard.length - 1) {
            tileElt.classList.add("blank");
        }

        tileElt.appendChild(imgElt);
        puzzle.appendChild(tileElt);
    }
}


//// Main

imageUrl = await generateImage();

fullImgElt.setAttribute("src", imageUrl);
document.querySelector("section#full").appendChild(fullImgElt);

board = new Board(3);
generateBoard(board);
