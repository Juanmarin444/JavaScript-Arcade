import Head from 'next/head'
import Footer from '../../components/Footer'
import styles from '../../styles/SpaceInvader.module.css'
import Link from 'next/link'


const SpaceInvader = ({props}) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Space Invader</title>
        <meta name="description" content="Super fun space invader game" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <main className={styles.main}>
        <h1>Space <span className={styles.accent}>Invaders</span></h1>
        <p className={styles.description}>Coming Soon!</p>
        <div className={styles.nav}>
          <Link href='/' passHref>
            <div className={styles.start}>
              Go back
            </div>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default SpaceInvader
