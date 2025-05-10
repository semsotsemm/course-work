const contactsLink = document.getElementById("contacts-link");
const modal = document.getElementById("contacts-modal");
const btnClose = modal.querySelector(".modal__close");

contactsLink.addEventListener("click", function (e) {
  e.preventDefault();
  modal.style.display = "flex";
});

btnClose.addEventListener("click", function () {
  modal.style.display = "none";
});

modal.addEventListener("click", function (e) {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

const logoBtn = document.querySelector(".brand-logo");
const navList = document.getElementById("nav-list");
logoBtn.addEventListener("click", () => {
  if (window.innerWidth <= 1300) navList.classList.toggle("show");
});
document.addEventListener("click", (e) => {
  if (
    window.innerWidth <= 1300 &&
    navList.classList.contains("show") &&
    !e.target.closest(".brand-logo") &&
    !e.target.closest(".nav-list")
  ) {
    navList.classList.remove("show");
  }
});
