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
        winCoords = "";
        console.log("Win!");
      } else if ((needsToBlock === true) && (checkIfPopulated(blockCoords) === false) && (gameOver != true)) {
        placeBlock(blockCoords);
        needsToBlock = false;
        blockCoords = "";
        console.log("Block!");
      } else if ((checkIfPopulated(center) === false) && (gameOver != true)) {
        placeCenter(center);
        console.log("Center!");
      } else if (checkIfPopulated(invertCoordinates(coordinates)) === false && gameOver != true) {
        placeOppositeCorner(coordinates);
        console.log("Opposite!");
      } else if (gameOver != true) {
        console.log("start random function");
        var randCoordinates = "r" + getRandomIndex(0, 2) + "c" + getRandomIndex(0, 2);
        console.log(randCoordinates);
        while (checkIfPopulated(randCoordinates) === true) {
          randCoordinates = "r" + getRandomIndex(0, 2) + "c" + getRandomIndex(0, 2);
          console.log(randCoordinates);
        }
        console.log("Random!");
        placeRandom(randCoordinates);
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
  console.log(Math.round(Math.random() * (max-min) + min));
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
    needsToBlock = false;
    needsToWin = false;
    blockCoords = "";
    winCoords = "";
}

function populateArray(squareClicked, playerMarker) {
  board[parseInt(squareClicked.charAt(1))][parseInt(squareClicked.charAt(3))] = playerMarker;
}

function checkIfPopulated(squareClicked) {
  if (squareClicked.length === 4) {
    if (board[parseInt(squareClicked.charAt(1))][parseInt(squareClicked.charAt(3))] != 0) {
      return true;
    }
    else {
      return false;
    }
  } else {
    console.log("String is empty");
  }
}

function traverseBoard(mdArray) {
  for (j = 0; j < 3; j++) {
    var solution = "";
    for (i = 0; i < 3; i++) {
      solution += mdArray[j][i];
    }
    if (checkWin(solution) === true) {
      needsToWin = true;
      winCoords = "r" + j + "c" + solution.indexOf("0");
      checkVictory(solution);
    }
    if (checkBlock(solution) === true) {
      needsToBlock = true;
      blockCoords = "r" + j + "c" + solution.indexOf("0");
      checkVictory(solution);
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
      checkVictory(solution);
    } if (checkBlock(solution) === true) {
      needsToBlock = true;
      blockCoords = "r" + solution.indexOf("0") + "c" + j;
      checkVictory(solution);
    }
    checkVictory(solution);
  }

  var diag1 = "";
  for (j = 0; j < 3; j++) {
    var i = j;
    diag1 += mdArray[i][j];
    if (checkWin(diag1) === true) {
      needsToWin = true;
      winCoords = "r" + diag1.indexOf("0") + "c" + diag1.indexOf("0");
    } if (checkBlock(diag1) === true) {
      needsToBlock = true;
      blockCoords = "r" + diag1.indexOf("0") + "c" + diag1.indexOf("0");
    }
    checkVictory(diag1);
  }

  var diag2 = "";
  for (j = 0; j < 3; j++) {
    var i = (2 - j);
    diag2 += mdArray[i][j];
    if (i === 0) {
      if (checkWin(diag2) === true) {

        if (diag2.indexOf("0") === 0) {
          needsToWin = true;
          winCoords = "r2c0";
        } else if (diag2.indexOf("0") === 1) {
          needsToWin = true;
          winCoords = "r1c1";
        } else if (diag2.indexOf("0") === 2) {
          needsToWin = true;
          winCoords = "r0c2";
        } else {
          return -1;
        }
      }
      if (checkBlock(diag2) === true) {
          if (diag2.indexOf("0") === 0) {
            needsToBlock = true;
            blockCoords = "r2c0";
            checkVictory(diag2);
          } else if (diag2.indexOf("0") === 1) {
            needsToBlock = true;
            blockCoords = "r1c1";
            checkVictory(diag2);
          } else if (diag2.indexOf("0") === 2) {
            needsToBlock = true;
            blockCoords = "r0c2";
            checkVictory(diag2);
          } else {
            return -1;
          }
      }
      checkVictory(diag2);
    }
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
