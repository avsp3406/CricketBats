/* =====================================================
   BatMaster Pro
   checkout.js
===================================================== */

let checkoutCart = [];

/* ==========================================
   Initialize
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    loadCheckout();

    initializeCheckoutForm();

});

/* ==========================================
   Load Checkout
========================================== */

function loadCheckout() {

    checkoutCart = JSON.parse(

        localStorage.getItem("cart")

    ) || [];

    renderCheckoutItems();

}

/* ==========================================
   Render Order Summary
========================================== */

function renderCheckoutItems() {

    const container =

        document.getElementById("checkoutItems");

    const totalElement =

        document.getElementById("checkoutTotal");

    if (!container) return;

    if (checkoutCart.length === 0) {

        container.innerHTML = `

            <p>Your cart is empty.</p>

            <br>

            <a href="shop.html" class="btn">

                Continue Shopping

            </a>

        `;

        if (totalElement) {

            totalElement.textContent = "₹0";

        }

        return;

    }

    let total = 0;

    container.innerHTML = "";

    checkoutCart.forEach(product => {

        const qty = product.quantity || 1;

        const itemTotal = qty * product.price;

        total += itemTotal;

        container.innerHTML += `

<div class="summary-row">

    <span>

        ${product.name}

        × ${qty}

    </span>

    <strong>

        ${formatPrice(itemTotal)}

    </strong>

</div>

`;

    });

    if (totalElement) {

        totalElement.textContent = formatPrice(total);

    }

}

/* ==========================================
   Checkout Form
========================================== */

function initializeCheckoutForm() {

    const form =

        document.getElementById("checkoutForm");

    if (!form) return;

    form.addEventListener(

        "submit",

        placeOrder

    );

}

/* ==========================================
   Place Order
========================================== */

function placeOrder(e) {

    e.preventDefault();

    if (checkoutCart.length === 0) {

        showToast("Your cart is empty");

        return;

    }

    const paymentMethod =

        document.querySelector(

            'input[name="payment"]:checked'

        );

    let payment = "Payment";

    if (paymentMethod) {

        payment = paymentMethod.parentElement.textContent.trim();

    }

    showToast(

        "Processing " + payment + "..."

    );

    setTimeout(() => {

        localStorage.removeItem("cart");

        if (typeof updateCartCount === "function") {

            updateCartCount();

        }

        alert(

`🎉 Thank you for shopping at BatMaster Pro!

Your order has been placed successfully.

Payment Method:
${payment}

Order Status:
Confirmed`

        );

        window.location.href = "index.html";

    }, 1500);

}