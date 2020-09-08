const container = document.querySelector('.container');
const resetButton = document.querySelector('.reset');
const sizeButton = document.querySelector('#change-size');
const dropdown = document.querySelector('.change-color select');
const START_GRID_SIZE = 33;
const alphaIncrease = 0.1;
let useColor = false;
let grid;

function createGrid(size) {
    container.style.gridTemplateColumns = `repeat(${size}, auto)`;
    container.style.gridTemplateRows = `repeat(${size}, auto)`;
    for (let i = 0; i < size ** 2; i++) {
        const div = document.createElement('div');
        div.classList.add('grid');
        div.addEventListener('mouseover', draw);
        container.appendChild(div);
    }
    grid = document.querySelectorAll('.grid');
}

function generateRandomColor() {
    let randomColor = Math.floor(Math.random() * 16777215).toString(16);
    return randomColor;
}

function draw(e) {
    if (useColor) {
        e.target.style.backgroundColor = '#' + generateRandomColor();
    } else {
        let current = e.target.style.backgroundColor; // get the RGBA value for teh block
        current = Number(current.slice(14, 17)) // get the alpha value from 'rgba(0, 0, 0, 0.1)
        current === 0 ? newAlpha = alphaIncrease : newAlpha = Math.min(1, (current + alphaIncrease));
        // if the block is white then use the alphaincrease, else use the smalles of the two in min function
        if (newAlpha === 1) return;
        e.target.style.backgroundColor = `rgba(0, 0, 0, ${newAlpha})`;
    }
}
// reset the grid
function reset() {
    grid.forEach(g => g.style.backgroundColor = '');
}

createGrid(START_GRID_SIZE);
grid = document.querySelectorAll('.grid');

resetButton.addEventListener('click', reset);
sizeButton.addEventListener('click', () => {
    let newGridSize = prompt("New size?");
    grid.forEach(g => g.remove());
    createGrid(newGridSize);
});

dropdown.addEventListener('change', (e) => {
    reset();
    if (e.target.value === "black") {
        useColor = false;
    } else useColor = true;
})

document.querySelectorAll('button').forEach(b => {
    b.addEventListener('click', () => {
        grid = document.querySelectorAll('.grid');
    })
})