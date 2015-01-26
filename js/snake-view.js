(function () {
  if (typeof Snakes === "undefined") {
    window.Snakes = {};
  }

  var View = Snakes.View = function ($el) {
    this.$el = $el;
    this.board = new Snakes.Board;
    // this.render();
    this.bindKeys();
    var that = this;
    setInterval(function () { that.step(); }, 500);
  };

  View.prototype.step = function () {
    this.board.snake.move();
    var ascii = this.board.render();
    this.$el.html("<pre>" + ascii + "</pre>");
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
      case '38':
        this.board.snake.turn("N");
        break;
      case '37':
        this.board.snake.turn("W");
        break;
      case '40':
        this.board.snake.turn("S");
        break;
      case '39':
        this.board.snake.turn("E");
        break;
    }
  }

})();
