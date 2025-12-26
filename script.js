// Массив корзины
let cart = [];

// Функция обновления корзины
function updateCartUI() {
    const cartCount = document.getElementById("cart-count");
    const cartTotal = document.getElementById("cart-total");
    if (cartCount && cartTotal) {
        cartCount.innerText = cart.length;
        const total = cart.reduce((sum, item) => sum + item.price, 0);
        cartTotal.innerText = total + " ₽";
    }
}

// Обработчик добавления в корзину
function setupCartButtons() {
    document.querySelectorAll('.product-card').forEach(card => {
        const btn = card.querySelector('button');
        btn.addEventListener('click', () => {
            const name = card.querySelector('h3').innerText;
            const priceText = card.querySelector('p:last-of-type').innerText;
            const price = parseInt(priceText.replace(/\D/g,''));
            cart.push({name, price});
            updateCartUI();
            alert(`${name} добавлено в корзину`);
        });
    });
}

// Фильтры
function applyFilters() {
    const search = document.getElementById("search-input").value.toLowerCase();
    const brand = document.getElementById("brand-filter").value;
    const size = document.getElementById("size-filter").value;
    const color = document.getElementById("color-filter").value;
    const priceMax = parseInt(document.getElementById("price-filter").value);

    document.querySelectorAll('.product-card').forEach(card => {
        const name = card.querySelector('h3').innerText.toLowerCase();
        const cardBrand = card.querySelector('p:nth-of-type(1)').innerText.split(": ")[1];
        const cardSize = card.querySelector('p:nth-of-type(2)').innerText.split(": ")[1];
        const cardColor = card.querySelector('p:nth-of-type(3)').innerText.split(": ")[1];
        const cardPrice = parseInt(card.querySelector('p:nth-of-type(4)').innerText.replace(/\D/g,''));

        const matches =
            (!search || name.includes(search)) &&
            (!brand || cardBrand === brand) &&
            (!size || cardSize === size) &&
            (!color || cardColor === color) &&
            (!priceMax || cardPrice <= priceMax);

        card.style.display = matches ? '' : 'none';
    });
}

// Инициализация
document.getElementById("search-btn").addEventListener("click", applyFilters);
document.getElementById("filter-btn").addEventListener("click", applyFilters);

// Чтобы поиск по клавише Enter тоже работал
document.getElementById("search-input").addEventListener("keypress", function(e){
    if(e.key === "Enter") applyFilters();
});

// Настройка кнопок корзины после загрузки
setupCartButtons();
