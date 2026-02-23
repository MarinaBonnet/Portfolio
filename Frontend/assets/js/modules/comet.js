export class Comet {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext("2d");

    this.stars = [];
    this.colors = ["#f7aef8", "#b388eb", "#8093f1"];

    this.starsCountMobile = 15;
    this.starsCountDesktop = 35;

    this.resize();
    window.addEventListener("resize", () => this.resize());

    this.init();
    this.animate();
  }
  resize() {
    this.canvas.width = this.canvas.offsetWidth;
    this.canvas.height = this.canvas.offsetHeight;

    this.isDesktop = window.innerWidth >= 768;
    this.starsCount = this.isDesktop
      ? this.starsCountDesktop
      : this.starsCountMobile;
  }

  init() {
    this.stars = [];

    for (let i = 0; i < this.starsCount; i++) {
      this.stars.push({
        x: Math.random() * this.canvas.width,
        y: Math.pow(Math.random(), 1.5) * this.canvas.height,
        size: Math.random() * 2 + 1,
        speed: Math.random() * 0.6 + 0.2,
        opacity: Math.random(),
        color: this.colors[Math.floor(Math.random() * this.colors.length)],
        twinkleSpeed: Math.random() * 0.02 + 0.01,
      });
    }
  }

  drawNebula() {
    const g = this.ctx.createRadialGradient(
      this.canvas.width * 0.3,
      this.canvas.height * 0.5,
      20,
      this.canvas.width * 0.5,
      this.canvas.height * 0.5,
      this.canvas.width * 0.8,
    );
    g.addColorStop(0, "rgba(247, 174, 248, 0.25)");
    g.addColorStop(1, "rgba(179,136,235,0)");

    this.ctx.fillStyle = g;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  updateStars() {
    this.stars.forEach((star) => {
      //Scintillement doux
      star.opacity += star.twinkleSpeed * (Math.random() > 0.5 ? 1 : -1);
      star.opacity = Math.max(0.2, Math.min(1, star.opacity));

      //Mouvement
      star.x += star.speed;
      if (star.x > this.canvas.width + 20) star.x = -20;
    });
  }

  drawStars() {
    this.stars.forEach((star) => {
      this.ctx.globalAlpha = star.opacity;
      this.ctx.fillStyle = star.color;
      this.ctx.beginPath();
      this.ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      this.ctx.fill();
    });
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawNebula();
    this.updateStars();
    this.drawStars();

    requestAnimationFrame(() => this.animate());
  }
}
// --- INITIALISATION ---

const comet = new Comet("cometCanvas");
