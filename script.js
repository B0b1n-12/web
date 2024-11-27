const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('reset');

let currentPlayer = 'X';
let board = Array(9).fill(null);

// Přepnutí hráče
function switchPlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

// Kontrola vítězství
function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Řádky
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Sloupce
        [0, 4, 8], [2, 4, 6]            // Diagonály
    ];

    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a]; // Vítězný hráč
        }
    }

    return null;
}

// Obsluha kliknutí na políčko
function handleClick(e) {
    const cell = e.target;
    const index = cell.getAttribute('data-index');

    if (board[index] || checkWinner()) {
        return; // Políčko je již obsazeno nebo hra skončila
    }

    board[index] = currentPlayer;
    cell.textContent = currentPlayer;

    const winner = checkWinner();
    if (winner) {
        setTimeout(() => alert(`Hráč ${winner} vyhrál!`), 100);
    } else if (!board.includes(null)) {
        setTimeout(() => alert('Remíza!'), 100);
    } else {
        switchPlayer();
    }
}

// Restartování hry
function resetGame() {
    board.fill(null);
    cells.forEach(cell => (cell.textContent = ''));
    currentPlayer = 'X';
}

// Přidání posluchačů událostí
cells.forEach(cell => cell.addEventListener('click', handleClick));
resetButton.addEventListener('click', resetGame);
