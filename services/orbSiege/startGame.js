import gsap from 'gsap'

let canvas, score, startGameBtn, uiModal, endScore, x, y, ctx, friction, player, projectiles, enemies, particles, animationId, enemySpawnInterval
let scoreValue = 0

class Player {
  constructor(x, y, radius, color) {
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
  }

  draw() {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    ctx.fillStyle = this.color
    ctx.fill()
  }
}

class Enemy {
  constructor(x, y, radius, color, velocity) {
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
    this.velocity = velocity
  }

  draw() {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    ctx.fillStyle = this.color
    ctx.fill()
  }

  update() {
    this.draw()
    this.x = this.x + this.velocity.x
    this.y = this.y + this.velocity.y
  }
}

class Particle {
  constructor(x, y, radius, color, velocity) {
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
    this.velocity = velocity
    this.alpha = 1
  }

  draw() {
    ctx.save()
    ctx.globalAlpha = this.alpha
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    ctx.fillStyle = this.color
    ctx.fill()
    ctx.restore()
  }

  update() {
    this.draw()
    this.velocity.x *= friction
    this.velocity.y *= friction
    this.x = this.x + this.velocity.x
    this.y = this.y + this.velocity.y
    this.alpha -= 0.01
  }
}

class Projectile {
  constructor(x, y, radius, color, velocity) {
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
    this.velocity = velocity
  }

  draw() {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    ctx.fillStyle = this.color
    ctx.fill()
  }

  update() {
    this.draw()
    this.x = this.x + this.velocity.x
    this.y = this.y + this.velocity.y
  }
}

const init = () => {
  player = new Player(x, y, 10, 'white')
  projectiles = []
  enemies = []
  particles = []
  scoreValue = 0
  score.textContent = scoreValue
}

const spawnEnemies = () => {
  enemySpawnInterval = setInterval(() => {
    const radius = Math.random() * (40 - 5) + 5
    let enemyX, enemyY
    if (Math.random() < .5) {
      enemyX = Math.random() < .5 ? 0 - radius : canvas.width + radius
      enemyY = Math.random() * canvas.height
    } else {
      enemyX = Math.random() * canvas.width
      enemyY = Math.random() < .5 ? 0 - radius : canvas.height + radius
    }
    const color = `hsl(${Math.random() * 360}, 50%, 50%)`
    const angle = Math.atan2(y - enemyY, x - enemyX)
    const velocity = {
      x: Math.cos(angle),
      y: Math.sin(angle)
    }

    enemies.push(new Enemy(enemyX, enemyY, radius, color, velocity))
  }, 1000)
}

const animate = () => {
  animationId = requestAnimationFrame(animate)
  ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  player.draw()

  particles.forEach((particle, index) => {
    if (particle.alpha <= 0) {
      particles.splice(index, 1)
    } else {
      particle.update()
    }
  })

  projectiles.forEach((projectile, index) => {
    projectile.update()

    if (
      projectile.x + projectile.radius < 0 ||
      projectile.x - projectile.radius > canvas.width ||
      projectile.y + projectile.radius < 0 ||
      projectile.y - projectile.radius > canvas.height
    ) {
      setTimeout(() => {
        projectiles.splice(index, 1)
      }, 0)
    }
  })

  enemies.forEach((enemy, enemyIdx) => {
    enemy.update()

    const distance = Math.hypot(player.x - enemy.x, player.y - enemy.y)
    if (distance - enemy.radius - player.radius < 1) {
      clearInterval(enemySpawnInterval)
      cancelAnimationFrame(animationId)
      uiModal.style.display = 'flex'
      endScore.textContent = scoreValue
    }


    projectiles.forEach((projectile, projectileIdx) => {
      const distance = Math.hypot(projectile.x - enemy.x, projectile.y - enemy.y)

      if (distance - enemy.radius - projectile.radius < 1) {

        for (let i = 0; i < enemy.radius * 2; i++) {
          particles.push(new Particle(
            projectile.x,
            projectile.y,
            Math.random() * 2,
            enemy.color,
            {
              x: (Math.random() - .5) * (Math.random() * 5),
              y: (Math.random() - .5) * (Math.random() * 5)
            }
          ))
        }

        if (enemy.radius - 10 > 5) {
          scoreValue += 100
          score.textContent = scoreValue
          gsap.to(enemy, {
            radius: enemy.radius - 10
          })
          setTimeout(() => {
            projectiles.splice(projectileIdx, 1)
          }, 0)
        } else {
          scoreValue += 200
          score.textContent = scoreValue

          setTimeout(() => {
            enemies.splice(enemyIdx, 1)
            projectiles.splice(projectileIdx, 1)
          }, 0)
        }
      }
    })
  })
}

export const shoot = (event) => {
  const angle = Math.atan2(event.clientY - y, event.clientX - x)
  const velocity = {
    x: Math.cos(angle) * 5,
    y: Math.sin(angle) * 5
  }

  projectiles.push(new Projectile(x, y, 5, 'white', velocity))
}

export const startGame = (canvasRef, scoreRef, uiModalRef, endScoreRef) => {
  canvas = canvasRef.current
  canvas.width = innerHeight*.6
  canvas.height = innerHeight*.6
  score = scoreRef.current
  uiModal = uiModalRef.current
  endScore = endScoreRef.current
  ctx = canvas.getContext('2d')
  friction = 0.99

  x = canvas.width / 2
  y = canvas.height / 2

  init()
  animate()
  spawnEnemies()
  uiModal.style.display = 'none'
}
