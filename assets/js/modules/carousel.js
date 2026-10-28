export class Carousel {
  /**
   * Crée une instance du carousel.
   * @param {string} selector
   */
  constructor(selector) {
    this.root = document.querySelector(selector);

    if (!this.root) return;

    this.track = this.root.querySelector(".carousel__track");
    this.cards = [...this.root.querySelectorAll(".project-card")];
    this.prevBtn = this.root.querySelector(".carousel__button--prev");
    this.nextBtn = this.root.querySelector(".carousel__button--next");
    this.progress = this.root.querySelector(".carousel__progress");

    this.index = 0;

    if (!this.track || !this.cards.length) return;

    this.bindEvents();
    this.update();

    window.addEventListener("resize", () => this.update());
  }

  /**
   * Calcule les dimensions et le nombre de cartes visibles.
   */
  getMetrics() {
    const trackStyle = getComputedStyle(this.track);
    const rootStyle = getComputedStyle(this.root);

    const gap =
      Number.parseFloat(trackStyle.columnGap) ||
      Number.parseFloat(trackStyle.gap) ||
      0;

    const paddingLeft = Number.parseFloat(rootStyle.paddingLeft) || 0;
    const paddingRight = Number.parseFloat(rootStyle.paddingRight) || 0;

    const containerWidth = this.root.clientWidth - paddingLeft - paddingRight;

    const cardWidth = this.cards[0].getBoundingClientRect().width;

    const visibleCards = Math.min(
      this.cards.length,
      Math.max(1, Math.floor((containerWidth + gap) / (cardWidth + gap))),
    );

    const maxIndex = Math.max(0, this.cards.length - visibleCards);

    return { gap, cardWidth, maxIndex };
  }

  /**
   * Met à jour la position du carousel.
   */
  update() {
    if (!this.track || !this.cards.length) return;

    const { gap, cardWidth, maxIndex } = this.getMetrics();

    this.index = Math.max(0, Math.min(this.index, maxIndex));

    const offset = this.index * (cardWidth + gap);

    this.track.style.transform = `translateX(-${offset}px)`;

    if (this.progress) {
      this.progress.value = this.index + 1;
    }

    if (this.prevBtn) {
      this.prevBtn.disabled = this.index === 0;
    }

    if (this.nextBtn) {
      this.nextBtn.disabled = this.index >= maxIndex;
    }
  }

  /**
   * Passe aux projets suivants.
   */
  next() {
    if (!this.cards.length) return;

    const { maxIndex } = this.getMetrics();

    if (this.index < maxIndex) {
      this.index++;
      this.update();
    }
  }

  /**
   * Revient aux projets précédents.
   */
  prev() {
    if (this.index > 0) {
      this.index--;
      this.update();
    }
  }

  /**
   * Gère les clics et le swipe mobile.
   */
  bindEvents() {
    this.nextBtn?.addEventListener("click", () => this.next());
    this.prevBtn?.addEventListener("click", () => this.prev());

    let startX = 0;

    this.track.addEventListener(
      "touchstart",
      (event) => {
        startX = event.touches[0].clientX;
      },
      { passive: true },
    );

    this.track.addEventListener(
      "touchend",
      (event) => {
        const endX = event.changedTouches[0].clientX;
        const distance = endX - startX;

        if (distance < -50) {
          this.next();
        } else if (distance > 50) {
          this.prev();
        }
      },
      { passive: true },
    );
  }
}
