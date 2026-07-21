/* =====================================================
   BatMaster Pro
   cart.js
   Part 9A
===================================================== */

let cart = [];

/* ==========================================
   Initialize
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    loadCart();

});

/* ==========================================
   Load Cart
========================================== */

function loadCart() {

    cart = JSON.parse(
        localStorage.getItem("cart")
    ) || [];

    renderCart();

}

/* ==========================================
   Render Cart
========================================== */

function renderCart() {

    const container =
        document.getElementById("cartContainer");

    if (!container) return;

    if (cart.length === 0) {

        container.innerHTML = `

            <div class="text-center">

                <h2>Your cart is empty</h2>

                <p>

                    Continue shopping to add products.

                </p>

                <br>

                <a href="shop.html"
                   class="btn">

                    Shop Now

                </a>

            </div>

        `;

        updateSummary();

        return;

    }

    container.innerHTML = "";

    cart.forEach((product, index) => {

        container.innerHTML += createCartItem(
            product,
            index
        );

    });

    updateSummary();

}

/* ==========================================
   Cart Item
========================================== */

function createCartItem(product, index) {

    return `

<div class="cart-product">

    <img
        src="${product.image}"
        alt="${product.name}">

    <div
        style="flex:1;">

        <h3>

            ${product.name}

        </h3>

        <p>

            ₹${product.price.toLocaleString("en-IN")}

        </p>

        <div class="qty">

            <button
                onclick="decreaseQuantity(${index})">

                -

            </button>

            <strong>

                ${product.quantity || 1}

            </strong>

            <button
                onclick="increaseQuantity(${index})">

                +

            </button>

        </div>

        <span
            class="remove-item"

            onclick="removeItem(${index})">

            Remove

        </span>

    </div>

</div>

`;

}

/* ==========================================
   Summary
========================================== */

function updateSummary() {

    const items =
        document.getElementById("summaryItems");

    const subtotal =
        document.getElementById("summarySubtotal");

    const total =
        document.getElementById("summaryTotal");

    let count = 0;

    let amount = 0;

    cart.forEach(product => {

        const qty = product.quantity || 1;

        count += qty;

        amount += product.price * qty;

    });

    if (items)
        items.textContent = count;

    if (subtotal)
        subtotal.textContent =
            formatPrice(amount);

    if (total)
        total.textContent =
            formatPrice(amount);

}

/* =====================================================
   BatMaster Pro
   cart.js
   Part 9B
===================================================== */

/* ==========================================
   Save Cart
========================================== */

function saveCart() {

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    renderCart();

    if (typeof updateCartCount === "function") {

        updateCartCount();

    }

}

/* ==========================================
   Increase Quantity
========================================== */

function increaseQuantity(index) {

    if (!cart[index]) return;

    if (!cart[index].quantity) {

        cart[index].quantity = 1;

    }

    cart[index].quantity++;

    saveCart();

    if (typeof showToast === "function") {

        showToast("Quantity Updated");

    }

}

/* ==========================================
   Decrease Quantity
========================================== */

function decreaseQuantity(index) {

    if (!cart[index]) return;

    if (!cart[index].quantity) {

        cart[index].quantity = 1;

    }

    if (cart[index].quantity > 1) {

        cart[index].quantity--;

    } else {

        removeItem(index);

        return;

    }

    saveCart();

}

/* ==========================================
   Remove Product
========================================== */

function removeItem(index) {

    if (!cart[index]) return;

    const productName = cart[index].name;

    cart.splice(index, 1);

    saveCart();

    if (typeof showToast === "function") {

        showToast(productName + " removed");

    }

}

/* =====================================================
   BatMaster Pro
   cart.js
   Part 9C
===================================================== */

/* ==========================================
   Clear Entire Cart
========================================== */

function clearCart() {

    if (cart.length === 0) {

        if (typeof showToast === "function") {
            showToast("Cart is already empty");
        }

        return;
    }

    const confirmClear = confirm(
        "Are you sure you want to remove all items from your cart?"
    );

    if (!confirmClear) return;

    cart = [];

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    renderCart();

    if (typeof updateCartCount === "function") {
        updateCartCount();
    }

    if (typeof showToast === "function") {
        showToast("Cart cleared successfully");
    }

}

/* ==========================================
   Checkout Validation
========================================== */

function validateCheckout() {

    if (cart.length === 0) {

        if (typeof showToast === "function") {
            showToast("Your cart is empty");
        }

        return false;
    }

    return true;

}

/* ==========================================
   Event Listeners
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    const clearButton =
        document.getElementById("clearCart");

    if (clearButton) {

        clearButton.addEventListener(
            "click",
            clearCart
        );

    }

    const checkoutButton =
        document.querySelector(
            'a[href="checkout.html"]'
        );

    if (checkoutButton) {

        checkoutButton.addEventListener(
            "click",
            function (e) {

                if (!validateCheckout()) {

                    e.preventDefault();

                }

            }
        );

    }

});

/* ==========================================
   Refresh Cart Count
========================================== */

window.addEventListener("load", () => {

    if (typeof updateCartCount === "function") {

        updateCartCount();

    }

});

/* ==========================================
   End of cart.js
========================================== */