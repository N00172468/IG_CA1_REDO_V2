class Molecule {
  constructor(_moleculeId) {
    this.radius = random(minRadius, maxRadius);
    this.position = createVector(
      random(this.radius, width - this.radius * 2),
      random(this.radius, height - this.radius * 2)
    );
    this.velocity = createVector(random(-1, 1), random(-1, 1));
    this.moleculeId = _moleculeId; // Tracking I.D per Object (Starting at Object I.D: 0)
    this.molFill = false; // Object Fill Colour = False by Default
  }

  render() {
    this.molFill ? fill(56, 131, 227) : noFill(); // i.e. If Objects are intersecting, fill in objects. Else don't fill

    push();
    stroke(40, 126, 235);
    strokeWeight(2);
    translate(this.position.x, this.position.y); // Displace 0,0 coordinates
    ellipse(0, 0, this.radius * 2, this.radius * 2); // Main Object (i.e. Molecule)
    pop();

    this.molFill = false;
  }

  step() {
    this.position.add(this.velocity);
  }

  checkEdges() {
    if (
      this.position.x < this.radius ||
      this.position.x > width - this.radius
    ) {
      this.velocity.x = this.velocity.x * -1;
    }
    if (
      this.position.y < this.radius ||
      this.position.y > height - this.radius
    ) {
      this.velocity.y = this.velocity.y * -1;
    }
  }
}
