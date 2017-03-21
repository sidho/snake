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

### Utilizing localStorage
This game uses HTML5's localStorage to save high scores locally. It checks for
localStorage compatibility using a technique found [here.](http://diveintohtml5.info/detect.html#storage) If the browser
does not support localStorage, the game does not persist the high
scores and simply changes the screen text.


### Legal

Copyright 2017 Sid Ho

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

### Other Info
[bfxr](www.bfxr.net/) was used to make the sweet sweet 8-bit sounds.
Google fonts provides the retro font, Press Start 2P.

Thanks for checking this out! If you'd like to see more of my work, or you'd like
to get in touch, [come check out my homepage.](http://sidho.me)

<p align="center">
  <a href="http://sidho.me"><img src="http://sidho.me/images/icons/apple-touch-icon-60x60.png"/></a>
</p>
