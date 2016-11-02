# Tic Tac Toe

### Specs

* When user click plays, game board is loaded
* Game state will keep track of each player's turn
* Game state will check for end of game condition
 * Game state will check for three in a row for a victory
 * Game state will detect if there are no more legal moves for a draw
* When a user clicks on a square, their respective X/O will appear
  * Input: User clicks a square
  * Output: Their respective X or O will appear in that square
* If user clicks on an occupied square, nothing will happen
* When game is over, user will be prompted to play again
 * This option will reload the board

coordinates1

(0,0)(0,1)(0,2)
(1,0)(1,1)(1,2)
(2,0)(2,1)(2,2)

coordinates2
(row = y)(col = x)
(-1,-1)(-1,0)(-1,1)
(0,-1) (0,0) (0,1)
(1,-1) (1,0) (1,1)

to get coordinates2 = coordinates1 - 1

to find opposite location, multiply each coordinate (x and y) by -1

function(coordinates) {
  coordinates -1
  invert coordinates
  return coordinates +1
}
