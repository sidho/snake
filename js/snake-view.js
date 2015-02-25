(function () {
  if (typeof Snakes === "undefined") {
    window.Snakes = {};
  }

  var View = Snakes.View = function ($el) {
    this.$el = $el;
    this.board = new Snakes.Board(20);
    this.setupGrid();
    this.bindKeys();
    var that = this;
    this.intervalId = window.setInterval(function () { that.step(); }, 200);
  };

  View.prototype.step = function () {
    if (this.board.snake.segments.length === 0) {
      debugger;
      $('.game-over').text("Game over!");
      window.clearInterval(this.intervalId);
    } else {
      this.board.snake.move();
      this.renderHTML();
    }
    // ASCII rendeirng
    // var ascii = this.board.render
    // this.$el.html("<pre>" + ascii + "</pre>");
  }

  View.prototype.renderHTML = function () {
    this.updateClasses(this.board.snake.segments, "snake");
    this.updateClasses([this.board.apple.position], "apple");
  }

  View.prototype.updateClasses = function(coordinates, className) {
    this.$li.filter("." + className).removeClass();
    coordinates.forEach(function(coordinate){
      var flatCoordinate = (coordinate.row * this.board.dimensions) + coordinate.col;
      this.$li.eq(flatCoordinate).addClass(className);
    }.bind(this));
  }

  View.prototype.setupGrid = function () {
    var grid = "";

    for (var i = 0; i < this.board.dimensions; i++) {
      grid += "<ul>";
      for (var j = 0; j < this.board.dimensions; j++) {
        grid += "<li></li>";
      }

      grid += "</ul>";
    }

    this.$el.html(grid);
    this.$li = this.$el.find('li');
  }

  View.prototype.bindKeys = function () {
    var that = this;
    $(window).on('keydown', function(event){
      that.handleKeyEvent(event);
    });
  }

  View.prototype.handleKeyEvent = function (event) {
    switch (event.keyCode) {
      case 38:
        this.board.snake.turn("N");
        break;
      case 37:
        this.board.snake.turn("W");
        break;
      case 40:
        this.board.snake.turn("S");
        break;
      case 39:
        this.board.snake.turn("E");
        break;
      default:
        break;
    }
  }

})();
