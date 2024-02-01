const Options = {
  Rock: {
    name: "Rock",
    emoji: "✊",
    beats: "Scissor",
  },

  Scissor: {
    name: "Scissor",
    emoji: "✌️",
    beats: "Paper",
  },

  Paper: {
    name: "Paper",
    emoji: "🖐️",
    beats: "Rock",
  },
};
const OptionId = ["Rock", "Scissor", "Paper"];
const Buttons = document.querySelectorAll(".selections > button");
let ComputerScore = 0;
let UserScore = 0;
const matchResult = document.getElementById("matchResult");
const UserScoreElement = document.querySelectorAll(".scores > div").item(0);
const ComputerScoreElement = document.querySelectorAll(".scores > div").item(1);

const ResultOffset = matchResult.getBoundingClientRect().y;
console.log(window.innerHeight - ResultOffset);
matchResult.style.height = `${window.innerHeight - ResultOffset - 40}px`;

Buttons.forEach((button) => {
  button.addEventListener("click", GameEventHandler);
});

function IncreamentScore(playerId) {
  const Player = document.getElementById(playerId);
}

function GameEventHandler(e) {
  const ComputerSelection = OptionId[Math.floor(Math.random() * 3)];
  const UserSelection = e.target.dataset.name;
  console.log(ComputerSelection, UserSelection);
  const element = document.createElement("article");
  const user = document.createElement("div");
  const result = document.createElement("div");
  const computer = document.createElement("div");
  user.innerHTML = Options[UserSelection].emoji;
  computer.innerHTML = Options[ComputerSelection].emoji;
  if (ComputerSelection == UserSelection) {
    result.innerHTML = `Draw`;
  } else if (Options[UserSelection].beats == ComputerSelection) {
    UserScore++;
    UserScoreElement.innerHTML = `User Score ${UserScore}`;
    result.innerHTML = "You won";
    user.classList.add("winner");
  } else {
    result.innerHTML = "Computer won";
    ComputerScore++;
    ComputerScoreElement.innerHTML = `User Score ${ComputerScore}`;
    computer.classList.add("winner");
  }
  element.append(user, result, computer);
  matchResult.append(element);
  element.scrollIntoView({
    behavior: "smooth",
    block: "end",
  });
  element.style.backgroundColor = "transparent";
}
let htmlelement = `
        <article>
          <div>✊</div>
          <div>Computer Win</div>
          <div>✊</div>
        </article>`;
