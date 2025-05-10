document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".fleet__card");
  if (cards.length === 0) {
    console.warn("fleet__card не найдены");
    return;
  }

  cards.forEach((card) => {
    card.dataset.brand =
      card.querySelector(".car_name")?.textContent.trim() || "";

    const priceText = card.querySelector(".price")?.textContent || "";
    const nums = priceText.match(/\d[\d\s]*\d/g) || [];
    card.dataset.priceMin = nums[0] ? Number(nums[0].replace(/\s/g, "")) : 0;
    card.dataset.priceMax = nums[1] ? Number(nums[1].replace(/\s/g, "")) : 0;

    const attrs = card.querySelectorAll(
      ".detail-item .characteristics_artibute"
    );
    card.dataset.engine = attrs[0]?.textContent.trim() || "";
    card.dataset.fuel = attrs[1]?.textContent.trim() || "";
    card.dataset.power = attrs[2]
      ? Number(attrs[2].textContent.replace(/\D/g, ""))
      : 0;
    card.dataset.drive = attrs[3]?.textContent.trim() || "";
  });

  const filters = {
    brand: document.getElementById("filter-brand"),
    price: document.getElementById("filter-price"),
    engine: document.getElementById("filter-engine"),
    fuel: document.getElementById("filter-fuel"),
    power: document.getElementById("filter-power"),
    drive: document.getElementById("filter-drive"),
  };

  function applyFilter() {
    cards.forEach((card) => {
      let show = true;

      if (filters.brand?.value && card.dataset.brand !== filters.brand.value)
        show = false;
      if (filters.engine?.value && card.dataset.engine !== filters.engine.value)
        show = false;
      if (filters.fuel?.value && card.dataset.fuel !== filters.fuel.value)
        show = false;
      if (filters.drive?.value && card.dataset.drive !== filters.drive.value)
        show = false;

      if (filters.price?.value) {
        const [low, high] = filters.price.value.split("-").map(Number);
        if (card.dataset.priceMax < low || card.dataset.priceMin > high)
          show = false;
      }
      if (filters.power?.value) {
        const [low, high] = filters.power.value.split("-").map(Number);
        if (card.dataset.power < low || card.dataset.power > high) show = false;
      }

      card.style.display = show ? "" : "none";
    });
  }
  Object.values(filters).forEach((sel) => {
    if (sel) sel.addEventListener("change", applyFilter);
    else console.warn("Фильтр не найден:", sel);
  });
  applyFilter();
});
