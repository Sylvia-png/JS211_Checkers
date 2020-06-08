'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

class Checker{
  constructor(color){
    if(color == "white"){
      this.symbol = String.fromCharCode(0x125CB)
    }
    else{
      this.symbol = String.fromCharCode(0x125CF)
    }
  }
}

// class board
class Board {
  constructor() {
    this.grid = [];
    this.checkers = [];
  }

  // method that creates an 8x8 array, filled with null values
  createGrid() {
    // loop to create the 8 rows
    for (let row = 0; row < 8; row++) {
      this.grid[row] = [];
      // push in 8 columns of nulls
      for (let column = 0; column < 8; column++) {
        this.grid[row].push(null);
      }
    }
  }
  viewGrid() {
    // add our column numbers
    let string = "  0 1 2 3 4 5 6 7\n";
    for (let row = 0; row < 8; row++) {
      // we start with our row number in our array
      const rowOfCheckers = [row];
      // a loop within a loop
      for (let column = 0; column < 8; column++) {
        // if the location is "truthy" (contains a checker piece, in this case)
        if (this.grid[row][column]) {
          // push the symbol of the check in that location into the array
          rowOfCheckers.push(this.grid[row][column].symbol);
        } else {
          // just push in a blank space
          rowOfCheckers.push(' ');
        }
      }
      // join the rowOfCheckers array to a string, separated by a space
      string += rowOfCheckers.join(' ');
      // add a 'new line'
      string += "\n";
    }
    console.log(string);
  }

  //creating checkers
  createWhitePiece(){
    let whitePositions = [[0, 1], [0, 3], [0, 5], [0, 7],
    [1, 0], [1, 2], [1, 4], [1, 6],
    [2, 1], [2, 3], [2, 5], [2, 7]];
    let whiteChecker = new Checker("white");
    for(let i=0; i <whitePositions.length; i++){
      this.grid[whitePositions[i][0]][whitePositions[i][1]] = whiteChecker;
      this.checkers.push(whiteChecker);
    }
  }
  createBlackPiece(){
    let blackPositions = [[5, 0], [5, 2], [5, 4], [5, 6],
    [6, 1], [6, 3], [6, 5], [6, 7],
    [7, 0], [7, 2], [7, 4], [7, 6]];
    let blackChecker = new Checker("black");
    for(let i=0; i <blackPositions.length; i++){
      this.grid[blackPositions[i][0]][blackPositions[i][1]] = blackChecker;
      this.checkers.push(blackChecker);
    }
  }
  selectChecker(row, column){
    return this.grid[row][column];
  }
}

