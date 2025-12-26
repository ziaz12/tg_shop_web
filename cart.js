let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartItemsDiv = document.getElementById("cart-items");
const cartTotalSpan = document.getElementById("cart-total");

function renderCart() {
    cartItemsDiv.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        const sum = item.price * item.qty;
        total += sum;

        const div = document.createElement("div");
        div.className = "cart-item";
        div.innerHTML = `
            <b>${item.name}</b><br>
            ${item.qty} шт × ${item.price} ₽ = <b>${sum} ₽</b>
        `;
        cartItemsDiv.appendChild(div);
    });

    cartTotalSpan.innerText = total + " ₽";
}

renderCart();
