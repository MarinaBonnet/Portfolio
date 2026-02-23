import { initContactToggle } from "./modules/contactToggle.js";
import { Carousel } from "./modules/carousel.js";
import { Comet } from "./modules/comet.js";

document.addEventListener("DOMContentLoaded", () => {
  initContactToggle();
  new Carousel(".carousel");
  new Comet("cometCanvas");
});
