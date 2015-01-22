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
    this.grid = new Array(20);
    for(var i = 0; i < this.grid.length; i++) {
      this.grid[i] = [];
      for (var j = 0; j < 20; j++) {
        this.grid[i][j] = '.';
      }
    }

    this.snake.segments.forEach(function(coord){
      that.grid[coord.row][coord.col] = 'S';
    });
  }

  Board.prototype.render = function () {
    var that = this;

    this.snake.segments.forEach(function(coord){
      that.grid[coord.row][coord.col] = 'S';
    });

    var largeString = [];
    for (var i = 0; i < this.grid.length; i++) {
      var row = "";
      for(var j = 0; j < this.grid[i].length; j++){
        row += this.grid[i][j];
      }
      largeString[i] = row;
    }

    return largeString;
  };
})();
