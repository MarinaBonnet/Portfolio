// --- CONTACT TOGGLE ---
export function initContactToggle() {
  const contact = document.querySelector(".contact");
  const toggle = document.querySelector(".contact__toggle");

  if (!contact || !toggle) return;

  toggle.addEventListener("click", () => {
    contact.classList.toggle("open");
  });
}
