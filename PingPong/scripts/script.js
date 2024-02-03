import Ball from "./Ball.js";
import Paddle from "./paddle.js";

const ball = new Ball(document.getElementById("ball"));
const ComputerPaddle = new Paddle(document.getElementById("computer-paddle"));
const PlayerPaddle = new Paddle(document.getElementById("player-paddle"));
const ComputerScoreElement = document.getElementById("computer-score");
const PlayerScoreElement = document.getElementById("player-score");
let ComputerScore = 0;
let PlayerScore = 0;

let lastTime = 0;

function update(time) {
  let delta = time - lastTime;

  lastTime = time;

  ball.update(delta, ComputerPaddle, PlayerPaddle);
  ComputerPaddle.update(delta, ball);

  if (IsPointTaken()) HandlePoint();

  window.requestAnimationFrame(update);
}

window.requestAnimationFrame(update);

document.addEventListener("mousemove", (e) => {
  let position = (e.pageX / window.innerWidth) * 100;
  PlayerPaddle.Position = position;
});

function IsPointTaken() {
  return ball.rect().top < 0 || ball.rect().bottom > window.innerHeight;
}

function HandlePoint() {
  if (ball.rect().top < 0) {
    console.log("Player Point");
    PlayerScore += 1;
    PlayerScoreElement.innerText = PlayerScore;
  } else if (ball.rect().bottom > window.innerHeight) {
    console.log("Computer Point");
    ComputerScore += 1;
    ComputerScoreElement.innerText = ComputerScore;
  }
  ball.reset();
  ComputerPaddle.reset();
}
