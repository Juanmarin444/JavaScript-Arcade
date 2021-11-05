import { alertService } from '../../services'

const width = 20;
let currentIndex = 0;
let appleIndex = 0;
let currentSnake = [2, 1, 0];

let direction = 1;
let score = 0;
let speed = .9;
let intervalTime = 0;
let interval = 0;

let mySquares;
let myScoreDisplay;

export const startGame = (squareReference, scoreReference) => {
  const squares = squareReference.current.childNodes;
  mySquares = squares;
  const scoreDisplay = scoreReference.current;
  myScoreDisplay = scoreDisplay
  currentSnake.forEach(index => squares[index].classList.remove("Snake_snake__NEgKB"));
  squares[appleIndex].classList.remove("Snake_apple__sbO9S");
  clearInterval(interval);
  score = 0;
  randomApple();
  direction = 1;
  scoreDisplay.innerHTML = score;
  intervalTime = 1000;
  currentSnake = [2, 1, 0];
  currentIndex = 0;
  currentSnake.forEach(index => squares[index].classList.add("Snake_snake__NEgKB"));
  interval = setInterval(moveOutcomes, intervalTime);
}

const moveOutcomes = () => {
  if (
    (currentSnake[0] + width >= (width * width) && direction === width) || // snake hits bottom wall
    (currentSnake[0] % width === width - 1 && direction === 1) || // snake hits right wall
    (currentSnake[0] % width === 0 && direction === -1) || // snake hits left wall
    (currentSnake[0] - width < 0 && direction === -width) || //  snake hits top wall
    mySquares[currentSnake[0] + direction].classList.contains("Snake_snake__NEgKB") // snake goes into self
  ) {
    // alert("YOU LOST!")
    alertService.success(`You <strong>lost</strong>!`, {autoClose: true, keepAfterRouteChange: false});
    return clearInterval(interval);
  }

  const tail = currentSnake.pop(); // removes div of the arrau and shows interval
  mySquares[tail].classList.remove("Snake_snake__NEgKB"); //removes the class of snake from the tail
  currentSnake.unshift(currentSnake[0] + direction); // gives direction to head of snake

  if(mySquares[currentSnake[0]].classList.contains("Snake_apple__sbO9S")) {
    mySquares[currentSnake[0]].classList.remove("Snake_apple__sbO9S");
    mySquares[tail].classList.add("Snake_snake__NEgKB");
    currentSnake.push(tail);
    randomApple()
    score++;
    myScoreDisplay.textContent = score;
    clearInterval(interval);
    intervalTime = intervalTime * speed
    interval = setInterval(moveOutcomes, intervalTime)
  }

  mySquares[currentSnake[0]].classList.add("Snake_snake__NEgKB")

}

const randomApple = () => {
  const length = mySquares.length
  do {
    appleIndex = Math.floor(Math.random() * length)
  } while (mySquares[appleIndex].classList.contains("Snake_snake__NEgKB"))

  mySquares[appleIndex].classList.add("Snake_apple__sbO9S")
}

export const controls = (e) => {
  mySquares[currentIndex].classList.remove('Snake_snake__NEgKB')

  if (e.keyCode === 39) {
    direction = 1;
  } else if (e.keyCode === 38) {
    direction = -width;
  } else if (e.keyCode === 37) {
    direction = -1;
  } else if (e.keyCode === 40) {
    direction = + width;
  }
}
