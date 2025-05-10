// card_detail.js
// При клике на карточку автомобиля перенаправляем на страницу деталей с передачей id по URL

document.addEventListener("DOMContentLoaded", () => {
  // Находим все карточки
  const cards = document.querySelectorAll(".fleet__card");
  if (!cards.length) {
    console.warn("Не найдены карточки .fleet__card");
    return;
  }

  cards.forEach((card) => {
    // Получаем уникальный идентификатор из data-id
    const id = card.dataset.id;
    if (!id) {
      console.warn("У карточки отсутствует data-id:", card);
      return;
    }

    // Меняем курсор для наглядности
    card.style.cursor = "pointer";

    // При клике — переходим на страницу деталей
    card.addEventListener("click", () => {
      const targetUrl = `buy_car.html?id=${encodeURIComponent(id)}`;
      window.location.href = targetUrl;
    });
  });
});
