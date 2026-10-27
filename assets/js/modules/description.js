export function initDescription() {
  const buttons = document.querySelectorAll(".project-card__toggle");
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const paragraphe = button.previousElementSibling;
      const isOpen = paragraphe.classList.toggle("is-expanded");
      button.textContent = isOpen ? "Réduire" : "Lire la suite";
      button.setAttribute("aria-expanded", isOpen);
    });
  });
}
