(function () {
  if (typeof Snakes === "undefined") {
    window.Snakes = {};
  }

  var Snake = Snakes.Snake = function () {
    this.dir = "N";
    this.segments = [new Coord(10, 10)];
  };

  Snake.DIRECTIONS = ["N", "E", "S", "W"];

  Snake.prototype.move = function () {
    var seg = new Coord(this.segments[0].row, this.segments[0].col);
    seg.plus(this.dir);
    this.segments.unshift(seg);
    this.segments.pop();
  }

  Snake.prototype.turn = function (dir) {
    this.dir = dir;
  }

  var Coord = Snakes.Coord = function (row, col){
    this.row = row;
    this.col = col;
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

  var Board = Snakes.Board = function () {
    var that = this;
    this.snake = new Snake;
  }

  Board.grid = function () {
    var grid = []

    for(var i = 0; i < 20; i++) {
      grid.push([]);
      for (var j = 0; j < 20; j++) {
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
