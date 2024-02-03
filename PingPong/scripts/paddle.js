/*
    Paddle-
    Movement in X-axis
        Using mouse for player
        Based on ball for Computer
    Computer Speed increases with level
        level increase after every 10 points
 */

const INITIAL_VELOCITY = 0.025;

export default class Paddle {
  constructor(_paddle) {
    this.paddle = _paddle;
    this.velocity = INITIAL_VELOCITY;
  }
  reset() {
    this.Position = 50;
  }

  get Position() {
    return getComputedStyle(this.paddle).getPropertyValue("--position");
  }

  set Position(value) {
    this.paddle.style.setProperty("--position", value);
  }

  Rect() {
    return this.paddle.getBoundingClientRect();
  }

  update(delta, ball) {
    this.Position =
      this.Position - this.velocity * delta * (this.Position - ball.X);
  }
}
