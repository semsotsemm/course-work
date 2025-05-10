let username = localStorage.getItem("currentUser");
if (!username) {
  window.location.href = "index.html";
}

const usernameInput = document.getElementById("usernameInput");
const emailInput    = document.getElementById("emailInput");
const passwordInput = document.getElementById("passwordInput");
const togglePwdBtn  = document.getElementById("togglePassword");
const saveBtn       = document.getElementById("saveProfile");

window.addEventListener("DOMContentLoaded", () => {
  usernameInput.value = localStorage.getItem("currentUser") || "";
  emailInput.value    = localStorage.getItem("currentEmail") || "";
  passwordInput.value = localStorage.getItem("currentPass")  || "";
});

togglePwdBtn.addEventListener("click", () => {
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    togglePwdBtn.innerHTML = '<img src="img/eye-icon.png" alt="Скрыть">';
  } else {
    passwordInput.type = "password";
    togglePwdBtn.innerHTML = '<img src="img/eye-slash-icon.png" alt="Показать">';
  }
});

saveBtn.addEventListener("click", () => {
  const newName  = usernameInput.value.trim();
  const newEmail = emailInput.value.trim();
  const newPass  = passwordInput.value;
  if (!newName) {
    alert("Имя не может быть пустым.");
    return;
  }
  localStorage.setItem("currentUser",  newName);
  localStorage.setItem("currentEmail", newEmail);
  localStorage.setItem("currentPass",  newPass);
  username = newName;
  alert("Профиль сохранён.");
});

(function renderOrderHistory() {
  const allOrders = JSON.parse(localStorage.getItem("orders") || "[]");
  const myOrders  = allOrders.filter(o => o.username === username);
  const container = document.getElementById("order-list");
  container.innerHTML = "";

  if (myOrders.length === 0) {
    container.textContent = "У вас пока нет заказов.";
    return;
  }

  myOrders.forEach(o => {
    const item = document.createElement("div");
    item.className = "order-item";

    const dateStr = new Date(o.date).toLocaleString("ru", {
      day: "2-digit", month: "2-digit", year: "numeric",
      hour: "2-digit", minute: "2-digit"
    });

    item.innerHTML = `
      <img src="${o.imageCar}" alt="${o.title}" id="order-image" />
      <div class="aboutCar">
        <h3>${o.title}</h3>
        <p>Комплектация: ${o.configuration}</p>
        <p>Диски: ${o.wheel}</p>
        <p>Доп. опции: ${o.options.join(", ") || "—"}</p>
        <p>Цена: ${o.price}</p>
        <p>Дата заказа: ${dateStr}</p>
      </div>
    `;
    container.append(item);
  });
})();