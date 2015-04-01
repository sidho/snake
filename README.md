# Snake

This is a game was built using HTML, Javascript, jQuery, and CSS.

[Check it out.][snake]
[snake]: https://sidho.github.io/snake/html/index.html

### How to Play
Choose a difficulty and press start game when ready! Use the arrow keys to move.
Eat the apple for points, and avoid hitting the walls or your own tail.

### How the game works
The game logic is based on a grid. Each coordinate can either be empty, occupied
by an apple, or occupied by a snake segment. The snake is made up of several
segments, the most important being the head. As the game progresses, the game
checks where the head segment is. If the head's position overlaps an apple, it
counts as the snake "ate" the apple. The game adds more segments to the snake,
and randomly places a new apple. If the head's position overlaps with a snake
segment, or goes past the boundaries of the grid, the game is over.

The game is displayed on a grid of list items, and the background color changes
to indicate whether the coordinate is empty, occupied by an apple, or occupied
by a snake segment. The game difficulty determines the speed of the
window.setInterval, which moves the game one step per interval. As the snake
moves, occupied grid coordinates changes color to show movement.

### Other Info
[bfxr](www.bfxr.net/) was used to make the sweet sweet 8-bit sounds.
Google fonts provides the retro font, Press Start 2P.

Thanks for checking this out! If you'd like to see more of my work, or you'd like
to get in touch, [come check out my homepage.](http://sidho.me)

<p align="center">
  <a href="http://sidho.me"><img src="http://sidho.me/images/icons/apple-touch-icon-60x60.png"/></a>
</p>
