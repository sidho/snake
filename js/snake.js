(function () {
  if (typeof Snakes === "undefined") {
    window.Snakes = {};
  }

  var Apple = Snakes.Apple = function (board) {
    this.board = board;
    this.newPosition();
  };

  Apple.prototype.newPosition = function () {
    var x = this.generateCoordinate();
    var y = this.generateCoordinate();

    if (this.board.snake.isOccupying([x, y])) {
      this.newPosition();
    } else {
      this.position = new Coord(x, y);
    }
  };

  Apple.prototype.generateCoordinate = function () {
    var coordinate = Math.floor(Math.random() * this.board.dimensions);
    return coordinate;
  };

  var Snake = Snakes.Snake = function (board) {
    this.dir = "N";
    this.board = board;
    this.segments = [new Coord(
      this.board.dimensions / 2, this.board.dimensions / 2
      )];
    this.growFrames = 4;
    this.turning = false;
  };

  Snake.DIRECTIONS = ["N", "E", "S", "W"];

  Snake.prototype.checkIfEating = function () {
    if (this.head().equals(this.board.apple.position)) {
      this.growFrames += 3;
      return true;
    } else {
      return false;
    }
  };

  Snake.prototype.head = function () {
    return this.segments[this.segments.length - 1];
  };

  Snake.prototype.isOccupying = function (coord) {
    var occupying = false;
    this.segments.forEach(function(segment){
      if (segment.row === coord[0] && segment.col === coord[1]) {
        occupying = true;
        return occupying;
      }
    });

    return occupying;
  };

  Snake.prototype.isValidMove = function () {
    var head = this.head();

    if (!this.board.isValid(this.head())) {
      return false;
    }

    for (var i = 0; i < this.segments.length - 1; i++) {
      if (this.segments[i].equals(head)) {
        return false;
      }
    }

    return true;
  };

  Snake.prototype.move = function () {
    var head = this.head()
    var newSeg = new Coord(head.row, head.col);
    newSeg.plus(this.dir);
    this.segments.push(newSeg);
    this.turning = false;

    if (this.checkIfEating()) {
      this.board.score += 10;
      this.board.apple.newPosition();
    }

    if (this.growFrames === 0) {
      this.segments.shift();
    } else {
      this.growFrames--;
    }

    if (!this.isValidMove()) {
      this.segments = [];
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
    this.snake = new Snake(this);
    this.apple = new Apple(this);
    this.score = 0;
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

  Board.prototype.isValid = function (coord) {
    return (coord.row >= 0) && (coord.row < this.dimensions) &&
      (coord.col >= 0) && (coord.col < this.dimensions);
  };

  Board.prototype.render = function () {
    //ASCII rendering
    var gameBoard = Board.grid();

    this.snake.segments.forEach( function(coord) {
      gameBoard[coord.row][coord.col] = "S";
    });

    return gameBoard.map(function (row) {
      return row.join("");
    }).join("\n");
  };
})();
