import Board from "./Board.js";

// Image generation
const errorImage = "https://images.unsplash.com/source-404?fit=crop&fm=jpg&h=800&q=60&w=1200";
const defaultImage = "assets/not-found.jpg"
const apiBaseUrl = "https://source.unsplash.com/random/600x600/?"

// HTML elements
const puzzle = document.querySelector("section#puzzle");

// Tests

// Generate picture from Unsplash :
let imageUrl;

try {
    const response = await fetch(apiBaseUrl + "landscape");

    console.log(response);

    imageUrl = response.url === errorImage ? defaultImage : response.url;
} catch (error) {
    console.log(error);
}

const imgElt = document.createElement('img')
imgElt.setAttribute("src", imageUrl);
document.querySelector("section#full").appendChild(imgElt);
console.log(imageUrl);

// Generate board :
const board = new Board(3);

for (let i = 0; i < board.gameTiles.length; i++) {
    const currentTile = board.gameTiles[i];

    const imgElt = document.createElement('img');
    imgElt.setAttribute("src", imageUrl);
    imgElt.setAttribute("alt", "Puzzle tile #" + currentTile.id);
    
    const tileElt = document.createElement('div');
    tileElt.setAttribute("id", "t" + currentTile.id);
    tileElt.setAttribute("class", "tile");
    tileElt.style.order = currentTile.pos;

    if (currentTile.id === board.gameTiles.length - 1) {
        tileElt.classList.add("blank");
    }

    tileElt.appendChild(imgElt);
    puzzle.appendChild(tileElt);
}

console.log(board.checkVictory());
