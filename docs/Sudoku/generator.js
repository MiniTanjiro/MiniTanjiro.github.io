const sudokuGrid = document.getElementById("sudoku-grid");
const generateButton = document.getElementById("generate");
const difficultySelect = document.getElementById("difficulty");

function isValidPlacement(grid, row, col, num) {
  for (let i = 0; i < 9; i++) {
    if (grid[row][i] === num) return false;
  }

  for (let i = 0; i < 9; i++) {
    if (grid[i][col] === num) return false;
  }

  const startRow = 3 * Math.floor(row / 3);
  const startCol = 3 * Math.floor(col / 3);
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (grid[startRow + i][startCol + j] === num) return false;
    }
  }

  return true;
}

function generateFullGrid() {
  const grid = Array.from({ length: 9 }, () => Array(9).fill(0));

  function fillGrid(grid) {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (grid[row][col] === 0) {
          const numbers = [...Array(9).keys()].map((n) => n + 1).sort(() => Math.random() - 0.5);
          for (let num of numbers) {
            if (isValidPlacement(grid, row, col, num)) {
              grid[row][col] = num;
              if (fillGrid(grid)) return true;
              grid[row][col] = 0;
            }
          }
          return false;
        }
      }
    }
    return true;
  }

  fillGrid(grid);
  console.log("Generated Full Grid:", grid);  // Vérification de la grille complète générée
  return grid;
}

function removeNumbers(grid, difficulty) {
  const attempts = difficulty * 10; 
  const puzzleGrid = grid.map((row) => [...row]);

  for (let attempt = 0; attempt < attempts; attempt++) {
    const row = Math.floor(Math.random() * 9);
    const col = Math.floor(Math.random() * 9);

    if (puzzleGrid[row][col] !== 0) {
      const backup = puzzleGrid[row][col];
      puzzleGrid[row][col] = 0;

      const gridCopy = puzzleGrid.map((row) => [...row]);
      if (!isSolvable(gridCopy)) {
        puzzleGrid[row][col] = backup; 
      }
    }
  }

  console.log("Puzzle Grid after removing numbers:", puzzleGrid);  // Vérification du puzzle généré
  return puzzleGrid;
}

function isSolvable(grid) {
  function findEmpty(grid) {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (grid[row][col] === 0) return [row, col];
      }
    }
    return null;
  }

  function solve(grid) {
    const emptySpot = findEmpty(grid);
    if (!emptySpot) return true;

    const [row, col] = emptySpot;
    for (let num = 1; num <= 9; num++) {
      if (isValidPlacement(grid, row, col, num)) {
        grid[row][col] = num;
        if (solve(grid)) return true;
        grid[row][col] = 0;
      }
    }
    return false;
  }

  return solve(grid);
}

function checkSudoku(grid) {
  for (let row = 0; row < 9; row++) {
    const rowValues = new Set();
    for (let col = 0; col < 9; col++) {
      const value = grid[row][col];
      if (value === 0 || rowValues.has(value)) {
        return false; 
      }
      rowValues.add(value);
    }
  }

  for (let col = 0; col < 9; col++) {
    const colValues = new Set();
    for (let row = 0; row < 9; row++) {
      const value = grid[row][col];
      if (value === 0 || colValues.has(value)) {
        return false; 
      }
      colValues.add(value);
    }
  }

  for (let startRow = 0; startRow < 9; startRow += 3) {
    for (let startCol = 0; startCol < 9; startCol += 3) {
      const boxValues = new Set();
      for (let row = startRow; row < startRow + 3; row++) {
        for (let col = startCol; col < startCol + 3; col++) {
          const value = grid[row][col];
          if (value === 0 || boxValues.has(value)) {
            return false; 
          }
          boxValues.add(value);
        }
      }
    }
  }

  return true; 
}

function handleInputChange(event, row, col, editableGrid) {
  console.log("Input Change Triggered");
  const value = parseInt(event.target.value, 10);

  if (isNaN(value) || value < 1 || value > 9) {
    event.target.value = "";
    editableGrid[row][col] = 0;
  } else {
    editableGrid[row][col] = value;
  }

  // Vérifie si le Sudoku est résolu et applique la classe "solved"
  if (checkSudoku(editableGrid)) {
    sudokuGrid.classList.add("solved");  // Applique la classe "solved"
    console.log("Résolu !");
  } else {
    sudokuGrid.classList.remove("solved");  // Enlève la classe "solved"
  }
}

function renderSudoku(grid, editableGrid) {
  console.log("Rendering Sudoku Grid...");
  console.log("Grid passed to renderSudoku:", grid);  // Vérification de la grille reçue

  sudokuGrid.innerHTML = ""; 

  grid.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      const div = document.createElement("div");
      div.classList.add("cell");
      div.setAttribute("data-row", rowIndex);
      div.setAttribute("data-col", colIndex);

      if (cell !== 0) {
        div.textContent = cell;
      } else {
        div.classList.add("empty");
        const input = document.createElement("input");
        input.type = "number";
        input.min = 1;
        input.max = 9;

        // Ajout de l'écouteur d'événement pour l'input
        input.addEventListener("input", (e) =>
          handleInputChange(e, rowIndex, colIndex, editableGrid)
        );

        div.appendChild(input);
      }

      sudokuGrid.appendChild(div);
    });
  });
}

generateButton.addEventListener("click", () => {
  const difficulty = parseInt(difficultySelect.value, 10);
  const fullGrid = generateFullGrid();
  console.log("Full Grid generated:", fullGrid);  // Vérification de la grille complète générée
  const puzzleGrid = removeNumbers(fullGrid, difficulty);
  console.log("Puzzle Grid after removing numbers:", puzzleGrid);  // Vérification du puzzle généré

  const editableGrid = puzzleGrid.map((row) => [...row]);
  console.log("Editable Grid:", editableGrid);  // Vérification de la grille éditable
  console.log("rendering sudoku grid...");
  renderSudoku(puzzleGrid, editableGrid);
});
