let cases = new Array(3);
for (let i = 0; i < cases.length; i++) {
    cases[i] = new Array(3);
    for (let j = 0; j < cases[i].length; j++) {
        cases[i][j] = 0;
    }
}
let maxWidth;
let maxHeight;
let turn = 1;
let end = false;

function setup() {
    maxWidth = windowWidth;
    maxHeight = windowHeight;
    createCanvas(maxWidth, maxHeight);
    background(0);
    fill("black");
    stroke("white");
    strokeWeight(3);
    // quadrillage
    line(maxWidth * 1 / 3, 0, maxWidth * 1 / 3, maxHeight);
    line(maxWidth * 2 / 3, 0, maxWidth * 2 / 3, maxHeight);
    line(0, maxHeight * 1 / 3, maxWidth, maxHeight * 1 / 3);
    line(0, maxHeight * 2 / 3, maxWidth, maxHeight * 2 / 3);
}

function draw() {}

function mouseClicked(event) {
    let mouseX = event.clientX;
    let mouseY = event.clientY;
    if (mouseY < maxHeight * 1 / 3) {
        //if top row
        if (mouseX < maxWidth * 1 / 3) {
            //if left
            drawTurn(turn, 0, 0);
        } else if (mouseX < maxWidth * 2 / 3) {
            //if middle
            drawTurn(turn, 1, 0);
        } else if (mouseX < maxWidth) {
            //if right
            drawTurn(turn, 2, 0);
        }
    } else if (mouseY < maxHeight * 2 / 3) {
        //if middle row
        if (mouseX < maxWidth * 1 / 3) {
            //if left
            drawTurn(turn, 0, 1);
        } else if (mouseX < maxWidth * 2 / 3) {
            //if middle
            drawTurn(turn, 1, 1);
        } else if (mouseX < maxWidth) {
            //if right
            drawTurn(turn, 2, 1);
        }
    } else if (mouseY < maxHeight * 3 / 3) {
        //if bottom row
        if (mouseX < maxWidth * 1 / 3) {
            //if left
            drawTurn(turn, 0, 2);
        } else if (mouseX < maxWidth * 2 / 3) {
            //if middle
            drawTurn(turn, 1, 2);
        } else if (mouseX < maxWidth) {
            //if right
            drawTurn(turn, 2, 2);
        }
    }
}

function drawTurn(player, x, y) {
    if (cases[x][y] !== 0 || end) {
        return;
    } else {
        cases[x][y] = player;
    }
    x = x * maxWidth / 3;
    y = y * maxHeight / 3;
    if (player === 1) {
        line(x, y, x + maxWidth / 3, y + maxHeight / 3);
        line(x, y + maxHeight / 3, x + maxWidth / 3, y);
        checkMate();
        turn = 2;
    } else {
        ellipse(x + maxWidth / 3 / 2, y + maxHeight / 3 / 2, maxWidth / 3, maxHeight / 3);
        checkMate();
        turn = 1;
    }
}

function checkMate() {
    if (cases[0][0] != 0 && cases[0][0] === cases[1][0] && cases[0][0] == cases[2][0]) {
        console.log("top row won")
        end = true;
    } else if (cases[0][1] != 0 && cases[0][1] === cases[1][1] && cases[0][1] == cases[2][1]) {
        console.log("middle row won")
        end = true;
    } else if (cases[0][2] != 0 && cases[0][2] === cases[1][2] && cases[0][2] == cases[2][2]) {
        console.log("bottom row won")
        end = true;
    } else if (cases[0][0] != 0 && cases[0][0] === cases[0][1] && cases[0][0] == cases[0][2]) {
        console.log("left column won")
        end = true;
    } else if (cases[1][0] != 0 && cases[1][0] === cases[1][1] && cases[1][0] == cases[1][2]) {
        console.log("middle column won")
        end = true;
    } else if (cases[2][0] != 0 && cases[2][0] === cases[2][1] && cases[2][0] == cases[2][2]) {
        console.log("right column won")
        end = true;
    } else if (cases[0][0] != 0 && cases[0][0] === cases[1][1] && cases[0][0] == cases[2][2]) {
        console.log("diagonal top left won")
        end = true;
    } else if (cases[0][2] != 0 && cases[0][2] === cases[1][1] && cases[0][2] == cases[2][0]) {
        console.log("diagonal botton left won")
        end = true;
    }

    cases_left = 0;
    for (let row = 0; row < cases.length; row++) {
        for (let column = 0; column < cases[row].length; column++) {
            if (cases[row][column] === 0) {
                cases_left++;
            }
        }
    }
    if (end) {
        textSize(64);
        fill("Blue")
        textAlign(CENTER);
        text("Bravo, le joueur " + turn + " gagne", maxWidth / 2, maxHeight / 2);
    } else if (cases_left === 0) {
        textSize(64);
        fill("Blue")
        textAlign(CENTER);
        text("Macth nul", maxWidth / 2, maxHeight / 2);
    }
}