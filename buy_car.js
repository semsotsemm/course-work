document.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(window.location.search);
  const carId = params.get("id");
  if (!carId) return console.error("Не указан id машины в URL");

  try {
    const resp = await fetch("cars.json");
    if (!resp.ok) throw new Error("cars.json не найден");
    const cars = await resp.json();
    const car = cars.find((c) => c.id === carId);
    if (!car) return console.error(`Машина с id="${carId}" не найдена`);

    const imgEl = document.getElementById("product-image");
    const titleEl = document.getElementById("product-title");
    const priceEl = document.getElementById("product-price");
    const descEl = document.getElementById("product-description");
    const cfgWrp = document.getElementById("configurations");
    const bodyWrp = document.getElementById("body-colors");
    const intWrp = document.getElementById("interior-colors");
    const wheelsWrp = document.getElementById("wheels");
    const optionsForm = document.getElementById("options-form");
    const baseSpan = document.getElementById("product-price1");
    const addSpan = document.getElementById("add-price");
    const fullSpan = document.getElementById("full-price");

    imgEl.src = car.img;
    imgEl.alt = car.brand;
    titleEl.textContent = car.brand;
    priceEl.textContent = `$${car.priceMin.toLocaleString("ru")}.00`;
    descEl.textContent = car.description;

    [cfgWrp, bodyWrp, intWrp, wheelsWrp, optionsForm].forEach(
      (el) => (el.innerHTML = "")
    );

    car.configurations.forEach((cfg, i) => {
      const div = document.createElement("div");
      div.className = "option-item";
      div.textContent = cfg.name;
      div.dataset.price = cfg.price;
      if (i === 1) div.classList.add("active");
      cfgWrp.append(div);
    });

    car.bodyColors.forEach((c, i) => {
      const swatch_cont = document.createElement("div");
      swatch_cont.className = "color-swatch-container";
      const swatch = document.createElement("div");
      swatch.className = "color-swatch";
      if (i === 0) swatch_cont.classList.add("active");
      swatch.style.backgroundColor = c.hex;
      const label = document.createElement("span");
      label.textContent = c.name;
      swatch_cont.append(swatch);
      swatch.append(label);
      bodyWrp.append(swatch_cont);
    });

    car.interiorColors.forEach((c, i) => {
      const swatch_cont = document.createElement("div");
      swatch_cont.className = "color-swatch-container";
      const swatch = document.createElement("div");
      swatch.className = "color-swatch";
      swatch.style.backgroundColor = c.hex;
      const label = document.createElement("span");
      label.textContent = c.name;
      if (i === 0) swatch_cont.classList.add("active");
      swatch_cont.append(swatch);
      swatch.append(label);
      intWrp.append(swatch_cont);
    });

    car.wheels.forEach((w, i) => {
      const div = document.createElement("div");
      div.className = "wheel-option";
      div.dataset.price = w.price;
      if (i === 0) div.classList.add("active");
      div.innerHTML = `
        <div class="wheel-card">
          <div class="wheel-image">
            <img src="${w.img}" alt="${w.name}">
          </div>
          <span>${w.name}</span>
        </div>`;
      wheelsWrp.append(div);
    });

    car.options.forEach((opt) => {
      const lbl = document.createElement("label");
      lbl.className = "option-item";
      lbl.innerHTML = `<input type="checkbox" data-price="${opt.price}">${
        opt.name
      } (+$${opt.price.toLocaleString("ru")})<br>`;
      optionsForm.append(lbl);
    });

    function recalc() {
      const cfgEl = cfgWrp.querySelector(".option-item.active");
      const wheelEl = wheelsWrp.querySelector(".wheel-option.active");
      const cfgPrice = cfgEl ? +cfgEl.dataset.price : 0;
      const wheelPrice = wheelEl ? +wheelEl.dataset.price : 0;
      const optsPrice = [
        ...optionsForm.querySelectorAll("input:checked"),
      ].reduce((sum, cb) => sum + +cb.dataset.price, 0);

      const baseCost = cfgPrice + wheelPrice;
      const totalCost = baseCost + optsPrice;

      baseSpan.textContent = `$${baseCost.toLocaleString("ru")}.00`;
      addSpan.textContent = `$${optsPrice.toLocaleString("ru")}.00`;
      fullSpan.textContent = `$${totalCost.toLocaleString("ru")}.00`;
    }

    cfgWrp.addEventListener("click", (e) => {
      const opt = e.target.closest(".option-item");
      if (!opt) return;
      cfgWrp
        .querySelectorAll(".option-item")
        .forEach((o) => o.classList.remove("active"));
      opt.classList.add("active");
      recalc();
    });

    wheelsWrp.addEventListener("click", (e) => {
      const opt = e.target.closest(".wheel-option");
      if (!opt) return;
      wheelsWrp
        .querySelectorAll(".wheel-option")
        .forEach((o) => o.classList.remove("active"));
      opt.classList.add("active");
      recalc();
    });

    intWrp.addEventListener("click", (e) => {
      const opt = e.target.closest(".color-swatch-container");
      if (!opt) return;
      intWrp
        .querySelectorAll(".color-swatch-container")
        .forEach((o) => o.classList.remove("active"));
      opt.classList.add("active");
      recalc();
    });
    bodyWrp.addEventListener("click", (e) => {
      const opt = e.target.closest(".color-swatch-container");
      if (!opt) return;
      bodyWrp
        .querySelectorAll(".color-swatch-container")
        .forEach((o) => o.classList.remove("active"));
      opt.classList.add("active");
      recalc();
    });
    optionsForm.addEventListener("change", recalc);
    recalc();
    
const buyBtn = document.querySelector(".btn--buy");
    buyBtn.addEventListener("click", () => {
      const currentUser = localStorage.getItem("currentUser");
      if (!currentUser) {
        window.location.href = "index.html";
        return;
      }
      const orders = JSON.parse(localStorage.getItem("orders") || "[]");
      const cfgEl = cfgWrp.querySelector(".option-item.active");
      const wheelEl = wheelsWrp.querySelector(".wheel-option.active");
      const opts = Array.from(
        optionsForm.querySelectorAll("input:checked")
      ).map((cb) => cb.parentElement.textContent.trim());
      const order = {
        username: currentUser,
        carId,
        title: titleEl.textContent,
        imageCar: imgEl.src,
        configuration: cfgEl?.textContent || "",
        wheel: wheelEl?.querySelector("span")?.textContent || "",
        options: opts,
        price: fullSpan.textContent,
        date: new Date().toISOString(),
      };
      orders.push(order);
      localStorage.setItem("orders", JSON.stringify(orders));
      window.location.href = "account.html";
    });
const basketBtn = document.querySelector(".btn--add");
    basketBtn.addEventListener("click", () => {
      const currentUser = localStorage.getItem("currentUser");
      if (!currentUser) {
        window.location.href = "index.html";
        return;
      }
      const baskets = JSON.parse(localStorage.getItem("baskets") || "[]");
      const cfgEl = cfgWrp.querySelector(".option-item.active");
      const wheelEl = wheelsWrp.querySelector(".wheel-option.active");
      const opts = Array.from(
        optionsForm.querySelectorAll("input:checked")
      ).map((cb) => cb.parentElement.textContent.trim());
      const basket = {
        username: currentUser,
        carId,
        title: titleEl.textContent,
        imageCar: imgEl.src,
        configuration: cfgEl?.textContent || "",
        wheel: wheelEl?.querySelector("span")?.textContent || "",
        options: opts,
        price: fullSpan.textContent,
        date: new Date().toISOString(),
      };
      baskets.push(basket);
      localStorage.setItem("baskets", JSON.stringify(baskets));
      window.location.href = "basket.html";
    });
  }catch (err) {
    console.error(err);
  }
}
);
