import Alien from "./alien.js";
import movingDirection from "./movingDirection.js";
export default class alienMovement {
  alienRows = [];

  currentDirection = movingDirection.right;
  xVelocity = 0;
  yVelocity = 0;
  defaultXVelocity = 2;
  defaultYVelocity = 2;
  moveDownTimerDefault = 30;
  moveDownTimer = this.moveDownTimerDefault;

  constructor(
    canvas,
    playerBulletMove,
    player2BulletMove,
    level = [[1, 1, 1]]
  ) {
    this.canvas = canvas;
    this.playerBulletMove = playerBulletMove;
    this.player2BulletMove = player2BulletMove;
    this.alienMap = level;
    this.spawnAliens();
  }

  draw(ctx) {
    this.decrementMoveDownTimer();
    this.updateVelocityAndDirection();
    this.collisionDetection();
    this.drawAliens(ctx);
    this.resetMoveDownTimer();
  }

  collisionDetection() {
    this.alienRows.forEach((alienRow) => {
      alienRow.forEach((alien, alienIdx) => {
        if (
          this.playerBulletMove.collideWith(alien) ||
          this.player2BulletMove.collideWith(alien)
        ) {
          alienRow.splice(alienIdx, 1);
        }
      });
    });
    this.alienRows = this.alienRows.filter((alienRow) => alienRow.length > 0);
  }

  resetMoveDownTimer() {
    if (this.moveDownTimer <= 0) {
      this.moveDownTimer = this.moveDownTimerDefault;
    }
  }

  decrementMoveDownTimer() {
    if (
      this.currentDirection == movingDirection.downLeft ||
      this.currentDirection == movingDirection.downRight
    ) {
      this.moveDownTimer--;
    }
  }

  updateVelocityAndDirection() {
    for (const alienRow of this.alienRows) {
      if (this.currentDirection == movingDirection.right) {
        this.xVelocity = this.defaultXVelocity;
        this.yVelocity = 0;
        const rightMostAlien = alienRow[alienRow.length - 1];
        if (rightMostAlien.x + rightMostAlien.width >= this.canvas.width) {
          this.currentDirection = movingDirection.downLeft;
          break;
        }
      } else if (this.currentDirection == movingDirection.downLeft) {
        this.xVelocity = 0;
        this.yVelocity = this.defaultYVelocity;
        if (this.moveDown(movingDirection.left)) {
          break;
        }
      } else if (this.currentDirection == movingDirection.left) {
        this.xVelocity = -this.defaultXVelocity;
        this.yVelocity = 0;
        const leftMostAlien = alienRow[0];
        if (leftMostAlien.x <= 0) {
          this.currentDirection = movingDirection.downRight;
          break;
        }
      } else if (this.currentDirection == movingDirection.downRight) {
        this.xVelocity = 0;
        this.yVelocity = this.defaultYVelocity;
        if (this.moveDown(movingDirection.right)) {
          break;
        }
      }
    }
  }

  moveDown(newDirection) {
    this.xVelocity = 0;
    this.yVelocity = this.defaultYVelocity;
    if (this.moveDownTimer <= 0) {
      this.currentDirection = newDirection;
      return true;
    }
    return false;
  }

  drawAliens(ctx) {
    this.alienRows.flat().forEach((alien) => {
      alien.move(this.xVelocity, this.yVelocity);
      alien.draw(ctx);
    });
  }

  spawnAliens() {
    this.alienMap.forEach((row, rowIdx) => {
      this.alienRows[rowIdx] = [];
      row.forEach((alienNumber, alienIdx) => {
        if (alienNumber != 0) {
          this.alienRows[rowIdx].push(new Alien(alienIdx * 50, rowIdx * 50));
        }
      });
    });
  }

  collideWith(player) {
    return this.alienRows.flat().some((alien) => alien.collideWith(player));
  }
  collideBottom() {
    return this.alienRows.flat().some((alien) => alien.collideBottom());
  }
}
