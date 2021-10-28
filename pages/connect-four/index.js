import { useRef, useEffect, useState } from 'react'
import Head from 'next/head'
import Footer from '../../components/Footer'
import styles from '../../styles/ConnectFour.module.css'
import Link from 'next/link'

// Alert Messages
import { alertService } from '../../services'
import { Alert } from '../../components/alert';

const ConnectFour = ({props}) => {

  const [ isRunning, setIsRunning ] = useState(false);

  const squaresRef = useRef(null)
  const resultRef = useRef(null)
  const currentPlayerRef = useRef(null)

  useEffect(() => {
    if (isRunning) {
      startGame();
    }
  });

  const startButtonHandler = () => {
    setIsRunning(true)
  }

  const startGame = () => {

    const squares = squaresRef.current.childNodes;
    const result = resultRef.current;
    const currentPlayer = currentPlayerRef.current;
    let player = 1;

    for (var i = 0; i < squares.length; i++) (
      function(index) {

        squares[i].onclick = function() {
          if (squares[index + 7]) {
            if (squares[index + 7].classList.contains('ConnectFour_taken__2rwDL') && squares[index].classList.contains('ConnectFour_playable__zZbqW')) {
              if (player === 1) {
                squares[index].classList.replace('ConnectFour_playable__zZbqW', 'ConnectFour_taken__2rwDL');
                squares[index].classList.add('ConnectFour_playerOne__3_wbE');
                player = 2
                currentPlayer.innerHTML = player

                if (result.innerHTML.length === 0) {
                  checkBoard(squares, result)
                }
              } else if (player === 2) {
                squares[index].classList.replace('ConnectFour_playable__zZbqW', 'ConnectFour_taken__2rwDL')
                squares[index].classList.add('ConnectFour_playerTwo__1xcjw')
                player = 1
                currentPlayer.innerHTML = player

                if (result.innerHTML.length === 0) {
                  checkBoard(squares, result)
                }
              }
            } else {
              alertService.success(`Can't place <strong>tokens</strong> here!`, {autoClose: true, keepAfterRouteChange: false});
            }
          } else {
            alertService.success(`<strong>Jiggling</strong> the game board is not permitted!`, {autoClose: true, keepAfterRouteChange: false});
          }
        }
      }
    )(i)


  }

  const checkBoard = (squares, result) => {
    const winningCombinations = [
      [0, 1, 2, 3],
      [41, 40, 39, 38],
      [7, 8, 9, 10],
      [34, 33, 32, 31],
      [14, 15, 16, 17],
      [27, 26, 25, 24],
      [21, 22, 23, 24],
      [20, 19, 18, 17],
      [28, 29, 30, 31],
      [13, 12, 11, 10],
      [35, 36, 37, 38],
      [6, 5, 4, 3],
      [0, 7, 14, 21],
      [41, 34, 27, 20],
      [1, 8, 15, 22],
      [40, 33, 26, 19],
      [2, 9, 16, 23],
      [39, 32, 25, 18],
      [3, 10, 17, 24],
      [38, 31, 24, 17],
      [4, 11, 18, 25],
      [37, 30, 23, 16],
      [5, 12, 19, 26],
      [36, 29, 22, 15],
      [6, 13, 20, 27],
      [35, 28, 21, 14],
      [0, 8, 16, 24],
      [41, 33, 25, 17],
      [7, 15, 23, 31],
      [34, 26, 18, 10],
      [14, 22, 30, 38],
      [27, 19, 11, 3],
      [35, 29, 23, 17],
      [6, 12, 18, 24],
      [28, 22, 16, 10],
      [13, 19, 25, 31],
      [21, 15, 9, 3],
      [20, 26, 32, 38],
      [36, 30, 24, 18],
      [5, 11, 17, 23],
      [37, 31, 25, 19],
      [4, 10, 16, 22],
      [2, 10, 18, 26],
      [39, 31, 23, 15],
      [1, 9, 17, 25],
      [40, 32, 24, 16],
      [9, 17, 25, 33],
      [8, 16, 24, 32],
      [11, 17, 23, 29],
      [12, 18, 24, 30],
      [1, 2, 3, 4],
      [5, 4, 3, 2],
      [8, 9, 10, 11],
      [12, 11, 10, 9],
      [15, 16, 17, 18],
      [19, 18, 17, 16],
      [22, 23, 24, 25],
      [26, 25, 24, 23],
      [29, 30, 31, 32],
      [33, 32, 31, 30],
      [36, 37, 38, 39],
      [40, 39, 38, 37],
      [7, 14, 21, 28],
      [8, 15, 22, 29],
      [9, 16, 23, 30],
      [10, 17, 24, 31],
      [11, 18, 25, 32],
      [12, 19, 26, 33],
      [13, 20, 27, 34],
    ]
    for(let y = 0; y < winningCombinations.length; y++) {
      const square1 = squares[winningCombinations[y][0]]
      const square2 = squares[winningCombinations[y][1]]
      const square3 = squares[winningCombinations[y][2]]
      const square4 = squares[winningCombinations[y][3]]

      if (square1.classList.contains('ConnectFour_playerOne__3_wbE') &&
        square2.classList.contains('ConnectFour_playerOne__3_wbE') &&
        square3.classList.contains('ConnectFour_playerOne__3_wbE') &&
        square4.classList.contains('ConnectFour_playerOne__3_wbE')) {

        result.innerHTML = `Player <strong class=${styles.accent}>One</strong> Wins!`;
      }
      else if (square1.classList.contains('ConnectFour_playerTwo__1xcjw') &&
        square2.classList.contains('ConnectFour_playerTwo__1xcjw') &&
        square3.classList.contains('ConnectFour_playerTwo__1xcjw') &&
        square4.classList.contains('ConnectFour_playerTwo__1xcjw')) {

        result.innerHTML = `Player <strong class=${styles.accent}>Two</strong> Wins!`;
      }
    }
  }

  const releaseGamePieces = () => {
    setIsRunning(false)
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Connect-Four</title>
        <meta name="description" content="play connect-four with your friends" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <main className={styles.main}>
        <h1>Connect-<span className={styles.accent}>Four</span></h1>
        <div className={styles.nav}>
          <div className={styles.start} onClick={startButtonHandler}>
            Start
          </div>
          <Link href='/' passHref>
            <div className={styles.start}>
              Go back
            </div>
          </Link>
        </div>
        {isRunning ? <div className={styles.gameBoard}>
          <h3>Current Player: Player<span id="current-player" ref={currentPlayerRef}>1</span></h3>
          <h3 id="result" ref={resultRef}></h3>
          <div className={styles.grid} ref={squaresRef}>
            {[...Array(49).keys()].map((index) => ( index >= 42 ?
              <div key={index} className={`${styles.taken} ${styles.bottom}`}></div>
            :
            <div key={index} className={styles.playable}></div>
            ))}
          </div>
          <h3>Release the game pieces below</h3>
          <div className = {styles.start} onClick={releaseGamePieces}>Release</div>
        </div> : <><h3>Press Start</h3></>}
        <div className={styles.alertContainer}>
          <Alert />
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default ConnectFour
