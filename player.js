class Player {
  constructor() {
    this.width = 60;
    this.height = 60;
    this.x = 30;
    this.y = 650 - this.height;
    this.gravity = 0.5;
    this.velocity = 0;
    this.score = 0;
    this.movePixels = 100;
    this.targetX;
    this.targetY;
    this.jumped = false;
    this.easing = 0.1;
    this.image
    this.imageLeft;
    this.imageRight
  }

  jump() {
    if (this.y > 500) {
    this.targetY = this.y - this.movePixels;
    this.velocity = -15;
    this.jumped = true;
    // console.log(this.targetY)
    }
  }
  draw() {
    this.velocity += this.gravity;
    this.targetY += this.velocity;

    let boundary_box_bottom = 670 - this.height;
    let boundary_box_top = 700;
    let boundary_box_left = 50;
    let boundary_box_right = width - this.width - 50;

    // If y is lower than the top left corner of dodgie we need to set its value to the starting value
    if (this.y >= boundary_box_bottom) {
      this.y = boundary_box_bottom;
      //   this.targetY = this.y;
    }

    image(this.image, this.x, this.y, this.width, this.height);

    if (keyIsDown(LEFT_ARROW) && this.x > boundary_box_left) {
      this.image = this.imageLeft
      this.targetX = this.x - this.movePixels;
    }
    if (keyIsDown(RIGHT_ARROW) && this.x < boundary_box_right) {
      this.image = this.imageRight
      this.targetX = this.x + this.movePixels;
    }
    if (keyIsDown(UP_ARROW) && this.y > boundary_box_top) {
      this.targetY = this.y - this.movePixels;
    //   console.log("new targetY (key up) " + this.targetY);
    }
    if (keyIsDown(DOWN_ARROW) && this.targetY < boundary_box_bottom) {
      this.targetY = this.y + this.movePixels;
    //   console.log("new targetY (key down) " + this.targetY);
    }

    // calculate the new xpos value
    let dx = this.targetX - this.x;
    if (abs(dx) > 1) {
      this.x += dx * this.easing;

    //   console.log("dx = " + dx);
    //   console.log("new x = " + this.x);
    }

    // calculate the new ypos value
    let dy = this.targetY - this.y;
    if (abs(dy) > 1) {
      this.y += dy * this.easing;

    //   console.log("dy = " + dy);
    //   console.log("new y = " + this.y);
    }
  }
}
