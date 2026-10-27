// --- CONTACT TOGGLE ---
export function initContactToggle() {
  const contact = document.querySelector(".contact");
  const toggle = document.querySelector(".contact__toggle");

  if (!contact || !toggle) return;

  toggle.setAttribute("aria-expanded", "false");

  toggle.addEventListener("click", () => {
    const isOpen = contact.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });
}
