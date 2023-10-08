import anime from 'animejs/lib/anime.es.js'

const startButton = document.getElementById('start')
const promoHero = document.getElementById('promo-hero')
const promoHeroText = document.getElementById('promo-hero-text')

// Animations
anime({
  targets: startButton,
  translateY: [-2, 2],
  loop: true,
  direction: 'alternate',
  easing: 'easeInOutQuad',
  duration: 1000
})

anime({
  targets: promoHero,
  rotateY: {
    value: '360deg',
    easing: 'easeInOutQuad'
  },
  delay: 2000,
  loop: true,
  duration: 600,
  loopComplete: () => {
    const randomNumber = Math.floor(Math.random() * 20) + 1
    promoHeroText.innerText = randomNumber
  },
  direction: 'alternate'
})
