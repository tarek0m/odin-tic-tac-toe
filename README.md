# Tic Tac Toe

This is a simple Tic Tac Toe game implemented in JavaScript as part of [The Odin Project](https://www.theodinproject.com/lessons/node-path-javascript-tic-tac-toe) assignment. The game is played in the console and is designed for two players.

## How to Play

1. Clone the repository to your local machine.
2. Open the `index.html` file in your browser.
3. Open the browser console (usually by pressing `F12` or `Ctrl+Shift+I`).
4. Follow the instructions displayed in the browser to play the game.

Or you can play the game live [here](https://tarek0m.github.io/odin-tic-tac-toe/).

## Instructions

- The game board is a 3x3 grid, and each cell is numbered from 0 to 8 as shown below:

  ```
   0 | 1 | 2
  ---+---+---
   3 | 4 | 5
  ---+---+---
   6 | 7 | 8
  ```

- To place a mark, use the `game.playRound(n)` function, where `n` is the number of the cell you want to mark.
- Player 1 uses 'X' and Player 2 uses 'O'.
- The game will automatically check for a winner after each move.

## Example

To start a game, open the console and type:

```javascript
game.playRound(0); // Player 1 places 'X' in cell 0
game.playRound(4); // Player 2 places 'O' in cell 4
game.playRound(1); // Player 1 places 'X' in cell 1
game.playRound(5); // Player 2 places 'O' in cell 5
game.playRound(2); // Player 1 places 'X' in cell 2 and wins
```

## Features

- Simple and intuitive console-based gameplay.
- Automatically checks for winning combinations.
- Displays the current state of the board after each move.

## Screenshot

![Tic Tac Toe Screenshot](./Screenshot.png)

## Author

- [tarek0m](https://github.com/tarek0m)

Enjoy playing Tic Tac Toe!

## GUI
For GUI version of the game, please switch to [gui-version](https://github.com/tarek0m/odin-tic-tac-toe/tree/gui-version) branch
