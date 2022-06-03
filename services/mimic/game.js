import redSound from "../../public/sounds/red.mp3";
import greenSound from "../../public/sounds/green.mp3";
import blueSound from "../../public/sounds/blue.mp3";
import yellowSound from "../../public/sounds/yellow.mp3";
import gameOverSound from "../../public/sounds/gameover.mp3"
let answers = [];
let userGuesses = [];
let gameStarted = false;
let level = 0;
let colors = ['red', 'green', 'blue', 'yellow'];
let bg;
let title;
let btnSound;

export const runGame = (container) => {

    bg = container.current.classList;

    title = container.current.children[0].children[1];
    let game = container.current.children[0].children[2];

    let btns = game.children;
    for(let btn of btns) {
        btn.addEventListener("click", () => {
            let guess = btn.id;
            userGuesses.push(guess);
            if (guess === 'red') {
                btnSound = new Audio(redSound);
            } else if (guess === 'green') {
                btnSound = new Audio(greenSound);
            } else if (guess === 'blue') {
                btnSound = new Audio(blueSound);
            } else if (guess === 'yellow') {
                btnSound = new Audio(yellowSound);
            }
            btnSound.play();
            checkGuess(btns);
            btn.classList.add('Mimic_click__pzYRP');
            setTimeout(() => {
                btn.classList.remove("Mimic_click__pzYRP");
            }, 131.25);
        })
    }

    window.addEventListener('keydown', () => {
        if (!gameStarted) {
            answers = [];
            userGuesses = [];
            level = 0;
            addAnswer(btns);
            gameStarted = true
        }
    });
}

const addAnswer = (btns) => {
    userGuesses = [];
    let rndBtnIdx = Math.floor(Math.random() * 4);
    let newBtn = btns[rndBtnIdx];
    answers.push(colors[rndBtnIdx]);

    newBtn.classList.add("Mimic_transition__33tjD");
    setTimeout(function () {
        newBtn.classList.remove("Mimic_transition__33tjD");
    }, 162.5);
}

const checkGuess = (btns) => {
    if (userGuesses[userGuesses.length - 1] !== answers[userGuesses.length - 1]) {
        let btnSound = new Audio(gameOverSound);
        btnSound.play()
        title.innerText = "Game Over: Press Any Key";
        gameStarted = false;
        bg.add('Mimic_wrong__XymMp');
        setTimeout(() => {
            bg.remove('Mimic_wrong__XymMp')
        }, 131.25);
    } else {
        if (userGuesses.length >= answers.length) {
            level++;
            title.innerText = `Level: ${level}`;
            setTimeout(addAnswer, 650, btns);
        }
    }
}