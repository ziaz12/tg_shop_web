document.addEventListener("DOMContentLoaded", () => {
    // Глобальная корзина
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Массив товаров
    const products = [
        {name: "Кроссовки Nike Air", brand: "Nike", size: "40", color: "Белый", price: 5000, article: "NA40"},
        {name: "Кроссовки Adidas Runner", brand: "Adidas", size: "39", color: "Черный", price: 4500, article: "AR39"}
    ];

    const productList = document.getElementById("product-list");
    const searchInput = document.getElementById("search-input");
    const brandFilter = document.getElementById("brand-filter");
    const sizeFilter = document.getElementById("size-filter");
    const colorFilter = document.getElementById("color-filter");
    const priceFilter = document.getElementById("price-filter");
    const filterBtn = document.getElementById("filter-btn");
    const searchBtn = document.getElementById("search-btn");

    function renderProducts() {
        productList.innerHTML = "";
        const search = searchInput.value.toLowerCase();
        const brand = brandFilter.value;
        const size = sizeFilter.value;
        const color = colorFilter.value;
        const priceMax = parseInt(priceFilter.value);

        products.forEach(p => {
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
                    <h3>${p.name}</h3>
                    <p>Бренд: ${p.brand}</p>
                    <p>Размер: ${p.size}</p>
                    <p>Цвет: ${p.color}</p>
                    <p>Цена: ${p.price} ₽</p>
                    <button>Добавить в корзину</button>
                `;
                productList.appendChild(div);

                div.querySelector("button").addEventListener("click", () => {
                    const existing = cart.find(item => item.name === p.name);
                    if (existing) {
                        existing.qty += 1;
                    } else {
                        cart.push({...p, qty: 1});
                    }
                    localStorage.setItem("cart", JSON.stringify(cart));
                    updateCartUI();
                    alert(`${p.name} добавлено в корзину`);
                });
            }
        });
    }

    function updateCartUI() {
        const cartCount = document.getElementById("cart-count");
        const cartTotal = document.getElementById("cart-total");
        let total = 0;
        let count = 0;
        cart.forEach(item => {
            total += item.price * item.qty;
            count += item.qty;
        });
        cartCount.innerText = count;
        cartTotal.innerText = total + " ₽";
    }

    filterBtn.addEventListener("click", renderProducts);
    searchBtn.addEventListener("click", renderProducts);
    searchInput.addEventListener("keypress", (e) => { if(e.key === "Enter") renderProducts(); });

    // Изначальный рендер
    renderProducts();
    updateCartUI();
});




