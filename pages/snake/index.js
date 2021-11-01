import Head from 'next/head'
import Footer from '../../components/Footer'
import styles from '../../styles/Snake.module.css'
import Link from 'next/link'


const Snake = ({props}) => {
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
          <Link href='/' passHref>
            <div className={styles.start}>
              Go back
            </div>
          </Link>
        </div>
        <div className={styles.grid}>
          {[...Array(400).keys()].map(index => <div key={index}></div>)}
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Snake
