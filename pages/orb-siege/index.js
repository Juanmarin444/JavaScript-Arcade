import { useRef, useEffect, useState } from 'react'
import Head from 'next/head'
import Footer from '../../components/Footer'
import styles from '../../styles/OrbSiege.module.css'
import { startGame, shoot } from '../../services/orbSiege/startGame'
// import gsap from 'gsap'

const OrbSiege = () => {
  const canvasRef = useRef(null)
  const scoreRef = useRef(null)
  const uiModalRef = useRef(null)
  const endScoreRef = useRef(null)
  const [isRunning, setIsRunning] = useState(false)
  useEffect(() => {
    if (isRunning) {
      window.addEventListener('click', shoot)
    }
  })
  return (
    <div className={styles.container}>
      <Head>
        <title>Orb Siege</title>
        <meta name="description" content="Last as long as you can against the attach of the rainbow orbs" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <div className={styles.scoreContainer}><span>Score:</span><span ref={scoreRef} id="score">0</span></div>
      <main className={styles.main}>
        <div ref={uiModalRef} className={styles.uiModal} id="uiModal">
          <div className={styles.bg}>
            <h1>Orb <span className={styles.accent}>Siege</span></h1>
            <h2 ref={endScoreRef} id="endScore">0</h2>
            <h3>Points</h3>
            <div className={styles.startBtn}>
              <button onClick={() => {setIsRunning(true); startGame(canvasRef, scoreRef, uiModalRef, endScoreRef)}} id="startGameBtn">Start Game</button>
            </div>
          </div>
          <Footer />
        </div>
        <canvas ref={canvasRef}></canvas>
      </main>
    </div>
  )
}

export default OrbSiege
