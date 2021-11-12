import { alertService } from '../../services'

let gridWidth = 15
let squares

let invaders
let invaderDirection
let invaderVelocity
let invaderMotionInterval
let invaderAcceleration = .85
let invadersDefeated

let score
let result
let playerPositionIndex

export const startGame = (squaresReference, scoreReference) => {
  squares = squaresReference.current.childNodes
  score = scoreReference.current

  clearInterval(invaderMotionInterval)
  squares.forEach(square => square.classList.remove('SpaceInvader_invader__3DPeZ', 'SpaceInvader_player__3dDGN', 'SpaceInvader_explosion__1XOKC'))
  invaders = [0,1,2,3,4,5,6,7,8,9,15,16,17,18,19,20,21,22,23,24,30,31,32,33,34,35,36,37,38,39]

  invaderVelocity = 400
  invaderDirection = 1
  invadersDefeated = []

  result = invadersDefeated.length
  score.textContent = result
  playerPositionIndex = 202

  invaders.forEach( invader => squares[invader].classList.add('SpaceInvader_invader__3DPeZ') )
  squares[playerPositionIndex].classList.add('SpaceInvader_player__3dDGN')

  invaderMotionInterval = setInterval(invaderMotion, invaderVelocity)

}

const invaderMotion = () => {
  const leftBorder = invaders[0] % gridWidth === 0
  const rightBorder = invaders[invaders.length - 1] % gridWidth === gridWidth -1
  if((leftBorder && invaderDirection === -1) || (rightBorder && invaderDirection === 1)) {
    invaderDirection = gridWidth
    clearInterval(invaderMotionInterval)
    invaderVelocity *= invaderAcceleration
    invaderMotionInterval = setInterval(invaderMotion, invaderVelocity)
  } else if (invaderDirection === gridWidth) {
    if(rightBorder) invaderDirection = -1
    else invaderDirection = 1
  }
  for (let i = 0; i < invaders.length; i++) {
    squares[invaders[i]].classList.remove('SpaceInvader_invader__3DPeZ')
    invaders[i] += invaderDirection
  }

  for (let i = 0; i < invaders.length; i++) {
    if (!invadersDefeated.includes(i)) squares[invaders[i]].classList.add('SpaceInvader_invader__3DPeZ')
  }

  if (squares[playerPositionIndex].classList.contains('SpaceInvader_invader__3DPeZ')) {
    squares[playerPositionIndex].classList.remove('SpaceInvader_invader__3DPeZ', 'SpaceInvader_player__3dDGN')
    squares[playerPositionIndex].classList.add('SpaceInvader_explosion__1XOKC')
    clearInterval(invaderMotionInterval)
    score.textContent = 'Game Over'
    alertService.success(`You <strong>lost</strong>!`, {autoClose: true, keepAfterRouteChange: false});
  }

  for (let i = 0; i < invaders.length; i++) {
    if (invaders[i] > (squares.length - (gridWidth - 1))) {
      clearInterval(invaderMotionInterval)
      score.textContent = 'Game Over'
      console.log("gameOver");
      alertService.success(`You <strong>lost</strong>!`, {autoClose: true, keepAfterRouteChange: false});
      break;
    }
  }

  if (invadersDefeated.length === invaders.length) {
    clearInterval(invaderMotionInterval)
    score.textContent = ' You Win'
    alertService.success(`You <strong>win</strong>!`, {autoClose: true, keepAfterRouteChange: false});
  }
}

export const playerMotionControls = (e) => {
  squares[playerPositionIndex].classList.remove('SpaceInvader_player__3dDGN')
  switch(e.keyCode) {
    case 37:
      if(playerPositionIndex % gridWidth !== 0) playerPositionIndex -= 1
      break;
    case 39:
      if(playerPositionIndex % gridWidth < gridWidth - 1) playerPositionIndex += 1
      break;
  }
  squares[playerPositionIndex].classList.add('SpaceInvader_player__3dDGN')
}

export const laserControl = (e) => {
  let laserMotionInterval
  let laserPositionIndex = playerPositionIndex

  const laserMotion = () => {
    squares[laserPositionIndex].classList.remove('SpaceInvader_laser__1x0Bk')
    laserPositionIndex -= gridWidth
    squares[laserPositionIndex].classList.add('SpaceInvader_laser__1x0Bk')
    if (squares[laserPositionIndex].classList.contains('SpaceInvader_invader__3DPeZ')) {
      squares[laserPositionIndex].classList.remove('SpaceInvader_invader__3DPeZ', 'SpaceInvader_laser__1x0Bk')
      squares[laserPositionIndex].classList.add('SpaceInvader_explosion__1XOKC')

      setTimeout(() => {
        squares[laserPositionIndex].classList.remove('SpaceInvader_explosion__1XOKC')
      }, 175)

      setTimeout(() => {
        squares[laserPositionIndex].classList.add('SpaceInvader_poof__35Bbq')
        setTimeout(() => {
          squares[laserPositionIndex].classList.remove('SpaceInvader_poof__35Bbq')
        }, 125)
      }, 125)

      clearInterval(laserMotionInterval)

      const invaderDefeated = invaders.indexOf(laserPositionIndex)
      invadersDefeated.push(invaderDefeated)

      result = invadersDefeated.length

      score.textContent = result

    }

    if (laserPositionIndex < gridWidth) {
      clearInterval(laserMotionInterval)
      setTimeout(() => squares[laserPositionIndex].classList.remove('SpaceInvader_laser__1x0Bk'), 100)
    }
  }

  switch(e.keyCode) {
    case 32:
      laserMotionInterval = setInterval(laserMotion, 100)
      break;
  }
}
