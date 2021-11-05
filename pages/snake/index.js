// React dependancies
import { useRef, useEffect, useState } from 'react'

// Next dependancies
import Head from 'next/head'
import Link from 'next/link'

// Components
import Footer from '../../components/Footer'

// Styles
import styles from '../../styles/Snake.module.css'

// Game Functionality
import { startGame, controls } from './startGame'

//Alert Messages
import { Alert } from '../../components/alert';

const Snake = ({props}) => {
  const [isRunning, setIsRunning] = useState(false);
  const squaresRef = useRef(null)
  const scoreRef = useRef(null)

  useEffect(() => {
    if(isRunning) {
      window.addEventListener('keyup', controls);
    }
  });

  return (
    <div className={styles.container}>
      <Head>
        <title>Snake</title>
        <meta name="description" content="good ole snake game" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <main className={styles.main}>
        <h1>Snake<span className={styles.accent}></span></h1>
        <div className={styles.nav}>
          <div className={styles.start} onClick={() => {setIsRunning(true); startGame(squaresRef, scoreRef);}}>Start/Restart</div>
          <Link href='/' passHref>
            <div className={styles.start}>
              Go back
            </div>
          </Link>
        </div>
        <div className="score">Score: <span ref={scoreRef}>0</span></div>
        <div className={styles.grid} ref={squaresRef}>
          {[...Array(400).keys()].map(index => <div key={index}></div>)}
        </div>
        <div className={styles.alertContainer}>
          <Alert />
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Snake
