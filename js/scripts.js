var board = [
  [0,0,0],
  [0,0,0],
  [0,0,0] ];

var gameOver = false;
var playerTurn = 0;
var moveCounter = 0;

$(document).ready(function() {


 $(".col-md-4").on('click', function() {
   var coordinates = this.id;
   if ((checkIfPopulated(coordinates) === false) && (gameOver != true)) {
     if (playerTurn === 0) {
       populateArray(coordinates, "x");
       $(".x", this).show();
     } else if (playerTurn === 1) {
          populateArray(coordinates, "o");
       $(".o", this).show();
     }
    playerTurn ^= 1;
    moveCounter++;
    traverseBoard(board);
    if (moveCounter === 9) {
      gameOver = true;
      console.log("Draw!");
    }
   }
 });
});

function resetBoard() {
  board = [
    [0,0,0],
    [0,0,0],
    [0,0,0] ];
    $('img').hide();
    gameOver = false;
    playerTurn = 0;
    moveCounter = 0;
}

function populateArray(squareClicked, playerMarker) {
  board[parseInt(squareClicked.charAt(0))][parseInt(squareClicked.charAt(2))] = playerMarker;
}

function checkIfPopulated(squareClicked) {
  if (board[parseInt(squareClicked.charAt(0))][parseInt(squareClicked.charAt(2))] != 0) {
    return true;
  }
  else {
    return false;
  }
}

function traverseBoard(mdArray) {
  for (j = 0; j < 3; j++) {
    var solution = "";
    for (i = 0; i < 3; i++) {
      solution += mdArray[j][i];
    }
    if (solution === "xxx" || solution === "ooo") {
      console.log("Victory!");
      gameOver = true;
    }
  }

  for (j = 0; j < 3; j++) {
    var solution = "";
    for (i = 0; i < 3; i++) {
      solution += mdArray[i][j];
    }
    if (solution === "xxx" || solution === "ooo") {
      console.log("Victory!");
      gameOver = true;
    }
  }

  var diag1 = "";
  for (j = 0; j < 3; j++) {
    var i = j;
    diag1 += mdArray[i][j];
    if (diag1 === "xxx" || diag1 === "ooo") {
      console.log("Victory!");
      gameOver = true;
    }
  }

  var diag2 = "";
  for (j = 0; j < 3; j++) {
    var i = (2 - j);
    diag2 += mdArray[i][j];
    if (diag2 === "xxx" || diag2 === "ooo") {
      console.log("Victory!");
      gameOver = true;
    }
  }
  //
  // console.log(board[0][0] + "|" + board[0][1] + "|" + board[0][2])
  // console.log(board[1][0] + "|" + board[1][1] + "|" + board[1][2])
  // console.log(board[2][0] + "|" + board[2][1] + "|" + board[2][2])
}
