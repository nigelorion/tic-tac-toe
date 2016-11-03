var gameOver = false;
var playerTurn = 0;
var moveCounter = 0;
var board = [
  [0,0,0],
  [0,0,0],
  [0,0,0] ];

$(document).ready(function() {
  $("#play").on('click', function() {
    $("#row-min").fadeIn(600);
    $("#play").hide();
  });
  // $("#game-status").text("Player 1's turn!");
  $("#reset").on('click', function() {
    resetBoard();
  });
  $(".col-md-4").on('click', function() {
    var columnClicked = this;
    var coordinates = this.id;
    var invertedCoordinates = invertCoordinates(coordinates);
    if ((checkIfPopulated(coordinates) === false) && (gameOver != true)) {
      placePlayerMarker(columnClicked, coordinates);
      incrementMove();
      traverseBoard(board);
      checkDraw();
      if ((checkIfPopulated(invertedCoordinates) === false) && (gameOver != true)) {
        placeComputerMarker(invertedCoordinates);
      }
      // nextMove();
      incrementMove();
      traverseBoard(board);
      checkDraw();
    }
 });
});

function placePlayerMarker(columnClicked, coordinates) {
   if (playerTurn === 0) {
     populateArray(coordinates, "x");
     $(".x", columnClicked).fadeIn(250);
    //  $("#game-status").text("Player 2 Go!");
   }
  //  else if (playerTurn === 1) {
  //    populateArray(coordinates, "o");
  //    $(".o", columnClicked).fadeIn(250);
  //    $("#game-status").text("Player 1 Go!");
  //  }
}

function placeComputerMarker(invertedCoordinates) {
  populateArray(invertedCoordinates, "o");
  $(".o", "#" + invertedCoordinates).delay(300).fadeIn(250);
}

// function nextMove() {
//   playerTurn ^= 1;
// }

function incrementMove() {
  moveCounter++;
}

function checkDraw() {
  if (moveCounter === 9 && gameOver != true) {
    gameOver = true;
    $("#game-status").text("Draw!");
    $("#reset").fadeIn(250);
  }
}

function resetBoard() {
  board = [
    [0,0,0],
    [0,0,0],
    [0,0,0] ];
    // $('#game-status').text("Player 1's turn!");
    $('img').hide();
    $("#reset").hide();
    gameOver = false;
    playerTurn = 0;
    moveCounter = 0;
}

function populateArray(squareClicked, playerMarker) {
  board[parseInt(squareClicked.charAt(1))][parseInt(squareClicked.charAt(3))] = playerMarker;
}

function checkIfPopulated(squareClicked) {
  if (board[parseInt(squareClicked.charAt(1))][parseInt(squareClicked.charAt(3))] != 0) {
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
    checkVictory(solution);
  }

  for (j = 0; j < 3; j++) {
    var solution = "";
    for (i = 0; i < 3; i++) {
      solution += mdArray[i][j];
    }
    checkVictory(solution);
  }

  var diag1 = "";
  for (j = 0; j < 3; j++) {
    var i = j;
    diag1 += mdArray[i][j];
    checkVictory(diag1);
  }

  var diag2 = "";
  for (j = 0; j < 3; j++) {
    var i = (2 - j);
    diag2 += mdArray[i][j];
    checkVictory(diag2);
  }

  function checkVictory(string) {
    if (string === "xxx") {
      $('#game-status').text("Human wins!");
      gameOver = true;
      $('#reset').show();
    }
    if (string === "ooo") {
      $('#game-status').text("Computer wins!");
      gameOver = true;
      $('#reset').show();
    }
  }
  // console.log(board[0][0] + "|" + board[0][1] + "|" + board[0][2])
  // console.log(board[1][0] + "|" + board[1][1] + "|" + board[1][2])
  // console.log(board[2][0] + "|" + board[2][1] + "|" + board[2][2])
}







function invertCoordinates(coordinates) {
  var position1 = parseInt(coordinates.charAt(1));
  var position2 = parseInt(coordinates.charAt(3));
  position1 -= 1;
  position1 *= -1;
  position1 += 1;
  position2 -= 1;
  position2 *= -1;
  position2 += 1;
  return "r" + position1 + "c" + position2;
}
