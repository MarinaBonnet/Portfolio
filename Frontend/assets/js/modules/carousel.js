export class Carousel {
  /**
   * Gère un carousel : navigation, swipe mobile, resize, etc.
   * @class
   */
  /**
   * Crée une instance de Carousel.
   * @param {string} selector - Le sélecteur CSS du carousel à initialiser.
   */

  constructor(selector) {
    /** @type {HTMLElement} Élément racine du carousel */
    this.root = document.querySelector(selector);

    /** @type {HTMLElement} Track contenant les cartes */
    this.track = this.root.querySelector(".carousel__track");

    /** @type {HTMLElement[]} Liste des cartes du carousel */
    this.cards = [...this.root.querySelectorAll(".project-card")];

    /** @type {HTMLElement|null} Bouton précédent */
    this.prevBtn = this.root.querySelector(".carousel__button--prev");

    /** @type {HTMLElement|null} Bouton suivant */
    this.nextBtn = this.root.querySelector(".carousel__button--next");

    /** @type {number} Index de la carte active */
    this.index = 0;

    this.bindEvents();
    this.update();

    window.addEventListener("resize", () => this.update());
  }

  /**
   * Met à jour la position de la track en fonction de l'index.
   */
  update() {
    const style = globalThis.getComputedStyle(this.track);
    const gap = Number.parseFloat(style.columnGap || style.gap || 0);
    const cardWidth = this.cards[0].getBoundingClientRect().width + gap;
    this.track.style.transform = `translateX(-${this.index * cardWidth}px)`;
  }

  /**
   * Passe à la carte suivante si possible.
   */
  next() {
    if (this.index < this.cards.length - 1) {
      this.index++;
      this.update();
    }
  }

  /**
   * Revient à la carte précédente si possible.
   */
  prev() {
    if (this.index > 0) {
      this.index--;
      this.update();
    }
  }

  /**
   * Attache les événements : clics flèches + swipe mobile.
   */
  bindEvents() {
    this.nextBtn?.addEventListener("click", () => this.next());
    this.prevBtn?.addEventListener("click", () => this.prev());

    let startX = 0;

    this.track.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX;
    });

    this.track.addEventListener("touchend", (e) => {
      const endX = e.changedTouches[0].clientX;

      if (endX < startX - 50) {
        this.next();
      } else if (endX > startX + 50) {
        this.prev();
      }
    });
  }
}
