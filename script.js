const products = [
    {name: "Nike Air Force 1", brand: "Nike", price: 12000, article: "AF1"},
    {name: "Adidas Superstar", brand: "Adidas", price: 10000, article: "SS"},
    {name: "Puma RS-X", brand: "Puma", price: 9000, article: "RSX"}
];

const productsDiv = document.getElementById("products");
const searchInput = document.getElementById("search");
const brandFilter = document.getElementById("brandFilter");

let cart = []; // Массив для корзины

function render() {
    productsDiv.innerHTML = "";

    const search = searchInput.value.toLowerCase();
    const brand = brandFilter.value;

    products
        .filter(p =>
            (p.name.toLowerCase().includes(search) || p.article.toLowerCase().includes(search)) &&
            (brand === "" || p.brand === brand)
        )
        .forEach(p => {
            const div = document.createElement("div");
            div.className = "product";
            div.innerHTML = `
                <b>${p.name}</b><br>
                Бренд: ${p.brand}<br>
                Цена: ${p.price} ₽<br>
                <button class="add-to-cart">Добавить в корзину</button>
            `;
            productsDiv.appendChild(div);

            // Добавляем обработчик на кнопку после создания
            div.querySelector(".add-to-cart").addEventListener("click", () => {
                cart.push(p);
                updateCartUI();
                alert(`${p.name} добавлено в корзину`);
            });
        });
}

// Обновление визуального счетчика корзины
function updateCartUI() {
    const cartCount = document.getElementById("cart-count");
    const cartTotal = document.getElementById("cart-total");
    if(cartCount && cartTotal){
        cartCount.innerText = cart.length;
        const total = cart.reduce((sum, item) => sum + item.price, 0);
        cartTotal.innerText = total + " ₽";
    }
}

// Обработчики поиска и фильтра
searchInput.addEventListener("input", render);
brandFilter.addEventListener("change", render);

// Инициализация
render();

