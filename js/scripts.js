var gameOver = false;
var playerTurn = 0;
var moveCounter = 0;
var center = "r1c1";
needsToBlock = false;
needsToWin = false;
var blockCoords = "";
var winCoords = "";
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
      if ((needsToWin === true) && (checkIfPopulated(winCoords) === false) && (gameOver != true)) {
        placeWin(winCoords);
        needsToWin = false;
        winCoords = ""
      } else if ((needsToBlock === true) && (checkIfPopulated(blockCoords) === false) && (gameOver != true)) {
        placeBlock(blockCoords);
        needsToBlock = false;
        blockCoords = ""
      } else if ((checkIfPopulated(center) === false) && (gameOver != true)) {
        placeCenter(center);
      } else if (checkIfPopulated(invertCoordinates(coordinates)) === false && gameOver != true) {
        placeOppositeCorner(coordinates);
      } else if (gameOver != true) {
        var randCoordinates = "r" + getRandomIndex(0, 2) + "c" + getRandomIndex(0, 2);
        while (checkIfPopulated(randCoordinates) != false) {
          randCoordinates = "r" + getRandomIndex(0, 2) + "c" + getRandomIndex(0, 2);
          console.log(randCoordinates);
        }
        console.log(randCoordinates);
        placeRandom(randCoordinates);
      }
      nextMove();
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

function placeBlock(coordinates) {
  populateArray(coordinates, "o");
  $(".o", "#" + coordinates).delay(300).fadeIn(250);
}

function placeWin(coordinates) {
  populateArray(coordinates, "o");
  $(".o", "#" + coordinates).delay(300).fadeIn(250);
}

function placeCenter(coordinates) {
  populateArray(coordinates, "o");
  $(".o", "#" + coordinates).delay(300).fadeIn(250);
}

function placeOppositeCorner(coordinates) {
  var invCoordinates = invertCoordinates(coordinates);
  populateArray(invCoordinates, "o");
  $(".o", "#" + invCoordinates).delay(300).fadeIn(250);
}

function placeRandom(coordinates) {
  populateArray(coordinates, "o");
  $(".o", "#" + coordinates).delay(300).fadeIn(250);
}

function getRandomIndex(min, max) {
  return Math.round(Math.random() * (max-min) + min);
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
    $('#game-status').text("");
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
    if (checkBlock(solution) === true) {
      needsToBlock = true;
      blockCoords = "r" + j + "c" + solution.indexOf("0");
      console.log(solution.indexOf("0"));
      console.log(blockCoords);
    }
    checkVictory(solution);

  }

  for (j = 0; j < 3; j++) {
    var solution = "";
    for (i = 0; i < 3; i++) {
      solution += mdArray[i][j];
    }
    if (checkWin(solution) === true) {
      needsToWin = true;
      winCoords = "r" + solution.indexOf("0") + "c" + j;
    } if (checkBlock(solution) === true) {
      needsToBlock = true;
      blockCoords = "r" + solution.indexOf("0") + "c" + j;
    checkVictory(solution);
    }
  }

  var diag1 = "";
  for (j = 0; j < 3; j++) {
    var i = j;
    diag1 += mdArray[i][j];
    if (checkWin(solution) === true) {
      needsToWin = true;
      winCoords = "r" + solution.indexOf("0") + "c" + solution.indexOf("0");
    } if (checkBlock(solution) === true) {
      needsToBlock = true;
      blockCoords = "r" + solution.indexOf("0") + "c" + solution.indexOf("0");
    checkVictory(solution);
    }
    checkVictory(diag1);
  }

  var diag2 = "";
  for (j = 0; j < 3; j++) {
    var i = (2 - j);
    diag2 += mdArray[i][j];
    if (checkWin(solution) === true) {
      needsToWin = true;
      winCoords = "r" + solution.indexOf("0") + "c" + solution.indexOf("0");
    } if (checkBlock(solution) === true) {
      needsToBlock = true;
      blockCoords = "r" + solution.indexOf("0") + "c" + solution.indexOf("0");
    checkVictory(solution);
    }
    checkVictory(diag2);
    // checkBlock(diag2);
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

  function checkBlock(string) {
    newString = string.replace(/[0-9]/g, '');
    if (newString === "xx") {
      return true;
    } else {
      return false;
    }
  }

  function checkWin(string) {
    newString = string.replace(/[0-9]/g, '');
    if (newString === "oo") {
      return true;
    } else {
      return false;
    }
  }
  console.log(board[0][0] + "|" + board[0][1] + "|" + board[0][2])
  console.log(board[1][0] + "|" + board[1][1] + "|" + board[1][2])
  console.log(board[2][0] + "|" + board[2][1] + "|" + board[2][2])
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
