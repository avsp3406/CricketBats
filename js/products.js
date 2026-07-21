/* =====================================================
   BatMaster Pro
   products.js
   Part 7A
===================================================== */

let allProducts = [];
let filteredProducts = [];

/* ==========================================
   Initialize
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    loadProducts();

});

/* ==========================================
   Load Products JSON
========================================== */

async function loadProducts() {

    try {

        const response = await fetch("data/products.json");

        if (!response.ok) {

            throw new Error("Unable to load products.");

        }

        allProducts = await response.json();

        filteredProducts = [...allProducts];

        renderProducts(filteredProducts);

    }

    catch (error) {

        console.error(error);

        document.getElementById("productContainer").innerHTML = `

            <div class="text-center">

                <h2>Products could not be loaded.</h2>

                <p>Please try again later.</p>

            </div>

        `;

    }

}

/* ==========================================
   Render Products
========================================== */

function renderProducts(products) {

    const container =
        document.getElementById("productContainer");

    if (!container) return;

    if (products.length === 0) {

        container.innerHTML = `

            <h2 class="text-center">

                No Products Found

            </h2>

        `;

        return;

    }

    container.innerHTML = "";

    products.forEach(product => {

        container.innerHTML += createProductCard(product);

    });

}

/* ==========================================
   Product Card
========================================== */

function createProductCard(product) {

    const discountedPrice = Math.round(

        product.price -

        (product.price * product.discount / 100)

    );

    return `

<div class="product-card fade-up">

    <img
        src="${product.image}"
        alt="${product.name}">

    <div class="product-actions">

        <a href="#"
           onclick="toggleWishlist(${product.id});return false;">

            <i class="fa-regular fa-heart"></i>

        </a>

    </div>

    <h3>

        ${product.name}

    </h3>

    <p style="padding:0 20px;color:#666;">

        ${product.brand}

    </p>

    <div class="stars">

        ⭐ ${product.rating}

    </div>

    <p class="price">

        ₹${discountedPrice}

    </p>

    <p
        style="padding:0 20px 10px;color:#888;">

        <del>

            ₹${product.price}

        </del>

        (${product.discount}% OFF)

    </p>

    <p
        style="padding:0 20px;">

        Stock:

        <strong>

            ${product.stock}

        </strong>

    </p>

    <div
        style="padding:20px;display:flex;gap:10px;">

        <button
            class="btn-small"

            onclick="addToCart(${product.id})">

            Add To Cart

        </button>

        <a
            class="btn-small"

            href="product.html?id=${product.id}">

            View

        </a>

    </div>

</div>

`;

}

/* ==========================================
   Add To Cart
========================================== */

function addToCart(id) {

    const product = allProducts.find(

        p => p.id === id

    );

    if (!product) return;

    let cart =

        JSON.parse(

            localStorage.getItem("cart")

        ) || [];

    cart.push(product);

    localStorage.setItem(

        "cart",

        JSON.stringify(cart)

    );

    if (typeof updateCartCount === "function") {

        updateCartCount();

    }

    if (typeof showToast === "function") {

        showToast(product.name + " added to cart");

    }

}

/* =====================================================
   Part 7B
   Search
   Category Filter
   Sorting
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    initSearch();

    initCategoryFilter();

    initSorting();

});

/* =====================================================
   Search
===================================================== */

function initSearch() {

    const search =
        document.getElementById("searchInput");

    if (!search) return;

    search.addEventListener("input", applyFilters);

}

/* =====================================================
   Category Filter
===================================================== */

function initCategoryFilter() {

    const category =
        document.getElementById("categoryFilter");

    if (!category) return;

    category.addEventListener("change", applyFilters);

}

/* =====================================================
   Sorting
===================================================== */

function initSorting() {

    const sort =
        document.getElementById("sortProducts");

    if (!sort) return;

    sort.addEventListener("change", applyFilters);

}

/* =====================================================
   Apply All Filters
===================================================== */

function applyFilters() {

    const searchText =
        document.getElementById("searchInput")
        ?.value.toLowerCase() || "";

    const category =
        document.getElementById("categoryFilter")
        ?.value || "all";

    const sort =
        document.getElementById("sortProducts")
        ?.value || "default";

    filteredProducts = allProducts.filter(product => {

        const matchesSearch =
            product.name.toLowerCase().includes(searchText);

        const matchesCategory =
            category === "all" ||
            product.category === category;

        return matchesSearch && matchesCategory;

    });

    switch(sort){

        case "low":

            filteredProducts.sort(
                (a,b)=>a.price-b.price
            );

            break;

        case "high":

            filteredProducts.sort(
                (a,b)=>b.price-a.price
            );

            break;

        case "rating":

            filteredProducts.sort(
                (a,b)=>b.rating-a.rating
            );

            break;

    }

    renderProducts(filteredProducts);

}

/* =====================================================
   Part 7C
   Wishlist
   Better Cart
   Product Details Helper
===================================================== */

/* =====================================================
   Wishlist Button State
===================================================== */

function isWishlisted(id) {

    const wishlist = JSON.parse(
        localStorage.getItem("wishlist")
    ) || [];

    return wishlist.includes(id);

}

/* =====================================================
   Toggle Wishlist
===================================================== */

function toggleWishlist(id) {

    let wishlist = JSON.parse(
        localStorage.getItem("wishlist")
    ) || [];

    if (wishlist.includes(id)) {

        wishlist = wishlist.filter(item => item !== id);

        showToast("Removed from Wishlist");

    } else {

        wishlist.push(id);

        showToast("Added to Wishlist ❤️");

    }

    localStorage.setItem(
        "wishlist",
        JSON.stringify(wishlist)
    );

    renderProducts(filteredProducts);

}

/* =====================================================
   Better Add To Cart
===================================================== */

function addToCart(id) {

    const product = allProducts.find(
        p => p.id === id
    );

    if (!product) return;

    let cart = JSON.parse(
        localStorage.getItem("cart")
    ) || [];

    const existing = cart.find(
        item => item.id === id
    );

    if (existing) {

        existing.quantity++;

    } else {

        product.quantity = 1;

        cart.push(product);

    }

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    updateCartCount();

    showToast(product.name + " added to cart");

}

/* =====================================================
   Product Details Helper
===================================================== */

function getProductById(id){

    return allProducts.find(
        p => p.id == id
    );

}

/* =====================================================
   URL Parameter
===================================================== */

function getProductIdFromURL(){

    const params =
        new URLSearchParams(window.location.search);

    return Number(params.get("id"));

}

/* =====================================================
   Product Details Loader
===================================================== */

function loadSingleProduct(){

    const id = getProductIdFromURL();

    if(!id) return;

    const product =
        getProductById(id);

    if(!product) return;

    const title =
        document.getElementById("productTitle");

    const image =
        document.getElementById("productImage");

    const price =
        document.getElementById("productPrice");

    const description =
        document.getElementById("productDescription");

    if(title) title.textContent = product.name;

    if(image) image.src = product.image;

    if(price) price.textContent =
        formatPrice(product.price);

    if(description)
        description.textContent =
        product.description;

}

/* =====================================================
   Initialize Product Page
===================================================== */

window.addEventListener("load",()=>{

    loadSingleProduct();

});

/* =====================================================
   End of products.js
===================================================== */