import anime from 'animejs/lib/anime.es.js'

class Card {
  constructor (idx, listIdx, container) {
    this._idx = idx
    this.listIdx = listIdx
    this.flipped = false
    this.matched = false
    this.node = container
  }

  get idx () {
    return this._idx
  }

  set idx (newIdx) {
    this._idx = newIdx
  }

  set flipped (val) {
    this.isFlipped = val
    if (this.node) {
      anime({
        targets: this.node,
        rotateY: {
          value: '+=180',
          easing: 'easeInOutSine'
        },
        duration: 200,
        begin: () => {
          if (val) {
            this.render()
            this.node.classList.add('card-flipped')
          }
        },
        complete: () => {
          if (!val) {
            this.render()
            this.node.classList.remove('card-flipped')
          }
        }
      })
    }
  }

  render () {
    this.node.innerHTML = `
        <div class="card-before">?</div>
        <div class="card-after">${
          ((this.isFlipped || this.matched) && this._idx) || ''
        }</div>
        `
  }

  generate () {
    this.render()
    this.node.className = 'card-container'
    this.node.setAttribute('data-cell-idx', this.listIdx)
    return this.node
  }
}

export { Card }
