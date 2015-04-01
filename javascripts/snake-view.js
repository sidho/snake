(function () {
  if (typeof Snakes === "undefined") {
    window.Snakes = {};
  }

  var View = Snakes.View = function ($el) {
    this.$el = $el;
    this.die = new Audio('../sounds/die.wav');

    // setup game speed and point multiplier
    if ($("#easy").prop("checked")) {
      this.intervalSpeed = 200;
      this.multiplier = 1;
    } else if ($("#hard").prop("checked")) {
      this.intervalSpeed = 105;
      this.multiplier = 2;
    } else {
      this.intervalSpeed = 60;
      this.multiplier = 3.5;
    }

    $('.highscore-message').removeClass('show-text');
    $('.game-over').removeClass('show-text');
    this.board = new Snakes.Board(20, this.multiplier);
    $('.instructions').addClass("hidden");
    $('.start-button').text("Restart Game");
    $('.start-button').attr("disabled", true);
    this.setupGrid();
    this.bindKeys();
    var that = this;
    this.intervalId = window.setInterval(function () { that.step(); }, that.intervalSpeed);
  };

  View.prototype.bindKeys = function () {
    var that = this;
    $(window).on('keydown', function(event){
      that.handleKeyEvent(event);
    });
  };

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
  };

  View.prototype.renderHTML = function () {
    this.updateClasses(this.board.snake.segments, "snake");
    this.updateClasses([this.board.apple.position], "apple");
  };

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
  };

  View.prototype.step = function () {
    if (this.board.snake.segments.length === 0) {
      this.die.play();
      if (parseInt($('.high-score').text()) < this.board.score) {
        $('.high-score').text(this.board.score);
        $('.game-over').addClass('show-text');
        $('.highscore-message').addClass('show-text');
      } else {
        $('.game-over').addClass('show-text');
      }
      $('.start-button').removeAttr("disabled");
      window.clearInterval(this.intervalId);
    } else {
      $('.score').text(this.board.score);
      this.board.snake.move();
      this.renderHTML();
    }
  };

  View.prototype.updateClasses = function(coordinates, className) {
    this.$li.filter("." + className).removeClass();
    coordinates.forEach(function(coordinate){
      var flatCoordinate = (coordinate.row * this.board.dimensions) + coordinate.col;
      this.$li.eq(flatCoordinate).addClass(className);
    }.bind(this));
  };
})();
