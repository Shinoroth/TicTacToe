'use strict';
// Initialize the game board
const gameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ];
  
  // Initialize the current player
  let currentPlayer = 'X';
  
  // Get references to the table cells and the start and reset buttons
  const cells = document.querySelectorAll('td');
  const startButton = document.querySelector('.start');
  const resetButton = document.querySelector('.reset');
  const showTurnText = document.querySelector('.showTurnText');
  const showTurnText2 = document.querySelector('.showTurnText2');
  const displayTurn = document.querySelector('.displayTurn');
  const circleFollowingCursor = document.querySelector('.circle');
  displayTurn.textContent = `${currentPlayer}`;
  displayTurn.style.color = "#00a2cf";
  
  // Add event listeners to the table cells
  cells.forEach((cell, index) => {
    cell.addEventListener('click', () => {
      // Calculate the row and column indexes from the cell index
      const row = Math.floor(index / 3);
      const col = index % 3;
  
      // Only make a move if the cell is empty
      if (gameBoard[row][col] === null) {
        // Update the game board and the HTML table
        gameBoard[row][col] = currentPlayer;
        cell.textContent = currentPlayer;

        if(currentPlayer === 'X') { 
            cell.style.color = "#00a2cf";
            displayTurn.style.color = "#00ba63"; 
        }
        if(currentPlayer === 'O') { 
            cell.style.color = "#00ba63"; 
            displayTurn.style.color = "#00a2cf"; 
        }
  
        // Check for a win or a draw
        const result = checkForWin();
        if (result === 'X' || result === 'O') {
            if(currentPlayer === 'X') displayTurn.style.color = "#00a2cf"; 
            if(currentPlayer === 'O') displayTurn.style.color = "#00ba63"; 

            showTurnText.textContent = 'Player ';
            showTurnText2.textContent = ' wins!';
            currentPlayer = '';
        } 
        else if (result === 'draw') {
            showTurnText.textContent = `It's a draw!`;
            showTurnText2.textContent = '';
            displayTurn.textContent = '';
        } else {
          // Switch players
          currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
          displayTurn.textContent = `${currentPlayer}`;
        }
      }
    });
  });
  
  // Add event listeners to the start and reset buttons
  startButton.addEventListener('click', startGame);
  resetButton.addEventListener('click', resetGame);

  // Start a new game
function startGame() {
    // Set text elements to their starting position
    showTurnText.textContent =`Player `;
    displayTurn.textContent = 'X';
    showTurnText2.textContent =`'s turn`;
    displayTurn.style.color = "#00a2cf"; 
    // Reset the game board and the HTML table
    gameBoard.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        gameBoard[rowIndex][colIndex] = null;
        cells[rowIndex * 3 + colIndex].textContent = '';
      });
    });
  
    // Reset the current player
    currentPlayer = 'X';
  }
  
  // Reset the current game
  function resetGame() {
    startGame();
  }
  
  // Check for a win or a draw
  function checkForWin() {
    // Check rows
    for (let row = 0; row < 3; row++) {
      if (gameBoard[row][0] !== null && gameBoard[row][0] === gameBoard[row][1] && gameBoard[row][1] === gameBoard[row][2]) {
        return gameBoard[row][0];
      }
    }
  
    // Check columns
    for (let col = 0; col < 3; col++) {
      if (gameBoard[0][col] !== null && gameBoard[0][col] === gameBoard[1][col] && gameBoard[1][col] === gameBoard[2][col]) {
        return gameBoard[0][col];
      }
    }
  
    // Check diagonals
    if (gameBoard[0][0] !== null && gameBoard[0][0] === gameBoard[1][1] && gameBoard[1][1] === gameBoard[2][2]) {
      return gameBoard[0][0];
    }
    if (gameBoard[0][2] !== null && gameBoard[0][2] === gameBoard[1][1] && gameBoard[1][1] === gameBoard[2][0]) {
      return gameBoard[0][2];
    }
  
    // Check for a draw
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        if (gameBoard[row][col] === null) {
          return null;
        }
      }
    }
    return 'draw';
  }