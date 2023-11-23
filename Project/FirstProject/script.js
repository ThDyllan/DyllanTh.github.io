let player;
let food;
let enemies;
let score;
let end;
let mouse = false;
let timeStop = false;

function setup() {
  createCanvas(windowWidth, windowHeight);

  noStroke();
  textAlign(LEFT, TOP);
  textSize(12);

  player = new Player();
  food = new Food();
  enemies = [];
  score = 0;
  end = false;
}

function draw() {
  if (!end) {
    background(0);
    food.draw();
    player.draw();
    enemies.forEach(enemy => {
      if (!timeStop) {
        enemy.move();
      }
      enemy.draw();
      if (player.collide(enemy)) {
        end = true;
      }
    });
    if (player.collide(food)) {
      food.newFood();
      score++;
      enemies.push(new Enemy());
    }
    fill("white");
    text("Score : " + score + "\nFPS : " + Math.round(frameRate()), 0, 0);
  }
}

function keyPressed(e) {
  if (e.code == "Space") {
    timeStop = !timeStop;
  }
}

function mousePressed(e) {
  if (!end) {
    if (Math.abs(e.clientX - player.pos.x) < player.size) {
      if (Math.abs(e.clientY - player.pos.y) < player.size) {
        mouse = true;
      }
    }
  }
}

function mouseReleased(e) {
  mouse = false;
}

function mouseDragged(e) {
  if (!end) {
    if (mouse) {
      player.pos.x = e.clientX;
      player.pos.y = e.clientY;
    }
  }
}

class Player {
  constructor() {
    this.pos = createVector(random(width), random(height));
    this.size = 12.5;
    this.color = "white";
  }
  draw() {
    if (this.pos.x > width - this.size) {
      this.pos.x = width - this.size;
    }
    if (this.pos.x < this.size) {
      this.pos.x = this.size;
    }
    if (this.pos.y > height - this.size) {
      this.pos.y = height - this.size;
    }
    if (this.pos.y < this.size) {
      this.pos.y = this.size;
    }
    fill(this.color);
    circle(this.pos.x, this.pos.y, this.size * 2);
  }

  collide(obj) {
    let dx = this.pos.x - obj.pos.x;
    let dy = this.pos.y - obj.pos.y;
    let d = Math.sqrt((dy * dy) + (dx * dx));
    if (d > (this.size + obj.size)) {
      return false;
    } else {
      return true;
    }
  }
}

class Enemy {
  constructor() {
    this.size = 7.5;
    this.pos = createVector(random(this.size, width - this.size), random(this.size, height - this.size));
    this.vel = p5.Vector.random2D();
    this.color = "red";
  }
  move() {
    if (this.pos.x > width - this.size || this.pos.x < this.size) {
      this.vel.x *= -1;
    } else if (this.pos.y > height - this.size || this.pos.y < this.size) {
      this.vel.y *= -1;
    }
    this.pos.add(this.vel);
  }
  draw() {
    fill(this.color);
    circle(this.pos.x, this.pos.y, this.size * 2);
  }
}


class Food {
  constructor(x, y) {
    this.pos = createVector(random(width), random(height));
    this.size = 7.5;
    this.color = "green";
  }
  draw() {
    fill(this.color);
    circle(this.pos.x, this.pos.y, this.size * 2);
  }
  newFood() {
    this.pos.x = random(width);
    this.pos.y = random(height);
  }
}

