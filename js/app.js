/* =====================================================
   BatMaster Pro
   app.js
   Part 4A-1
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    initMobileMenu();
    initStickyNavbar();
    initScrollTop();

});

/* =====================================================
   Mobile Menu
===================================================== */

function initMobileMenu() {

    const menuBtn = document.querySelector(".menu-btn");
    const navLinks = document.querySelector(".nav-links");

    if (!menuBtn || !navLinks) return;

    menuBtn.addEventListener("click", () => {

        navLinks.classList.toggle("mobile-active");

        const icon = menuBtn.querySelector("i");

        if (navLinks.classList.contains("mobile-active")) {

            icon.classList.remove("fa-bars");
            icon.classList.add("fa-xmark");

        } else {

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

        }

    });

    document.querySelectorAll(".nav-links a").forEach(link => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("mobile-active");

            const icon = menuBtn.querySelector("i");

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

        });

    });

}

/* =====================================================
   Sticky Navbar Shadow
===================================================== */

function initStickyNavbar() {

    const navbar = document.querySelector(".navbar");

    if (!navbar) return;

    window.addEventListener("scroll", () => {

        if (window.scrollY > 60) {

            navbar.style.boxShadow =
                "0 10px 25px rgba(0,0,0,.15)";

        } else {

            navbar.style.boxShadow =
                "0 2px 10px rgba(0,0,0,.08)";

        }

    });

}

/* =====================================================
   Scroll To Top Button
===================================================== */

function initScrollTop() {

    const button = document.getElementById("scrollTop");

    if (!button) return;

    button.style.display = "none";

    window.addEventListener("scroll", () => {

        if (window.scrollY > 400) {

            button.style.display = "flex";

        } else {

            button.style.display = "none";

        }

    });

    button.addEventListener("click", () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

}

