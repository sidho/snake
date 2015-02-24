(function () {
  if (typeof Snakes === "undefined") {
    window.Snakes = {};
  }

  var Snake = Snakes.Snake = function () {
    this.dir = "N";
    this.segments = [new Coord(10, 10)];
    this.growFrames = 2;
    this.turning = false;
  };

  Snake.DIRECTIONS = ["N", "E", "S", "W"];

  Snake.prototype.head = function () {
    return this.segments[this.segments.length - 1];
  };

  Snake.prototype.move = function () {
    var head = this.head()
    var newSeg = new Coord(head.row, head.col);
    newSeg.plus(this.dir);
    this.segments.push(newSeg);

    this.turning = false;

    if (this.growFrames === 0) {
      this.segments.shift();
    } else {
      this.growFrames--;
    }
  };

  Snake.prototype.potentialMove = function (dir) {
    var moveAttempt = new Coord(0,0);
    moveAttempt.plus(dir);
    return moveAttempt;
  };

  Snake.prototype.turn = function (dir) {
    var moveAttempt = this.potentialMove(dir);
    var currentMove = this.potentialMove(this.dir);
    if (moveAttempt.isOpposite(currentMove) || this.turning) {
      return;
    } else {
      this.turning = true;
      this.dir = dir;
    }
  };

  var Coord = Snakes.Coord = function (row, col){
    this.row = row;
    this.col = col;
  };

  Coord.prototype.equals = function (otherCoord) {
    return (this.row == otherCoord.row) && (this.col == otherCoord.col);
  };

  Coord.prototype.isOpposite = function (otherCoord) {
    return (this.row == (-1 * otherCoord.row)) && (this.col == (-1 * otherCoord.col));
  };

  Coord.prototype.plus = function (dir) {
    switch (dir) {
      case "N":
        this.row -= 1;
        break;
      case "E":
        this.col += 1;
        break;
      case "S":
        this.row += 1;
        break;
      case "W":
        this.col -= 1;
        break;
    }
  };

  var Board = Snakes.Board = function (dimensions) {
    this.dimensions = dimensions;
    this.snake = new Snake;
  }

  Board.grid = function () {
    var grid = []

    for(var i = 0; i < this.dimensions; i++) {
      grid.push([]);
      for (var j = 0; j < this.dimensions; j++) {
        grid[i][j] = '.';
      }
    }

    return grid;
  }

  Board.prototype.render = function () {
    var gameBoard = Board.grid();

    this.snake.segments.forEach( function(coord) {
      gameBoard[coord.row][coord.col] = "S";
    });

    return gameBoard.map(function (row) {
      return row.join("");
    }).join("\n");
  };
})();
