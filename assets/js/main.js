import { initContactToggle } from "./modules/contactToggle.js";
import { Carousel } from "./modules/carousel.js";
import { Comet } from "./modules/comet.js";
import { initDescription } from "./modules/description.js";
document.addEventListener("DOMContentLoaded", () => {
  initContactToggle();
  initDescription();
  new Carousel(".carousel");
  new Comet("cometCanvas");
});
