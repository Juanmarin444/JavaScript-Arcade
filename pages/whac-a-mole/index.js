import { useState, useRef} from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Footer from '../../components/Footer'
import styles from '../../styles/WhackAMole.module.css'

import { alertService } from '../../services'

import { Alert } from '../../components/alert';

const WhacAMole = () => {
  const [time, setTime] = useState(5)
  const [gameRunning, setGameRunning] = useState(false)
  const [score, setScore] = useState(0)

  const scoreStateRef = useRef();

  scoreStateRef.current = score;

  const moleClass = 'WhackAMole_square__3XM0U WhackAMole_mole__1ALXl'
  const squaresClass = 'WhackAMole_square__3XM0U'

  const squares = useRef(null)

  let currentTime = time

  let moleLocation;

  let countDownTimer = null;
  let molePositionTimer = null;

  const startClick = () => {
    if (!gameRunning) {
      if (currentTime === 0) {
        currentTime = 5
        setTime(5)
      }
      setScore(0)
      setGameRunning(true)
      moveMole()
      countDownTimer = setInterval(countDown, 1000)
    } else {
      alertService.success(`The <strong>game</strong> is already <strong>started!</strong> `, {autoClose: true, keepAfterRouteChange: false});
    }
  }

  const randomSquare = () => {

    if (squares.current === null) {
      setGameRunning(false);
      clearInterval(countDownTimer);
      clearInterval(molePositionTimer);
      return;
    }

    const squaresObj = squares.current.children

    for (let square in squaresObj) {
      if (typeof(squaresObj[square]) === 'object') {
        squaresObj[square].attributes[0].value = squaresClass
      }
    }

    let randomPosition = Math.floor(Math.random() * 9)

    moleLocation = randomPosition

    squaresObj[randomPosition].attributes[0].value = moleClass

    if (currentTime === 1) {
      squaresObj[randomPosition].attributes[0].value = squaresClass
    }

  }

  const moveMole = () => {
    molePositionTimer = setInterval(randomSquare, 1000)
  }

  const countDown = () => {

    const squaresObj = squares.current.children
    currentTime = currentTime - 1
    setTime(currentTime)
    if (currentTime === 0) {
      setGameRunning(false);
      clearInterval(countDownTimer);
      clearInterval(molePositionTimer);
      alertService.success(`<strong>Game Over!</strong> Your final score is <strong>${scoreStateRef.current}</strong> `, {autoClose: true, keepAfterRouteChange: false});
    }

  }

  const handleWhac = (event) => {
    if (gameRunning) {
      let result = 0
      let whacAttempt = event.target.attributes[0].value
      if (whacAttempt === moleClass) {
        result = score + 1
        setScore(result)
      } else {
        result = score - 3
        setScore(result)
      }
    } else {
      alertService.success(`Press <strong>start</strong> if you want to <strong>play</strong>! `, {autoClose: true, keepAfterRouteChange: false});
      console.log('Press Start');
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Whac-A-Mole</title>
        <meta name="description" content="Remove the pest from your garden" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <main className={styles.main}>

        <h1>Whac-A-<span className={styles.accent}>Mole</span></h1>

        <div className={styles.gameInfo}>
          <h2>Your score: <span id="score">{score}</span></h2>
          <h2>Seconds left: <span id="time-left">{time}</span></h2>
        </div>

        <div className={styles.nav}>
          <div className={styles.start} id='start' onClick={startClick}>Start game</div>
          <Link href='/' passHref>
            <div className={styles.start}>
              Go back
            </div>
          </Link>
        </div>

        <div className={styles.alertContainer}>
          <Alert />
        </div>

        <div className={styles.grid} ref={squares}>
          <div onClick={handleWhac} className={styles.square} id="1"></div>
          <div onClick={handleWhac} className={styles.square} id="2"></div>
          <div onClick={handleWhac} className={styles.square} id="3"></div>
          <div onClick={handleWhac} className={styles.square} id="4"></div>
          <div onClick={handleWhac} className={styles.square} id="5"></div>
          <div onClick={handleWhac} className={styles.square} id="6"></div>
          <div onClick={handleWhac} className={styles.square} id="7"></div>
          <div onClick={handleWhac} className={styles.square} id="8"></div>
          <div onClick={handleWhac} className={styles.square} id="9"></div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default WhacAMole
