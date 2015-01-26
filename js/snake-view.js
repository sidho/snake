(function () {
  if (typeof Snakes === "undefined") {
    window.Snakes = {};
  }

  var View = Snakes.View = function ($el) {
    this.$el = $el;
    this.board = new Snakes.Board(20);
    // this.render();
    this.bindKeys();
    var that = this;
    setInterval(function () { that.step(); }, 500);
  };

  View.prototype.step = function () {
    this.board.snake.move();
    var ascii = this.board.render
    this.renderHTML();
    // this.$el.html("<pre>" + ascii + "</pre>");
  }

  View.prototype.renderHTML = function () {
    var grid = "";

    for (var i = 0; i < this.board.dimensions; i++) {
      grid += "<ul>";
      for (var j = 0; j < this.board.dimensions; j++) {
        this.board.snake.segments.forEach(function(coord) {
          if (coord.row === i && coord.col === j) {
            grid += "<li class=snake></li>";
          } else {
            grid += "<li></li>";
          }
        });
      }
      grid += "</ul>";
    }
    this.$el.html(grid);
  }

  View.prototype.bindKeys = function () {
    var that = this;
    $(window).on('keydown', function(event){
      that.handleKeyEvent(event);
    });
  }

  View.prototype.handleKeyEvent = function (event) {
    console.log(event.keyCode);
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
    }
  }

})();
