
var stop = true;

class Tank {
  constructor(x, y, speed, sizeX, sizeY) {
		this.lastdirection = 0;
		this.direction = 0;
		this.pos = createVector(x, y);
    this.dir;
    this.speed = speed;
    this.angle = 0;
    this.stop = true;
    this.sizeX = sizeX;
    this.sizeY = sizeY;
  }

  update() {
    if (getDirection() === lastdirection || abs(getDirection() - lastdirection) === 4) {
      this.move();
    } else {
      if (this.angle + min_turn() * 45 != this.angle) {
        this.turn();
      } else {
        lastdirection = direction;
        this.move();
      }
    }
    this.drawTank();
  }

  move() {
    if (stop === false) {
      switch (getDirection()) {
        case 0:
          this.dir = createVector(0, -1);
          break;
        case 1:
          this.dir = createVector(1, -1).normalize();
          break;
        case 2:
          this.dir = createVector(1, 0);
          break;
        case 3:
          this.dir = createVector(1, 1).normalize();
          break;
        case 4:
          this.dir = createVector(0, 1);
          break;
        case 5:
          this.dir = createVector(-1, 1).normalize();
          break;
        case 6:
          this.dir = createVector(-1, 0);
          break;
        case 7:
          this.dir = createVector(-1, -1).normalize();
          break;
      }
    }
    lastdirection = direction;
    this.pos = this.pos.add(this.dir.copy().mult(this.speed));
  }

  turn() {
    if (this.min_turn() < 0) this.angle = this.angle - 1;
    else this.angle = this.angle + 1;
  }




  drawTank() {
    noStroke();
    background(0, 0, 0);
    angleMode(DEGREES);
    fill(255);
    translate(this.pos.x, this.pos.y);
    rotate(this.angle);
    rectMode(CENTER);
    rect(this.pos.x, this.pos.y, this.sizeX, this.sizeY);
    fill(255, 0, 0)
    let a = atan2(mouseY - this.pos.y, mouseX - this.pos.x);
    translate(this.pos.x + 25, this.posY + 25);
    push();
    rotate(a);
    rect(-20, -10, 40, 20);
  }



  min_turn(start, end) { // start & end between 0-7 inclusive
    var diff = end - start;
    if (diff < 0) { //made diff positive, restore sign later via mult
      var mult = -1;
      diff *= -1;
    } else {
      var mult = 1;
    }
    switch (diff % 4) { //don't need break because of return
      case 0:
        return 0;
      case 1:
        return 1 * mult;
      case 2:
        return 2 * mult;
      case 3:
        return -1 * mult;
    }
  } //12 lines of code not including function definition
}




function getDirection() {
  var press = [
    0,
    0,
    0,
    0
  ];
  if (keyIsDown(87)) press[0] = 1; //w
  if (keyIsDown(83)) press[2] = 1; //s
  if (keyIsDown(65)) press[3] = 1; //a
  if (keyIsDown(68)) press[1] = 1; //d
  var sum = press.reduce((a, b) => a + b);
  press.push(press[0]);
  switch (sum) {
    case 3:
    case 4:
    case 0:
      stop = true;
      return direction;
      break;
    case 2:
      if ((press[1] === 1 && press[3] === 1) || (press[0] === 1 && press[2] === 1)) {
        stop = true;
        return direction;
      } else {
        for (var i = 0; i < 4; i++) {
          if (press[i] === 1 && press[i + 1] === 1) {
            direction = i * 2 + 1;
            return direction;
          }
        }
      }
      break;
    case 1:
      for (var i = 0; i < 4; i++) {
        if (press[i] === 1) {
          direction = i * 2;
          return direction;
        }
      }

  }

}

function setup() {
  createCanvas(windowWidth, windowHeight);
	tank = new Tank(5, 5, 5, 50, 50);
}

function draw() {
  tank.update();
	//print();
}
