import { useRef, useState, useEffect } from 'react'
import Head from 'next/head'
import Footer from '../../components/Footer'
import styles from '../../styles/SpaceInvader.module.css'
import Link from 'next/link'

import { startGame, playerMotionControls, laserControl } from '../../services/spaceInvader/startGame'

const SpaceInvader = ({props}) => {
  const [isRunning, setIsRunning] = useState(false);
  const squaresRef = useRef(null)
  const scoreRef = useRef(null)

  useEffect(() => {
    if(isRunning) {
      window.addEventListener('keydown', playerMotionControls)
      window.addEventListener('keyup', laserControl)
    }
  })

  return (
    <div className={styles.container}>
      <Head>
        <title>Space Invader</title>
        <meta name="description" content="Super fun space invader game" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <main className={styles.main}>
        <h1>Space <span className={styles.accent}>Invaders</span></h1>
        <p className={styles.description}>Score: <span ref={scoreRef}>0</span></p>
        <div className={styles.nav}>
          <div
            className={styles.start}
            onClick={() => {setIsRunning(true); startGame(squaresRef, scoreRef);}}>
            Start/Restart
          </div>
          <Link href='/' passHref>
            <div className={styles.start}>
              Go back
            </div>
          </Link>
        </div>
        <div className={styles.grid} ref={squaresRef}>
          {[...Array(225).keys()].map(index => <div key={index}></div>)}
        </div>
        {/* <div className={styles.poof}>yo</div> */}
      </main>
      <Footer />
    </div>
  )
}

export default SpaceInvader
