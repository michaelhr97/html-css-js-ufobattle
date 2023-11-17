window.addEventListener("DOMContentLoaded", () => {
  ("use strict");

  const DEFAULT_INITIAL_TIME = 60;
  const DEFAULT_INITIAL_NUMBER_UFOS = 1;

  let pid;
  let time = document.getElementById("time");
  let score = document.getElementById("score");
  let currentScore = 0;
  let horizontalStep = 5;
  let verticalStep = 5;
  let missilelaunched = false;
  let themissile = document.getElementById("missile");
  let theufos = [];
  let ufoHorizontalSteps = [];

  function setUp() {
    let initialTime = sessionStorage.getItem("time") || DEFAULT_INITIAL_TIME;
    time.innerText = initialTime;

    document.getElementById("score").innerText = currentScore;

    let initialUfos =
      sessionStorage.getItem("totalufo") || DEFAULT_INITIAL_NUMBER_UFOS;
    let ufoContainer = document.getElementById("play__ufos");
    for (let i = 0; i < initialUfos; i++) {
      let ufo = document.createElement("img");
      ufo.classList.add("ufo");
      ufo.src = "../assets/ufo.png";
      ufo.style.left = `${Math.floor(Math.random() * window.innerWidth)}px`;
      ufo.style.bottom = `${Math.floor(Math.random() * window.innerHeight)}px`;
      ufo.style.width = "60px";

      ufoContainer.appendChild(ufo);
    }

    ufoHorizontalSteps = Array.from(
      { length: initialUfos },
      () => horizontalStep
    );
    theufos = document.querySelectorAll(".ufo");
    console.log(theufos);
  }

  function updateTimer() {
    let currentTime = parseInt(time.innerText);
    if (currentTime > 0) {
      currentTime--;
      time.innerText = currentTime;
    } else {
      clearInterval(pid);
      alert("Game Over!");
    }
  }

  function updateScore() {
    score.innerText = currentScore;
  }

  function play() {
    setUp();
    updateTimer();
    updateScore();
    launchUFOs();
  }

  function launchUFOs() {
    theufos = document.querySelectorAll(".ufo");
    theufos.forEach((ufo, index) => setInterval(() => moveUFO(ufo, index), 25));
  }

  function moveUFO(ufo, index) {
    let rightWindowLimit = window.innerWidth;
    let ufoComputedStyle = window.getComputedStyle(ufo);
    let ufoHorizontalPosition = Number.parseInt(
      ufoComputedStyle.getPropertyValue("left")
    );
    let ufoWidth = Number.parseInt(ufoComputedStyle.getPropertyValue("width"));

    if (
      ufoHorizontalPosition + ufoWidth + 8 > rightWindowLimit ||
      ufoHorizontalPosition < 8
    ) {
      ufoHorizontalSteps[index] = -ufoHorizontalSteps[index];
    }

    ufoHorizontalPosition += ufoHorizontalSteps[index];
    ufo.style.left = `${ufoHorizontalPosition}px`;
  }

  function moveMissileLeft() {
    let missileComputedStyle = window.getComputedStyle(themissile);
    let missileHorizontalPosition = Number.parseInt(
      missileComputedStyle.getPropertyValue("left")
    );

    if (missileHorizontalPosition > 8) {
      missileHorizontalPosition -= horizontalStep;
      themissile.style.left = `${missileHorizontalPosition}px`;
    }
  }

  function moveMissileRight() {
    let rightWindowLimit = window.innerWidth;
    let missileComputedStyle = window.getComputedStyle(themissile);
    let missileHorizontalPosition = Number.parseInt(
      missileComputedStyle.getPropertyValue("left")
    );
    let missileWidth = Number.parseInt(
      missileComputedStyle.getPropertyValue("width")
    );

    if (missileHorizontalPosition + missileWidth + 8 < rightWindowLimit) {
      missileHorizontalPosition += horizontalStep;
      themissile.style.left = `${missileHorizontalPosition}px`;
    }
  }

  function checkForHit() {
    let missileComputedStyle = window.getComputedStyle(themissile);

    let hit;
    let missileHorizontalPosition = Number.parseInt(
      missileComputedStyle.getPropertyValue("left")
    );
    let missileVerticalPosition = Number.parseInt(
      missileComputedStyle.getPropertyValue("bottom")
    );
    let missileWidth = Number.parseInt(
      missileComputedStyle.getPropertyValue("width")
    );
    let missileHeigth = Number.parseInt(
      missileComputedStyle.getPropertyValue("height")
    );

    for (let ufo of theufos) {
      let ufoComputedStyle = window.getComputedStyle(ufo);

      let ufoHorizontalPosition = Number.parseInt(
        ufoComputedStyle.getPropertyValue("left")
      );
      let ufoVerticalPosition = Number.parseInt(
        ufoComputedStyle.getPropertyValue("bottom")
      );
      let ufoWidth = Number.parseInt(
        ufoComputedStyle.getPropertyValue("width")
      );

      hit =
        missileVerticalPosition + missileHeigth >= ufoVerticalPosition &&
        missileHorizontalPosition + missileWidth / 2 >= ufoHorizontalPosition &&
        missileVerticalPosition + missileWidth / 2 <=
          ufoVerticalPosition + ufoWidth &&
        missileVerticalPosition <= ufoVerticalPosition;

      if (hit) {
        return {
          hit,
          target: ufo,
        };
      }
    }

    return { hit };
  }

  function launchMissile() {
    let topWindowLimit = window.innerHeight;
    let missileComputedStyle = window.getComputedStyle(themissile);

    let missileVerticalPosition = Number.parseInt(
      missileComputedStyle.getPropertyValue("bottom")
    );

    if (missileVerticalPosition < topWindowLimit) {
      missileVerticalPosition += verticalStep;
    } else {
      missilelaunched = false;
      clearInterval(pid);
      missileVerticalPosition = 0;
    }

    themissile.style.bottom = `${missileVerticalPosition}px`;
    let result = checkForHit();
    if (result.hit) {
      missilelaunched = false;

      if (!result.target.hitProcessed) {
        currentScore += 100;
        result.target.hitProcessed = true;
        updateScore();
      }

      result.target.src = "../../assets/explosion.gif";
      setTimeout(() => {
        result.target.remove();
        theufos = document.querySelectorAll(".ufo");
        if (theufos.length === 0) {
          alert("Game finished!");
          play();
        }
      }, 1000);
    }
  }

  function pullTrigger() {
    missilelaunched = true;
    pid = setInterval(launchMissile, 25);
  }

  function keyboardController(event) {
    let code = event.key;

    if (!missilelaunched) {
      switch (code) {
        case "ArrowLeft":
          moveMissileLeft();
          break;
        case "ArrowRight":
          moveMissileRight();
          break;
        case " ":
          pullTrigger();
          break;
        default:
          break;
      }
    }
  }
  pid = setInterval(updateTimer, 1000);

  document.addEventListener("keydown", keyboardController, false);
  play();
});