class Game {
  constructor() {
    this.board = new Board;
    this.turn = "white";
  }
  start() {
    this.board.createGrid();
    this.board.createWhitePiece();
    this.board.createBlackPiece();
  }
  moveChecker(whichPiece, toWhere){
    const whichPieceRow = parseInt(whichPiece[0]);
    const whichPieceCol = parseInt(whichPiece[1]);
    const wherePieceRow = parseInt(toWhere[0]);
    const wherePieceCol = parseInt(toWhere[1]);
    const checker = this.board.selectChecker(whichPieceRow,whichPieceCol);
    const validMoves = this.getValidMoves(whichPiece, this.turn);
    console.log(validMoves);
    const found = validMoves.find(element => element == toWhere);
    console.log(found);
    if (found) {
      this.board.grid[whichPieceRow][whichPieceCol] = null;
      this.board.grid[wherePieceRow][wherePieceCol] = checker;
    }
    //const validJumps = this.getValidJumps(whichPiece, turn);

    if (found) {
      console.log("[Game] Wrong move!");
      return;
    } else if (found && this.turn == "white") {
      // can't valid if checker is white or blac
      this.turn = "black";
      return;
    } else if (found && this.turn == "black") {
      // can't valid if checker is white or blac
      this.turn = "white";
      return;
    }

  }
  getValidMoves(whichPiece, turn) {
    // current piece position
    const whichPieceRow = parseInt(whichPiece[0]);
    const whichPieceCol = parseInt(whichPiece[1]);
    const validMoves = [];

    // move piece up left
    const moveUpLeftRow = whichPieceRow - 1;
    const moveUpLeftCol = whichPieceCol - 1;
    if (moveUpLeftRow >= 0 && moveUpLeftRow <= 8 && moveUpLeftCol >= 0 && moveUpLeftCol <= 8) {
      // check if move is inside the board
      if (this.board.grid[moveUpLeftRow][moveUpLeftCol] == null && turn == "white") {
        // check if move up position is empty
        const moveUpLeft = moveUpLeftRow.toString() + moveUpLeftCol.toString();
        validMoves.push(moveUpLeft);
      }
    }

    // move piece up right
    const moveUpRightRow = whichPieceRow - 1;
    const moveUpRightCol = whichPieceCol + 1;
    if (moveUpRightRow >= 0 && moveUpRightRow <= 8 && moveUpRightCol >= 0 && moveUpRightCol <= 8) {
      // check if move is inside the board
      if (this.board.grid[moveUpRightRow][moveUpRightCol] == null && turn == "white") {
        // check if move up position is empty
        const moveUpRight = moveUpRightRow.toString() + moveUpRightCol.toString();
        validMoves.push(moveUpRight);
      }
    }

    // move piece down left
    const moveDownLeftRow = whichPieceRow + 1;
    const moveDownLeftCol = whichPieceCol - 1;
    if (moveDownLeftRow >= 0 && moveDownLeftRow <= 8 && moveDownLeftCol >= 0 && moveDownLeftCol <= 8) {
      // check if move is inside the board
      if (this.board.grid[moveDownLeftRow][moveDownLeftCol] == null  && turn == "black") {
        // check if move up position is empty
        const moveDownLeft = moveDownLeftRow.toString() + moveDownLeftCol.toString();
        validMoves.push(moveDownLeft);
      }
    }

    // move piece down right
    const moveDownRightRow = whichPieceRow + 1;
    const moveDownRightCol = whichPieceCol + 1;
    if (moveDownRightRow >= 0 && moveDownRightRow <= 8 && moveDownRightCol >= 0 && moveDownRightCol <= 8) {
      // check if move is inside the board
      if (this.board.grid[moveDownRightRow][moveDownRightCol] == null  && turn == "black") {
        // check if move up position is empty
        const moveDownRight = moveDownRightRow.toString() + moveDownRightCol.toString();
        validMoves.push(moveDownRight);
      }
    }

    return validMoves;
  }
  getValidJumps(whichPiece, turn) {
    // current piece position
    const whichArr = Array.from(whichPiece.toString());
    const whichPieceRow = whichArr[0];
    const whichPieceCol = whichArr[1];
    const validJumps = [];

    // jump piece up left
    const jumpUpLeftR = whichPieceRow - 1;
    const jumpUpLeftC = whichPieceCol - 1;

    // jump piece up right
    const jumpUpRightR = whichPieceRow - 1;
    const jumpUpRightC = whichPieceCol + 1;

    // jump piece down left
    const jumpDownLeftR = whichPieceRow + 1;
    const jumpDownLeftC = whichPieceCol - 1;
   
    // jump piece down rigth
    const jumpDownRightR = whichPieceRow + 1;
    const jumpDownRightC = whichPieceCol + 1;

    if (turn == "up") {
      // fill array with possible values
    } else if (turn == "down") {
      // fill array with possible values
    }

    return validJumps;
  }
}

function getPrompt() {
  console.log("[Game] " + game.turn + " pieces turn!");
  game.board.viewGrid();
  rl.question('which piece?: ', (whichPiece) => {
    rl.question('to where?: ', (toWhere) => {
      game.moveChecker(whichPiece, toWhere);
      getPrompt();
    });
  });
}

const game = new Game();
game.start();


// Tests
if (typeof describe === 'function') {
  describe('Game', () => {
    it('should have a board', () => {
      assert.equal(game.board.constructor.name, 'Board');
    });
    it('board should have 24 checkers', () => {
      assert.equal(game.board.checkers.length, 24);
    });
  });

  describe('Game.moveChecker()', () => {
    it('should move a checker', () => {
      assert(!game.board.grid[4][1]);
      game.moveChecker('50', '41');
      assert(game.board.grid[4][1]);
      game.moveChecker('21', '30');
      assert(game.board.grid[3][0]);
      game.moveChecker('52', '43');
      assert(game.board.grid[4][3]);
    });
    it('should be able to jump over and kill another checker', () => {
      game.moveChecker('30', '52');
      assert(game.board.grid[5][2]);
      assert(!game.board.grid[4][1]);
      assert.equal(game.board.checkers.length, 23);
    });
  });
} else {
  getPrompt();
}