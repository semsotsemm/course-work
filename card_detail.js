document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".fleet__card");
  if (!cards.length) {
    console.warn("Не найдены карточки .fleet__card");
    return;
  }

  cards.forEach((card) => {
    const id = card.dataset.id;
    if (!id) {
      console.warn("У карточки отсутствует data-id:", card);
      return;
    }

    card.style.cursor = "pointer";

    card.addEventListener("click", () => {
      const targetUrl = `buy_car.html?id=${encodeURIComponent(id)}`;
      window.location.href = targetUrl;
    });
  });
});
