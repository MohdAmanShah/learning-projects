/*
    Ball-   
    Postion : x , y , bounding rectangle
    Velocity : Initial Velocity, Increase in velocity
    Direction : Unit vector to set initial direction of ball when initializing the game.
    Collision: handling the collision with paddles and left and right boundary.
 */

const INITIAL_VELOCITY = 0.025;
const VELOCITY_INCREASE = 0.0001;

export default class Ball {
  constructor(_ball) {
    this.ball = _ball;
    this.reset();
  }

  get X() {
    return parseFloat(getComputedStyle(this.ball).getPropertyValue("--x"));
  }
  set X(value) {
    this.ball.style.setProperty("--x", value);
  }

  get Y() {
    return parseFloat(getComputedStyle(this.ball).getPropertyValue("--y"));
  }
  set Y(value) {
    this.ball.style.setProperty("--y", value);
  }

  rect() {
    return this.ball.getBoundingClientRect();
  }

  reset() {
    this.X = 50;
    this.Y = 50;
    this.velocity = INITIAL_VELOCITY;
    this.direction = SetDirection();
    this.checkDirection();
  }

  update(delta, ComputerPaddle, PlayerPaddle) {
    this.X += this.direction.X * this.velocity * delta;
    this.Y += this.direction.Y * this.velocity * delta;
    this.velocity += VELOCITY_INCREASE;
    this.detectAndHandleBoundaryCollision();
    if (
      CheckCollision(this.rect(), ComputerPaddle.Rect()) ||
      CheckCollision(this.rect(), PlayerPaddle.Rect())
    ) {
      this.direction.Y *= -1;
    }
  }

  updateDirection() {
    this.direction = SetDirection();
  }

  detectAndHandleBoundaryCollision() {
    let ballBoundingRect = this.rect();
    if (
      ballBoundingRect.left < 0 ||
      ballBoundingRect.right > window.innerWidth
    ) {
      this.direction.X *= -1;
    }
  }

  checkDirection() {
    while (
      Math.abs(this.direction.Y) <= 0.3 ||
      Math.abs(this.direction.Y) >= 0.8
    ) {
      this.updateDirection();
    }
  }
}

function SetDirection() {
  const r = Math.random() * (Math.PI * 2);
  let x = Math.cos(r);
  let y = Math.sin(r);
  return {
    X: x,
    Y: y,
  };
}

function CheckCollision(collidedObject, collidedTo) {
  return (
    collidedObject.right >= collidedTo.left &&
    collidedObject.left <= collidedTo.right &&
    collidedObject.top <= collidedTo.bottom &&
    collidedObject.bottom >= collidedTo.top
  );
}
