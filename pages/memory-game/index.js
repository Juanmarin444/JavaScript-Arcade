// Assets
import { useRef, useState } from 'react'
import images from '../../public/images/index.js'
import styles from '../../styles/MemoryGame.module.css'
import { alertService } from '../../services'
import { cardArray } from '../../data'
import { server}  from '../../config'

// Next Assets
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

// Components
import { Alert } from '../../components/alert';
import Footer from '../../components/Footer'

const MemoryGame = () => {
  const [isRunning, setIsRunning] = useState(false)

  const cards = useRef(null)
  const resultDisplay = useRef(null)

  var cardsChosen = []
  var cardsChosenId = []
  var cardsWon = []
  let playerGuesses = 10;

  const startGame = () => {
    if (isRunning) {
      alertService.success(`A game is already <strong>running</strong>!`, {autoClose: true, keepAfterRouteChange: false});
    } else {
      setIsRunning(true)
      playerGuesses = 10
      resultDisplay.current.textContent = playerGuesses
      cardArray.sort(() => 0.5 - Math.random())
    }
  }

  const flipCard = (e) => {
    e.preventDefault();
    if (isRunning) {
      const cardId = e.target.getAttribute("dataid");

      if (e.target.src === server + images.white.src) {
        alertService.success(`Yo, this card has already been <strong>flipped</strong>!`, {autoClose: true, keepAfterRouteChange: false});
      } else if (e.target.src === server + cardArray[cardId].img.src) {
        alertService.success(`You clicked this <strong>image</strong> already!`, {autoClose: true, keepAfterRouteChange: false});
      } else {
        cardsChosen.push(cardArray[cardId].name)
        cardsChosenId.push(cardId)
        e.target.src = cardArray[cardId].img.src
        e.target.srcset = cardArray[cardId].img.src
        if (cardsChosen.length === 2) {
          setTimeout(checkForMatch, 250)
        }
      }
    } else {
      alertService.success(`Press start to <strong>play</strong>!`, {autoClose: true, keepAfterRouteChange: false});
    }
  }

  const checkForMatch = () => {
    var myCards = cards.current.children;
    const optionOneId = cardsChosenId[0]
    const optionTwoId = cardsChosenId[1]
    if (cardsChosen[0] === cardsChosen[1]) {
      myCards[optionOneId].children[1].src = images.white.src
      myCards[optionOneId].children[1].srcset = images.white.src

      myCards[optionTwoId].children[1].src = images.white.src
      myCards[optionTwoId].children[1].srcset = images.white.src
      cardsWon.push(cardsChosen)
    } else {
      myCards[optionOneId].children[1].src = images.blank.src
      myCards[optionOneId].children[1].srcset = images.blank.src

      myCards[optionTwoId].children[1].src = images.blank.src
      myCards[optionTwoId].children[1].srcset = images.blank.src
      playerGuesses -= 1
      if (playerGuesses === 0) {

        alertService.success(`Aww snaps you <strong>LOST</strong>! Why don't you try again?`, {autoClose: true, keepAfterRouteChange: false});

        setTimeout(resetGame, 4000)
      }
    }

    cardsChosen = []
    cardsChosenId = []

    resultDisplay.current.textContent = playerGuesses

    if (cardsWon.length === cardArray.length/2) {
      if (playerGuesses > 1) {
        alertService.success(`Congratulations! You <strong>finished</strong> with ${playerGuesses} guesses left!`, {autoClose: true, keepAfterRouteChange: false});
      } else if (playerGuesses === 1) {
        alertService.success(`Congratulations! You <strong>finished</strong> with ${playerGuesses} guess left!`, {autoClose: true, keepAfterRouteChange: false});
      }

      setTimeout(resetGame, 4000)
    }
  }

  const resetGame = () => {

    alertService.success(`<strong>Reseting</strong> game!`, {autoClose: true, keepAfterRouteChange: false});

    setIsRunning(false);
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Memory Game</title>
        <meta name="description" content="Super fun memory game" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <main className={styles.main}>
        <h1>Memory <span className={styles.accent}>Game</span></h1>
        <h3>Score: <span ref={resultDisplay}></span></h3>

        <div className={styles.nav}>
          <div className={styles.start} onClick={startGame}>
            Start
          </div>
          <div className={styles.start} onClick={resetGame}>
            Reset
          </div>
          <Link href='/' passHref>
            <div className={styles.start}>
              Go back
            </div>
          </Link>
        </div>

        <div className={styles.grid}  ref={cards}>
          {isRunning ? (
            cardArray.map((card, index) => (
              <Image key={index} src={images.blank} dataid={index} onClick={flipCard} alt='card' />
            ))
          ) : (<h3>Press Start</h3>)}
        </div>

        <div className={styles.alertContainer}>
          <Alert />
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default MemoryGame
