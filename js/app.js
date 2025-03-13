const game = document.querySelector("#game");
const timerEl = document.querySelector("#timer");
const scoreEl = document.querySelector("#score");
const startBtn = document.querySelector("#startGame");
const startGames = document.querySelector("#dashboard");
const onGame = document.querySelector(".game");
const result = document.querySelector(".result");
const playAgain = document.querySelector("#playAgain");
const parag = document.querySelector("#paragraf");

let arrCard = [
  { card: "BOWSER.png" },
  { card: "BOWSER.png" },
  { card: "MARIO.png" },
  { card: "MARIO.png" },
  { card: "PRINCESS.png" },
  { card: "PRINCESS.png" },
  { card: "TOAD.png" },
  { card: "TOAD.png" },
  { card: "YOSHI.png" },
  { card: "YOSHI.png" },
];

let flippedCards = [];
let matchedCards = [];
let score = 0;
let timer = 25;
let gameInterval;

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function startGame() {
  score = 0;
  timer = 20;
  scoreEl.textContent = score;
  timerEl.textContent = timer;
  clearInterval(gameInterval);
  flippedCards = [];
  matchedCards = [];
  game.innerHTML = "";
  arrCard = shuffle(arrCard);

  arrCard.forEach(({ card }) => {
    game.innerHTML += `
      <div class="itmes-game flipped">
        <div class="card-inner">
          <img class="revers" src="/assets/sonic/Card - Reverse.png" alt="">
          <img class="obrevers" src="/assets/card/${card}" alt="">
        </div>
      </div>`;
  });

  document.querySelectorAll(".itmes-game").forEach((card) => {
    card.addEventListener("click", () => {
      if (
        flippedCards.length < 2 &&
        card.classList.contains("itmes-game") &&
        !matchedCards.includes(card)
      ) {
        card.classList.remove("flipped");
        flippedCards.push(card);
      }

      if (flippedCards.length === 2) {
        setTimeout(() => {
          if (!checkMatch(flippedCards)) {
            flippedCards.forEach((card) => card.classList.add("flipped"));
          } else {
            score++;
            scoreEl.textContent = score;
            matchedCards.push(...flippedCards);
          }
          flippedCards = [];

          if (score == 0 ) {
            parag.textContent = "Try again";
          } else {
            parag.textContent = "Good Jobs!";
          }
          if (matchedCards.length === arrCard.length) {
            endGame(true);
          }
        }, 700);
      }
    });
  });

  gameInterval = setInterval(() => {
    if (timer > 0) {
      timer--;
      timerEl.textContent = timer;
    } else {
      clearInterval(gameInterval);
      endGame(false);
    }
  }, 1000);
}

function checkMatch(cards) {
  return (
    cards[0].querySelector(".obrevers").src ===
    cards[1].querySelector(".obrevers").src
  );
}

function endGame(win) {
  clearInterval(gameInterval);
  setTimeout(() => {
    onGame.style.display = "none";
    result.style.display = "flex";
  }, 500);
}

startBtn.addEventListener("click", () => {
  setTimeout(() => {
    startGames.style.display = "none";
    onGame.style.display = "flex";
    result.style.display = "none";
    startGame();
  }, 500);
});

playAgain.addEventListener("click", () => {
  setTimeout(()=>{
    startGames.style.display = "none";
    onGame.style.display = "flex";
    result.style.display = "none";
    startGame();
  },500)
});
