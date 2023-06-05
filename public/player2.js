export default class Player2 {
  rightPressed = false;
  leftPressed = false;
  firePressed = false;

  constructor(canvas, velocity, bulletMovement, imgPath = "./player.png") {
    this.canvas = canvas;
    this.velocity = velocity;
    this.bulletMovement = bulletMovement;

    this.width = 50;
    this.height = 50;
    this.x = this.canvas.width / 2 - this.width / 2;
    this.y = this.canvas.height - 75;
    this.image = new Image();
    this.image.src = imgPath;

    document.addEventListener("keydown", this.keydown);
    document.addEventListener("keyup", this.keyup);
  }
  draw(ctx) {
    if (this.firePressed) {
      this.bulletMovement.shoot(this.x + this.width / 2, this.y, 4, 70);
    }
    this.move();
    this.collideWithBorder();
    ctx.drawImage(this.image, this.x, this.y, this.height, this.width);
  }

  collideWithBorder() {
    if (this.x < 0) {
      this.x = 0;
    }
    if (this.x > this.canvas.width - this.width) {
      this.x = this.canvas.width - this.width;
    }
  }

  move() {
    if (this.rightPressed) {
      this.x += this.velocity;
    }
    if (this.leftPressed) {
      this.x -= this.velocity;
    }
  }

  keydown = (event) => {
    if (event.code == "ArrowRight") {
      this.rightPressed = true;
    }
    if (event.code == "ArrowLeft") {
      this.leftPressed = true;
    }
    if (event.code == "ArrowUp") {
      this.firePressed = true;
    }
  };
  keyup = (event) => {
    if (event.code == "ArrowRight") {
      this.rightPressed = false;
    }
    if (event.code == "ArrowLeft") {
      this.leftPressed = false;
    }
    if (event.code == "ArrowUp") {
      this.firePressed = false;
    }
  };
}
