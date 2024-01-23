let playerRed ='r'
let playerYellow = 'y'
let currplayer = playerRed;

const player1 = document.getElementById("player1");
const player2 = document.getElementById("player2");

let rows = 6;
let columns = 7;
let board = [];
let currColumns = [5, 5, 5, 5, 5, 5, 5];


function gameOver() {
  document.querySelector(".gameover").style.display = "block";
  setTimeout(window.location.reload.bind(window.location), 2000);
}

window.onload = () => {
  setGame();
};

function setGame() { 
  for (let r = 0; r < rows; r++) {
    let row = [];
    for (let c = 0; c < columns; c++) {
      row.push("");

      let tile = document.createElement("div");
      tile.id = r.toString() + "-" + c.toString();
      tile.classList.add("tile");
      tile.addEventListener("click", setPiece);
      document.getElementById("board").append(tile);
    }
    board.push(row);
  }
}


function setPiece() {
  let str = currColumns.join('');
  document.querySelector(".starttxt").style.display = "none";
  let coords = this.id.split("-");
  let r = parseInt(coords[0]);
  let c = parseInt(coords[1]);

  r = currColumns[c];
  if (r < 0) {
    return;
  }

  board[r][c] = currplayer;
  let tile = document.getElementById(r.toString() + "-" + c.toString());

  if (currplayer == playerRed) {
    tile.classList.add("red-piece");
    currplayer = playerYellow;
    player1.style.display = "none";
    player2.style.display = "block";

  } else {
    tile.classList.add("yellow-piece");
    currplayer = playerRed;
    player2.style.display = "none";
    player1.style.display = "block";
  }

  r -= 1;
  currColumns[c] = r;

  checkWinner();
 
  if (str === "0-1-1-1-1-1-1" || str === "-1-0-1-1-1-1"
  || str === "-1-1-0-1-1-1" || str === "-1-1-1-0-1-1"
  || str === "-1-1-1-1-0-1" || str === "-1-1-1-1-1-0") {
setTimeout(gameOver, 1000);
}


}

function checkWinner() {
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns - 3; c++) {
      if (board[r][c] != "") {
        if (
          board[r][c] == board[r][c + 1] &&
          board[r][c + 1] == board[r][c + 2] &&
          board[r][c + 2] == board[r][c + 3]
        ) {
          
          setWinner(r, c);
          return;
        }
     }
    }
  }


  for (let c = 0; c < columns; c++) {
    for (let r = 0; r < rows-3; r++) {
      if (board[r][c] != "") {
        if (
          board[r][c] == board[r+1][c] &&
          board[r+1][c] == board[r+2][c] &&
          board[r+2][c] == board[r+3][c]
        ) {
          
          setWinner(r, c);
          return;
        }
      }
    }
  }

  for (let r = 0; r < rows - 3; r++) {
    for (let c = 0; c < columns-3; c++) {
      if (board[r][c] != "") {
        if (
          board[r][c] == board[r+1][c+1] &&
          board[r+1][c+1] == board[r+2][c+2] &&
          board[r+2][c+2] == board[r+3][c+3]
        ) {
          
          setWinner(r,c);
          return;
        }
      }     
    }  
  }

  for (let r = 3; r < rows; r++) {
    for (let c = 0; c < columns-3; c++) {
      if (board[r][c] != "") {
        if (
          board[r][c] == board[r-1][c+1] &&
          board[r-1][c+1] == board[r-2][c+2] &&
          board[r-2][c+2] == board[r-3][c+3]
        ) {
          setWinner(r,c);
          return;
        }
      }     
    }  
  }

}


function setWinner(r,c){
    let winner = document.querySelector(".winner");
    if (board[r][c] == playerRed) {
        winner.style.color = "red"
        winner.textContent = "Player1 won!";
        player2.style.display = "none";
        document.getElementById("nextMtxt").style.display = "block";
        setTimeout(window.location.reload.bind(window.location), 2000);    
    }
    else{
        winner.style.color = "#fff"
        player1.style.display = "none";
        winner.textContent = "Player2 won!";
        document.getElementById("nextMtxt").style.display = "block";
        setTimeout(window.location.reload.bind(window.location), 2000); 
    } 
}


let bglist = [" rgb(10, 5, 24)"," rgb(25, 113, 164)","black"]
let rdi = Math.floor(Math.random() * bglist.length);
const bg = bglist[rdi]
document.getElementById("board").style.backgroundColor = bg;




