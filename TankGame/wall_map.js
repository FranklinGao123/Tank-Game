class Wall {
  constructor(bounds) { // [x1, y1, x2, y2]
    this.bounds = bounds;
  }
  display() {
    rectMode(CORNERS);
    noFill();
    stroke(255);
    strokeWeight(4);
    rect(this.bounds[0], this.bounds[1], this.bounds[2], this.bounds[3]);
    rectMode(CORNER);
  }
  get_bounds() {
    return this.bounds.slice();
  }


}

class Map {
  constructor(cols, rows, g_size) {
    this.walls = [];
    this.num_cols = cols;
    this.num_rows = rows;
    this.grid_size = g_size;
    this.width = this.num_cols * this.grid_size;
    this.height = this.num_rows * this.grid_size;
  }
  random_gen(prob) {
    for (var i = 0; i < this.num_rows; i++) {
			var row = [];
      for (var j = 0; j < this.num_cols; j++) {
        if (random() < prob) {
          var x = j * this.grid_size;
          var y = i * this.grid_size;
          var wall_temp = new Wall([x, y, x + this.grid_size, y + this.grid_size]);
  				row.push(wall_temp);
        }else{
          row.push(null);
        }
      }
			this.walls.push(row);
    }
  }
	get_walls() {
    var walls = [];
    for (var row of this.walls) {
			for (var wall of row) {
        if (wall !== null) {
          walls.push(wall);
        }
			}
		}
		return walls;
	}

	display() {
		for (var row of this.walls) {
			for (var wall of row) {
        if (wall !== null) {
          wall.display();
        }
			}
		}
	}
}
