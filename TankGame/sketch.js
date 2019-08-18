var tank_pos;
var bullets = [];
var shot_dir;
var test_map;

function setup() {
  createCanvas(1000, 1000);
  stroke(255);
  var dimensions = 800;
  tank_pos = createVector(dimensions / 2, dimensions / 2);
  test_map = new Map(10, 10, 80);
  test_map.random_gen(0.2);
}

function draw() {
  background(0);
  if (keyIsDown(LEFT_ARROW)) {
    tank_pos.x -= 2;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    tank_pos.x += 2;
  }
  if (keyIsDown(UP_ARROW)) {
    tank_pos.y -= 2;
  }
  if (keyIsDown(DOWN_ARROW)) {
    tank_pos.y += 2;
  }

  if (tank_pos.x > windowWidth) {
    tank_pos.x = windowWidth;
  }
  if (tank_pos.x < 0) {
    tank_pos.x = 0;
  }
  if (tank_pos.y > windowHeight) {
    tank_pos.y = windowHeight;
  }
  if (tank_pos.y < 0) {
    tank_pos.y = 0;
  }

  shot_dir = createVector(mouseX - tank_pos.x, mouseY - tank_pos.y).normalize();

  fill(255);
  rect(tank_pos.x, tank_pos.y, 50, 50);
  test_map.display();

  for (var i = 0; i < bullets.length; i++) {
    bullets[i].update(test_map.get_walls());
    bullets[i].display();
    bullet_pos = bullets[i].get_pos();
    if (bullet_pos.x > windowWidth || bullet_pos.x < 0) {
      bullets.splice(i, 1);
    } else if (bullet_pos.y > windowHeight || bullet_pos.y < 0) {
      bullets.splice(i, 1);
    } else if (bullets[i].get_bounces() > 1) {
      bullets.splice(i, 1);
    }
  }
}

function mousePressed() {
  var bullet = new Bullet(shot_dir, 3, tank_pos);
  bullets.push(bullet);
}
