document.addEventListener("DOMContentLoaded", () => {
    const products = [
        {name: "Тестовые кроссовки Nike", brand: "Nike", price: 5000},
        {name: "Тестовые кроссовки Adidas", brand: "Adidas", price: 4500}
    ];

    const productList = document.getElementById("product-list");

    products.forEach(p => {
        const div = document.createElement("div");
        div.innerHTML = `<h3>${p.name}</h3><p>Бренд: ${p.brand}</p><p>Цена: ${p.price} ₽</p>`;
        productList.appendChild(div);
    });
});




