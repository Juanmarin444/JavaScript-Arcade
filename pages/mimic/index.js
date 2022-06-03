import { useRef, useState, useEffect } from 'react'
import stylesMemory from '../../styles/MemoryGame.module.css'
import styles from '../../styles/Mimic.module.css'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Footer from '../../components/Footer'

import { runGame } from '../../services/mimic/game'

const Mimic = () => {
    const gameRef = useRef(null);
    const containerRef = useRef(null);
    useEffect(() => {
        runGame(containerRef);
    })
    return (
        <div className={stylesMemory.container} ref={containerRef}>
            <Head>
                <title>Mimic</title>
                <meta name="description" content="Test your short term memory with mimic" />
                <link rel="icon" href="/favicon.svg" />
            </Head>
            <main className={styles.main}>
                <h1 className={styles.mimicFont}>Mimic</h1>
                <h3 className={styles.mimicFont}>Press Any Key to <span className={stylesMemory.accent}>Start</span></h3>
                <div className={styles.game} ref={gameRef}>
                    <div id="red" className={`${styles.btn} ${styles.red}`}></div>
                    <div id="green" className={`${styles.btn} ${styles.green}`}></div>
                    <div id="blue" className={`${styles.btn} ${styles.blue}`}></div>
                    <div id="yellow" className={`${styles.btn} ${styles.yellow}`}></div>
                </div>
            </main>
            <Footer />
        </div>
    )
}

export default Mimic