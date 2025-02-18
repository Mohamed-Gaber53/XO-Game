let title = document.querySelector(".title");
let boxes = document.querySelectorAll(".box");
let resetButton = document.querySelector(".reset");

let active = true;
let currentPlayer = "X";

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

title.innerText = "XO Game";

function handleGame(event) {
  let box = event.target;
  if (box.innerText !== "" || !active) {
    return;
  }
  box.innerText = currentPlayer;
  box.setAttribute("data-value", currentPlayer);

  if (checkWinner()) {
    active = false;
    title.innerText = `${currentPlayer} Wins! 🎉`;
    return;
  }

  if ([...boxes].every((box) => box.innerText !== "")) {
    title.innerText = "It's a Draw! 😐";
    active = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  title.innerText = `${currentPlayer}'s Turn`;
}

function checkWinner() {
  return winningConditions.some((condition) => {
    let [a, b, c] = condition;
    let A = boxes[a].innerText;
    let B = boxes[b].innerText;
    let C = boxes[c].innerText;
    return A && A === B && A === C;
  });
}

function reset() {
  boxes.forEach((box) => {
    box.innerText = "";
    box.removeAttribute("data-value");
  });
  active = true;
  title.innerText = "XO Game";
  currentPlayer = "X";
}
resetButton.addEventListener("click", reset);

boxes.forEach((box) => {
  box.addEventListener("click", handleGame);
});
