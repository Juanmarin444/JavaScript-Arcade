// Assets
import { server } from '../../config'
import { useRef } from 'react'
import images from '../../public/images/index.js'
import styles from '../../styles/MemoryGame.module.css'
// Next Assets
import Head from 'next/head'
import Image from 'next/image'
// Components
import Footer from '../../components/memory-game/Footer'

const MemoryGame = ({ cardArray }) => {

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
      alert('You found a match')
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
      alert('Sorry, try again')
    }
    cardsChosen = []
    cardsChosenId = []
    resultDisplay.current.textContent = cardsWon.length
    if (cardsWon.length === cardArray.length/2) {
      resultDisplay.current.textContent = 'Congratulations you won!'
    }
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <Head>
          <title>Memory Game</title>
          <meta name="description" content="Super fun memory game" />
          <link rel="icon" href="/favicon.svg" />
        </Head>
        <h1>Memory Game</h1>
        <h3>Score: <span ref={resultDisplay}></span></h3>
        <div className={styles.grid}  ref={cards}>

          {cardArray.map((card, index) => (

            <Image key={index} src={images.blank} dataid={index} onClick={flipCard} alt='card' />

          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}

export const getStaticProps = async () => {
  const res = await fetch(`${server}/api/cards`)
  const cardArray = await res.json()

  return {
    props: {
      cardArray
    }
  }
}

export default MemoryGame
