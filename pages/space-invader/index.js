import Head from 'next/head'
import Footer from '../../components/memory-game/Footer'
import styles from '../../styles/SpaceInvader.module.css'


const SpaceInvader = () => {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <Head>
          <title>Space Invader</title>
          <meta name="description" content="Super fun space invader game" />
          <link rel="icon" href="/favicon.svg" />
        </Head>
        <h1>Space Invader</h1>
      </main>
      <Footer />
    </div>
  )
}

export default SpaceInvader
