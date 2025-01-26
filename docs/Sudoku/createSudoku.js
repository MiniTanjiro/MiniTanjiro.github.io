const createButton = document.getElementById("create");
const finishButton = document.createElement("button");
finishButton.id = "finish";
finishButton.textContent = "Terminer";
finishButton.style.display = "none";    
document.querySelector(".container").appendChild(finishButton);

function createEmptyGrid() {
  const emptyGrid = Array.from({ length: 9 }, () => Array(9).fill(0)); 
  const editableGrid = emptyGrid.map(row => [...row]); 

  renderSudoku(emptyGrid, editableGrid); 
  finishButton.style.display = "block";
}

createButton.addEventListener("click", () => {
  createEmptyGrid();
});

function isSudokuValid(grid) {
  for (let i = 0; i < 9; i++) {
    const row = new Set();
    const col = new Set();
    const box = new Set();
    for (let j = 0; j < 9; j++) {
      const rowVal = grid[i][j];
      const colVal = grid[j][i];
      const boxVal = grid[3 * Math.floor(i / 3) + Math.floor(j / 3)][3 * (i % 3) + (j % 3)];

      if (rowVal && row.has(rowVal)) return false;
      if (colVal && col.has(colVal)) return false;
      if (boxVal && box.has(boxVal)) return false;

      if (rowVal) row.add(rowVal);
      if (colVal) col.add(colVal);
      if (boxVal) box.add(boxVal);
    }
  }
  return true;
}

finishButton.addEventListener("click", () => {
  const currentGrid = Array.from(document.querySelectorAll(".cell")).map(cell => {
    const input = cell.querySelector("input");
    return input ? parseInt(input.value, 10) || 0 : parseInt(cell.textContent, 10) || 0;
  });

  const formattedGrid = [];
  while (currentGrid.length) formattedGrid.push(currentGrid.splice(0, 9));

  if (!isSudokuValid(formattedGrid)) {
    alert("Le Sudoku n'est pas valide. Corrigez-le avant de continuer.");
    return;
  }

  renderSudoku(formattedGrid, formattedGrid.map(row => [...row])); 
  finishButton.style.display = "none"; 
});

function renderSudoku(grid, editableGrid) {
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

        input.addEventListener("input", (e) => {
          const value = parseInt(e.target.value, 10);
          if (isNaN(value) || value < 1 || value > 9) {
            e.target.value = "";
            editableGrid[rowIndex][colIndex] = 0;
          } else {
            editableGrid[rowIndex][colIndex] = value;
          }
        });

        div.appendChild(input);
      }

      sudokuGrid.appendChild(div);
    });
  });
}
