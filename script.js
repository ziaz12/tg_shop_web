const products = [
    {name: "Nike Air Force 1", brand: "Nike", price: 12000, article: "AF1"},
    {name: "Adidas Superstar", brand: "Adidas", price: 10000, article: "SS"},
];

const productsDiv = document.getElementById("products");
const searchInput = document.getElementById("search");
const brandFilter = document.getElementById("brandFilter");

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
            div.innerHTML = `<b>${p.name}</b><br>Бренд: ${p.brand}<br>Цена: ${p.price} ₽`;
            productsDiv.appendChild(div);
        });
}

searchInput.oninput = render;
brandFilter.onchange = render;

render();

// Визуальный клик для кнопок "Добавить в корзину"
document.querySelectorAll('.product-card button').forEach(btn => {
    btn.addEventListener('click', () => {
        alert('Добавлено в корзину (пока только визуально)');
    });
});

