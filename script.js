// Global variables in module pattern
const Calculations = (() => {
  const cellMap = {
    0: [0, 0],
    1: [0, 1],
    2: [0, 2],
    3: [1, 0],
    4: [1, 1],
    5: [1, 2],
    6: [2, 0],
    7: [2, 1],
    8: [2, 2],
  };
  const winningCombinations = [
    // Horizontal
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // Vertical
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // Diagonal
    [0, 4, 8],
    [2, 4, 6],
  ];
  const isSubset = (arr1, arr2) =>
    arr2.every((element) => arr1.includes(element));

  return { cellMap, winningCombinations, isSubset };
})();

// Create board object as a playground
function GameBoard() {
  const rows = 3;
  const columns = 3;
  let board = [];

  // Initialize the board
  for (let row = 0; row < rows; row++) {
    board[row] = [];
    for (let column = 0; column < columns; column++) {
      board[row].push(Cell(row * 3 + column)); // Initialize with order of cell
    }
  }

  const getBoard = () => board;

  const getCellValue = (row, column) => board[row][column].getValue();

  const getCellOrder = (row, column) => board[row][column].getOrder();

  const placeMark = (row, column, mark) => {
    if (getCellValue(row, column) == ' ') {
      board[row][column].addMark(mark);
      return true;
    } else {
      return false;
    }
  };

  const printBoard = () => {
    const boardWithCellValues = board.map((row) =>
      row.map((cell) => {
        if (cell.getValue() == 'X') {
          return 'X';
        } else if (cell.getValue() == 'O') {
          return 'O';
        } else {
          return cell.getOrder();
        }
      })
    );
    console.log(
      '%cCurrent Board:',
      'color: #00bcd4; font-size: 16px; font-weight: bold;'
    );
    boardWithCellValues.forEach((row, rowIndex) => {
      const rowString = row.map((cell) => `%c ${cell} `).join('%c|');
      const rowStyles = row.flatMap((cell) => [
        cell === 'X' || cell === 'O'
          ? 'color: #f1f1f1; font-size: 28px; font-weight: bold;'
          : 'color: #1f1f1f; font-size: 28px; font-weight: bold;',
        'color: #000000; font-size: 28px; font-weight: bold;',
      ]);
      console.log(rowString, ...rowStyles.slice(0, -1));
      if (rowIndex < boardWithCellValues.length - 1) {
        console.log(
          '%c---+---+---',
          'color: #000000; font-size: 28px; font-weight: bold;'
        );
      }
    });
  };

  return {
    getBoard,
    getCellOrder,
    placeMark,
    printBoard,
  };
}

// Create cell object
function Cell(orderValue) {
  let value = ' ';
  const order = orderValue;

  const getValue = () => value;

  const getOrder = () => order;

  const addMark = (mark) => {
    value = mark;
  };

  return {
    getValue,
    getOrder,
    addMark,
  };
}

// Create game controller object
function GameController(
  playerOneName = 'Player 1',
  playerTwoName = 'Player 2'
) {
  const board = GameBoard();

  const players = [
    {
      name: playerOneName,
      mark: 'X',
      places: [],
    },
    {
      name: playerTwoName,
      mark: 'O',
      places: [],
    },
  ];

  let activePlayer = players[0];

  const addPlace = (place) => {
    activePlayer.places.push(place);
    activePlayer.places.sort();
  };

  const getActivePlayer = () => activePlayer;

  const switchActivePlayer = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };

  const printNewBoard = () => {
    console.log(
      `%c${getActivePlayer().name}'s turn.`,
      'color: #ff9800; font-size: 18px; font-weight: bold;'
    );
    board.printBoard();
  };

  const checkWinner = () => {
    return Calculations.winningCombinations.filter((combination) =>
      Calculations.isSubset(getActivePlayer().places, combination)
    ).length > 0
      ? true
      : false;
  };

  const resetGame = (winner) => {
    players.forEach((player) => (player.places = []));
    board.getBoard().forEach((row) => row.forEach((cell) => cell.addMark(' ')));
    // Inform the user to press Enter to start a new game
    console.log(
      '%cTime to start a new game!',
      'color: #9e9e9e; font-size: 16px;'
    );

    console.log('%c-------------------', 'color: #9e9e9e; font-size: 16px;');
    console.log(
      '%cNew Game!',
      'color: #4caf50; font-size: 20px; font-weight: bold;'
    );
    printNewBoard();
  };

  const playRound = (cellOrder) => {
    const [row, column] = Calculations.cellMap[cellOrder];

    if (board.placeMark(row, column, getActivePlayer().mark)) {
      addPlace(board.getCellOrder(row, column));
      if (checkWinner()) {
        board.printBoard();
        console.log(
          `%c${getActivePlayer().name} wins!`,
          'color: #4caf50; font-size: 20px; font-weight: bold;'
        );
        resetGame(getActivePlayer());
        return;
      } else {
        switchActivePlayer();
        printNewBoard();
      }
    } else {
      console.log(
        '%cInvalid Move!',
        'color: #f44336; font-size: 16px; font-weight: bold;'
      );
    }
  };

  printNewBoard();
  return { playRound };
}

const game = GameController();
