function isValidPlacement(grid, row, col, num) {
    for (let i = 0; i < 9; i++) {
        if (grid[row][i] === num || grid[i][col] === num) return false;
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

function findEmpty(grid) {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (grid[row][col] === 0) return [row, col];
        }
    }
    return null;
}

function solveSudoku(grid, updateUI) {
    const emptySpot = findEmpty(grid);
    if (!emptySpot) return true;

    const [row, col] = emptySpot;
    for (let num = 1; num <= 9; num++) {
        if (isValidPlacement(grid, row, col, num)) {
            grid[row][col] = num;

            updateUI(grid); // Update the UI after placing the number

            if (solveSudoku(grid, updateUI)) return true;

            grid[row][col] = 0;

            updateUI(grid); // Revert and update the UI again
        }
    }
    return false; 
}

function updateUI(grid) {
    document.querySelectorAll('.cell').forEach(cell => {
        const row = parseInt(cell.getAttribute('data-row'));
        const col = parseInt(cell.getAttribute('data-col'));
        const input = cell.querySelector('input');

        // Mettre à jour la grille et désactiver l'input si nécessaire
        if (grid[row][col] !== 0) {
            if (input) {
                input.value = grid[row][col];
                input.disabled = true; // Désactiver l'input pour les cases remplies
            } else {
                cell.textContent = grid[row][col];
            }

            // Vérifier si la case est correcte et la colorier en vert
            if (isValidPlacement(grid, row, col, grid[row][col])) {
                cell.classList.add('correct'); // Ajouter la classe "correct" si la case est correcte
            } else {
                cell.classList.remove('correct'); // Enlever la classe "correct" si la case est incorrecte
            }
        }
    });
}

document.getElementById("solve").addEventListener("click", () => {
    const grid = [];
    document.querySelectorAll('.cell').forEach(cell => {
        const row = parseInt(cell.getAttribute('data-row'));
        const col = parseInt(cell.getAttribute('data-col'));
        const input = cell.querySelector('input');

        grid[row] = grid[row] || [];
        grid[row][col] = input ? (input.value ? parseInt(input.value) : 0) : parseInt(cell.textContent) || 0;
    });

    solveSudoku(grid, updateUI);
});
