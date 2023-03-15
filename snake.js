let score = 0;
const size = 22;
const speed = 165;
let snake = [{i: 1, j: 1}, {i: 1, j: 2}, {i: 1, j: 3}];
let sankeLine = 1, snakeColumn = 3;
let lineDirection = 0, columnDirection = 0;
const grid = document.getElementById("grid");
let start = false;

generateBoard();
generateFood();
document.addEventListener("keyup", moveSnake);
document.addEventListener("keyup", startGame);
function startGame () {
    if (start === false) {
        setInterval(updateSnake, speed);
        start = true;
    }
}
function generateBoard() {
    grid.innerHTML = "";
    document.getElementById("score").innerHTML = "0";
    let cell = 0;
    for (let i = 0; i < size; ++i) {
        let line = grid.insertRow(i);
        for (let j = 0; j < size; ++j) {
            let element = line.insertCell(j);
            if (cell % 2 !== 0) {
                element.style.background = "rgba(27,122,218,0.66)";
            }
            ++cell;
            if (i === 0) {
                grid.rows[i].cells[j].innerHTML = "🟧";
                element.style.background = "rgb(253,103,35)";
            }
            if (i === size - 1) {
                grid.rows[i].cells[j].innerHTML = "🟧";
                element.style.background = "rgb(253,103,35)";
            }
            if (j === 0) {
                grid.rows[i].cells[j].innerHTML = "🟧";
                element.style.background = "rgb(253,103,35)";
            }
            if (j === size - 1) {
                grid.rows[i].cells[j].innerHTML = "🟧";
                element.style.background = "rgb(253,103,35)";
            }
        }
    }
    for (let i = 1; i < 4; ++i) {
        grid.rows[1].cells[i].classList.add("snake");
    }
    generateLoseCell();
    generateFood();

}

function moveSnake(buttonPressed) {
    if(buttonPressed.keyCode === 37) {
        lineDirection = 0;
        columnDirection = -1;
    } else if (buttonPressed.keyCode === 38) {
        lineDirection = -1;
        columnDirection = 0;
    } else if (buttonPressed.keyCode === 39) {
        lineDirection = 0;
        columnDirection = 1;
    } else if (buttonPressed.keyCode === 40) {
        lineDirection = 1;
        columnDirection = 0;
    }
}

function generateFood() {
    let randomLine = Math.floor(Math.random() * ((size - 1) - 1) + 1);
    let randomColumn = Math.floor(Math.random() * ((size - 1) - 1) + 1);
    if (!grid.rows[randomLine].cells[randomColumn].classList.contains("snake")) {
        if (randomLine % 2 === 0) {
            grid.rows[randomLine].cells[randomColumn].innerHTML = "🍓";
        } else {
            grid.rows[randomLine].cells[randomColumn].innerHTML = "🍉";
        }
    } else {
        generateFood();
    }
}

function generateLoseCell() {
    for (let i = 0; i < 7; ++i) {
        let randomLine = Math.floor(Math.random() * ((size - 1) - 1) + 1);
        let randomColumn = Math.floor(Math.random() * ((size - 1) - 1) + 1);
        if (!grid.rows[randomLine].cells[randomColumn].classList.contains("snake")) {
            grid.rows[randomLine].cells[randomColumn].innerHTML = "📛";
        }
    }
}

function updateSnake() {
    if (checkGameOver() === true) {
        return;
    }
    grid.rows[snake[0].i].cells[snake[0].j].classList.remove("snake");
    if(grid.rows[sankeLine].cells[snakeColumn].innerText === "🍓" ||
        grid.rows[sankeLine].cells[snakeColumn].innerText === "🍉") {
        ++score;
        document.getElementById("score").innerText = score;
        grid.rows[sankeLine].cells[snakeColumn].innerText = "";
        snake.push({i: sankeLine, j: snakeColumn});
        grid.rows[sankeLine].cells[snakeColumn].classList.add("snake");
        generateFood();
    }
    snake.shift();
    sankeLine += lineDirection;
    snakeColumn += columnDirection;
    grid.rows[sankeLine].cells[snakeColumn].classList.add("snake");
    snake.push({i: sankeLine, j: snakeColumn});
}

function checkGameOver() {
    if (grid.rows[sankeLine].cells[snakeColumn].innerText === "📛" ||
        grid.rows[sankeLine].cells[snakeColumn].innerText === "🟧" ||
        grid.rows[sankeLine + lineDirection].cells[snakeColumn + columnDirection].classList.contains("snake")) {
        document.getElementById("message").innerText = "GAME OVER";
        return true;
    }
}