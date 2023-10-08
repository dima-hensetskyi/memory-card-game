import anime from 'animejs/lib/anime.es.js';

const modal = document.getElementById('modal-window');
const modalTitle = document.getElementById('modal-window-title');
const modalDescription = document.getElementById('modal-window-description');

class Modal {
    set isOpen({ val, description, isUserWon }) {
        if (val) {
            anime({
                targets: modal,
                opacity: [0, 1],
                duration: 500,
                easing: 'easeInOutQuad',
                begin: function () {
                    if (description) modalDescription.innerHTML = description;
                    modalTitle.innerHTML = isUserWon
                        ? 'You Won!'
                        : "Time's Up!";
                    modal.classList.remove('hide');
                },
            });
        } else {
            anime({
                targets: modal,
                opacity: [1, 0],
                duration: 200,
                easing: 'easeInOutQuad',
                complete: function () {
                    modal.classList.add('hide');
                    modalDescription.innerHTML = '';
                },
            });
        }
        this._isOpen = val;
    }

    get isOpen() {
        return this._isOpen;
    }
}

const currentModal = new Modal();

export { Modal, currentModal };
