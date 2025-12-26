document.addEventListener("DOMContentLoaded", () => {
    // Массив товаров (можно расширять)
    const products = [
        {name: "Кроссовки Nike Air", brand: "Nike", size: "40", color: "Белый", price: 5000, article: "NA40"},
        {name: "Кроссовки Adidas Runner", brand: "Adidas", size: "39", color: "Черный", price: 4500, article: "AR39"},
        {name: "Кроссовки Puma RS-X", brand: "Puma", size: "38", color: "Синий", price: 4800, article: "PR38"}
    ];

    const productList = document.getElementById("product-list");
    const searchInput = document.getElementById("search-input");
    const brandFilter = document.getElementById("brand-filter");
    const sizeFilter = document.getElementById("size-filter");
    const colorFilter = document.getElementById("color-filter");
    const priceFilter = document.getElementById("price-filter");
    const filterBtn = document.getElementById("filter-btn");
    const searchBtn = document.getElementById("search-btn");

    let cart = [];

    // Функция рендера товаров
    function renderProducts() {
        productList.innerHTML = "";
        const search = searchInput.value.toLowerCase();
        const brand = brandFilter.value;
        const size = sizeFilter.value;
        const color = colorFilter.value;
        const priceMax = parseInt(priceFilter.value);

        products.forEach(p => {
            // Проверка фильтров
            const matches = 
                (!search || p.name.toLowerCase().includes(search) || p.article.toLowerCase().includes(search)) &&
                (!brand || p.brand === brand) &&
                (!size || p.size === size) &&
                (!color || p.color === color) &&
                (!priceMax || p.price <= priceMax);

            if(matches){
                const div = document.createElement("div");
                div.className = "product-card";
                div.innerHTML = `
                    <img src="https://via.placeholder.com/150" alt="${p.name}">
                    <h3>${p.name}</h3>
                    <p>Бренд: ${p.brand}</p>
                    <p>Размер: ${p.size}</p>
                    <p>Цвет: ${p.color}</p>
                    <p>Цена: ${p.price} ₽</p>
                    <button>Добавить в корзину</button>
                `;
                productList.appendChild(div);

                // Кнопка добавления в корзину
                div.querySelector("button").addEventListener("click", () => {
                    cart.push(p);
                    updateCartUI();
                    alert(`${p.name} добавлено в корзину`);
                });
            }
        });
    }

    // Обновление корзины
    function updateCartUI(){
        const cartCount = document.getElementById("cart-count");
        const cartTotal = document.getElementById("cart-total");
        const total = cart.reduce((sum, item) => sum + item.price, 0);
        cartCount.innerText = cart.length;
        cartTotal.innerText = total + " ₽";
    }

    // Обработчики поиска и фильтров
    filterBtn.addEventListener("click", renderProducts);
    searchBtn.addEventListener("click", renderProducts);
    searchInput.addEventListener("keypress", (e) => { if(e.key === "Enter") renderProducts(); });

    // Инициализация
    renderProducts();
});

