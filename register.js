// Функция регистрации нового пользователя
function register() {
  const username = document.getElementById("regUsername").value.trim();
  const password = document.getElementById("regPassword").value;

  if (!username || !password) {
    alert("Введите имя пользователя и пароль");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];
  if (users.find((u) => u.username === username)) {
    alert("Пользователь с таким именем уже существует");
    return;
  }

  users.push({ username, password });
  localStorage.setItem("users", JSON.stringify(users));
  alert("Регистрация успешна!");
}

// Функция входа пользователя
function login() {
  const username = document.getElementById("loginUsername").value.trim();
  const password = document.getElementById("loginPassword").value;

  let users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  const msg = document.getElementById("message");
  if (user) {
    msg.textContent = "Вход выполнен успешно! Перенаправление...";
    msg.style.color = "lightgreen";

    // Сохраняем имя пользователя в localStorage
    localStorage.setItem("currentUser", username);
    localStorage.setItem("currentPass", password);

    setTimeout(() => {
      window.location.href = "main.html";
    }, 1000);
  } else {
    msg.textContent = "Неверное имя пользователя или пароль.";
    msg.style.color = "salmon";
  }
}

// Анимация кнопок
var animateButton = function (e) {
  e.preventDefault();
  e.target.classList.remove("animate");
  e.target.classList.add("animate");
  setTimeout(function () {
    e.target.classList.remove("animate");
  }, 700);
};

var bubblyButtons = document.getElementsByClassName("bubbly-button");
for (var i = 0; i < bubblyButtons.length; i++) {
  bubblyButtons[i].addEventListener("click", animateButton, false);
}
