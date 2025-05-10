const username = localStorage.getItem("currentUser");
if (!username) {
  window.location.href = "index.html";
}

function renderBasket() {
  const allBaskets = JSON.parse(localStorage.getItem("baskets") || "[]");
  const myBaskets = allBaskets.filter(o => o.username === username);
  const container = document.getElementById("order-list");
  container.innerHTML = "";

  if (myBaskets.length === 0) {
    container.textContent = "Корзина пуста.";
    return;
  }

  myBaskets.forEach(o => {
    const item = document.createElement("div");
    item.className = "order-item";
    item.dataset.date = o.date;

    const dateStr = new Date(o.date).toLocaleString("ru", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });

    item.innerHTML = `
      <img src="${o.imageCar}" alt="${o.title}" id="order-image">
      <div class="info">
        <div class="aboutCar">
          <h3>${o.title}</h3>
          <p>Комплектация: ${o.configuration}</p>
          <p>Диски: ${o.wheel}</p>
          <p>Доп. опции: ${o.options.join(", ") || "—"}</p>
          <p>Дата заказа: ${dateStr}</p>
        </div>
        <div class="priceCar">
          <p>${o.price}</p>
          <!-- убрали id, оставили только класс -->
          <button class="buyNow">Купить сейчас</button>
        </div>
      </div>
    `;
    container.append(item);
  });
}

document.getElementById("order-list").addEventListener("click", e => {
  if (!e.target.classList.contains("buyNow")) return;

  const orderItem = e.target.closest(".order-item");
  const orderDate = orderItem.dataset.date;

  let allBaskets = JSON.parse(localStorage.getItem("baskets") || "[]");
  const idx = allBaskets.findIndex(o =>
    o.username === username && o.date === orderDate
  );
  if (idx === -1) return;

  const [movedOrder] = allBaskets.splice(idx, 1);
  localStorage.setItem("baskets", JSON.stringify(allBaskets));

  let allOrders = JSON.parse(localStorage.getItem("orders") || "[]");
  allOrders.push(movedOrder);
  localStorage.setItem("orders", JSON.stringify(allOrders));

  renderBasket();
});

renderBasket();
