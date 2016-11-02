var board = [
  [0,0,0],
  [0,0,0],
  [0,0,0] ];

var gameOver = false;
var playerTurn = 0;
var moveCounter = 0;

$(document).ready(function() {
  $("#game-status").text("Player 1's turn!");
  $("#reset").on('click', function() {
    resetBoard();
  });
  $(".col-md-4").on('click', function() {
   var coordinates = this.id;
   if ((checkIfPopulated(coordinates) === false) && (gameOver != true)) {
     if (playerTurn === 0) {
       populateArray(coordinates, "x");
       $(".x", this).show();
       $("#game-status").text("Player 2 Go!");
     } else if (playerTurn === 1) {
       populateArray(coordinates, "o");
       $(".o", this).show();
       $("#game-status").text("Player 1 Go!");

     }
    playerTurn ^= 1;
    moveCounter++;
    traverseBoard(board);
    if (moveCounter === 9 && gameOver != true) {
      gameOver = true;
      $("#game-status").text("Draw!");
      $("#reset").show();

    }
   }
 });
});

function resetBoard() {
  board = [
    [0,0,0],
    [0,0,0],
    [0,0,0] ];
    $('#game-status').text("Player 1's turn!");
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
      $('#game-status').text("Player 1 wins!");
      gameOver = true;
      $('#reset').show();
    }
    if (string === "ooo") {
      $('#game-status').text("Player 2 wins!");
      gameOver = true;
      $('#reset').show();
    }
  }
  // console.log(board[0][0] + "|" + board[0][1] + "|" + board[0][2])
  // console.log(board[1][0] + "|" + board[1][1] + "|" + board[1][2])
  // console.log(board[2][0] + "|" + board[2][1] + "|" + board[2][2])
}
