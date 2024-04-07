document.addEventListener("DOMContentLoaded", function () {
  const carousel = document.getElementById("carousel");
  const items = carousel.querySelectorAll(".carousel-item");
  let currentIndex = 0;
  let intervalId = setInterval(() => navigateCarousel(1), 30000); // Iniciar automaticamente

  function updateCarousel() {
    items.forEach((item, i) => {
      item.setAttribute("aria-hidden", i !== currentIndex);
      if (i === currentIndex) {
        item.focus(); // Acessibilidade
        announceNews(i);
      }
    });
  }

  function navigateCarousel(direction) {
    currentIndex = (currentIndex + direction + items.length) % items.length;
    updateCarousel();
  }

  function announceNews(index) {
    const { innerText: title } = items[index].querySelector('h2');
    const { innerText: content } = items[index].querySelector('p');
    document.getElementById("live-region").innerText = `Nova Notícia: ${title}. ${content}`;
  }

  document.querySelector(".prev-btn").addEventListener("click", () => navigateCarousel(-1));
  document.querySelector(".next-btn").addEventListener("click", () => navigateCarousel(1));
  document.querySelector(".stop-btn").addEventListener("click", () => clearInterval(intervalId));

  document.addEventListener("keydown", (event) => {
    if (["ArrowLeft", "ArrowUp"].includes(event.key)) navigateCarousel(-1);
    if (["ArrowRight", "ArrowDown"].includes(event.key)) navigateCarousel(1);
  });

  updateCarousel(); // Inicializa o carrossel
});