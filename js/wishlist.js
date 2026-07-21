/* ==========================================
   Wishlist Page
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    renderWishlist();

});

function renderWishlist() {

    const container =
        document.getElementById("wishlistContainer");

    if (!container) return;

    const wishlist =
        JSON.parse(localStorage.getItem("wishlist")) || [];

    const products =
        JSON.parse(localStorage.getItem("products")) || [];

    container.innerHTML = "";

    if (wishlist.length === 0) {

        container.innerHTML = `

        <div class="empty-state">

            <h2>Your Wishlist is Empty ❤️</h2>

            <p>

                Save products you love and they'll appear here.

            </p>

            <br>

            <a href="shop.html" class="btn">

                Continue Shopping

            </a>

        </div>

        `;

        return;

    }

    wishlist.forEach(id => {

        const product =
            products.find(p => p.id == id);

        if (!product) return;

        container.innerHTML += `

<div class="product-card">

<img src="${product.image}" alt="${product.name}">

<h3>${product.name}</h3>

<p>${product.brand}</p>

<div class="stars">

⭐ ${product.rating}

</div>

<h4>

₹${product.price}

</h4>

<div class="product-buttons">

<button
class="btn"
onclick="addWishlistToCart(${product.id})">

Add To Cart

</button>

<button
class="btn-outline"
onclick="removeWishlist(${product.id})">

Remove

</button>

</div>

</div>

`;

    });

}

function removeWishlist(id) {

    let wishlist =
        JSON.parse(localStorage.getItem("wishlist")) || [];

    wishlist =
        wishlist.filter(item => item !== id);

    localStorage.setItem(
        "wishlist",
        JSON.stringify(wishlist)
    );

    renderWishlist();

}

function addWishlistToCart(id) {

    if (typeof addToCart === "function") {

        addToCart(id);

    }

    removeWishlist(id);

}