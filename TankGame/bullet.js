class Bullet {
  constructor(bul_dir, speed, origin_pos) {
    this.dir = bul_dir.copy();
    this.speed = speed;
    this.pos = origin_pos.copy();
    this.num_bounces = 0;
    //this.color = color(255, 255, 255);
  }

  display() {
    fill(255);
    ellipse(this.pos.x, this.pos.y, 10, 10);
  }

  update(walls) {
    this.pos = this.pos.add(this.dir.copy().mult(this.speed));
    for (var wall of walls) {
      var bounds = wall.get_bounds();
      if (this.pos.x > bounds[0] && this.pos.x < bounds[2] && this.pos.y > bounds[1] && this.pos.y < bounds[3]) {
        var midpoint = createVector((bounds[0] + bounds[2]) / 2, (bounds[1] + bounds[3]) / 2);
        if (this.pos.y < this.pos.x - midpoint.x + midpoint.y) { //diagonal
          if (this.pos.y < -(this.pos.x - midpoint.x) + midpoint.y) { //bottom quadrant
            this.dir.y *= -1;
          } else { //right quadrant
            this.dir.x *= -1;
          }
        } else {
          if (this.pos.y < -(this.pos.x - midpoint.x) + midpoint.y) { //left quadrant
            this.dir.x *= -1;
          } else { //top quadrant
            this.dir.y *= -1;
          }
        }
        this.num_bounces += 1;
        break;
      }
    }
  }

  get_pos() {
    return this.pos.copy();
  }

  get_bounces() {
    return this.num_bounces;
  }
}
