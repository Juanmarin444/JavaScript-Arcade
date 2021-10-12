// Assets
// import { server } from '../../config'
import { useRef, useState } from 'react'
import images from '../../public/images/index.js'
import styles from '../../styles/MemoryGame.module.css'
import { alertService } from '../../services'

import { cardArray } from '../../data'

// Next Assets
import Head from 'next/head'
import Image from 'next/image'
// Components
import { Alert } from '../../components/alert';
import Footer from '../../components/Footer'

const MemoryGame = () => {
  const [score, setScore] = useState(0)

  console.log('my_cardArray - ', cardArray);
  // console.log('My_images - ', images);

  cardArray.sort(() => 0.5 - Math.random())
  const cards = useRef(null)
  const resultDisplay = useRef(null)

  var cardsChosen = []
  var cardsChosenId = []
  var cardsWon = []

  const flipCard = (e) => {
    e.preventDefault();

    const cardId = e.target.getAttribute("dataid");

    cardsChosen.push(cardArray[cardId].name)
    cardsChosenId.push(cardId)

    e.target.src = cardArray[cardId].img.src
    e.target.srcset = cardArray[cardId].img.src
    if (cardsChosen.length === 2) {
      setTimeout(checkForMatch, 500)
    }
  }

  function checkForMatch() {
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
    }
    cardsChosen = []
    cardsChosenId = []
    resultDisplay.current.textContent = cardsWon.length
    if (cardsWon.length === cardArray.length/2) {
      alertService.success(`Congratulations you <strong>won</strong>! `, {autoClose: true, keepAfterRouteChange: false});
      resultDisplay.current.textContent = 'Congratulations you won!'
    }
  }

  const restart = () => {
    setScore(1);
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
        <button onClick={restart}>Restart</button>
        <div className={styles.grid}  ref={cards}>
          {cardArray.map((card, index) => (
            <Image key={index} src={images.blank} dataid={index} onClick={flipCard} alt='card' />
          ))}
        </div>
        <div className={styles.alertContainer}>
          <Alert />
        </div>
      </main>
      <Footer />
    </div>
  )
}

// export const getStaticProps = async () => {
//
//   console.log('ServeR: ', server);
//
//   const res = await fetch(`${server}/api/cards`)
//   const cardArrayCall = await res.json()
//
//   return {
//     props: {cardArrayCall}
//   }
// }

export default MemoryGame
