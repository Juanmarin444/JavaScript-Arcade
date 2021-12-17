import { useRef, useEffect, useState } from 'react'
import Head from 'next/head'
import Footer from '../../components/Footer'
import styles from '../../styles/OrbSiege.module.css'
import { startGame } from '../../services/orbSiege/startGame'

const OrbSiege = () => {
  const canvasRef = useRef(null)
  const [isRunning, setIsRunning] = useState(false)
  useEffect(() => {
    if (isRunning) {
      console.log("Chicken is now");
      // startGame(canvasRef);
    }
  })
  return (
    <div className={styles.container}>
      <Head>
        <title>Orb Siege</title>
        <meta name="description" content="Last as long as you can against the attach of the rainbow orbs" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <div className={styles.scoreContainer}><span>Score:</span><span id="score">0</span></div>
      <main className={styles.main}>
        <div className={styles.uiModal} id="uiModal">
          <div className={styles.bg}>
            <h1>Orb <span className={styles.accent}>Siege</span></h1>
            <h2 id="endScore">0</h2>
            <h3>Points</h3>
            <div className={styles.startBtn}>
              <button onClick={() => {setIsRunning(true); startGame(canvasRef)}} id="startGameBtn">Start Game</button>
            </div>
          </div>
          <Footer />
        </div>
        <canvas ref={canvasRef} />
      </main>
    </div>
  )
}

export default OrbSiege
