document.addEventListener("DOMContentLoaded", () => {
    "use strict";

    /* =========================================
       ELEMENT REFERENCES
    ========================================= */

    const navToggle = document.getElementById("nav-toggle");
    const navMenu = document.getElementById("nav-menu");
    const navLinks = document.querySelectorAll(".nav-link");
    const navbar = document.querySelector(".navbar");

    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;


    /* =========================================
       MOBILE NAVIGATION
    ========================================= */

    if (navToggle && navMenu) {

        navToggle.addEventListener("click", () => {

            const isOpen = navMenu.classList.toggle("active");

            navToggle.classList.toggle("active", isOpen);

            navToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

            // Change hamburger icon to X
            const icon = navToggle.querySelector("i");

            if (icon) {
                icon.classList.toggle("fa-bars", !isOpen);
                icon.classList.toggle("fa-xmark", isOpen);
            }

        });


        /* Close menu when a navigation link is clicked */

        navLinks.forEach((link) => {

            link.addEventListener("click", () => {

                navMenu.classList.remove("active");
                navToggle.classList.remove("active");

                navToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                const icon = navToggle.querySelector("i");

                if (icon) {
                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");
                }

            });

        });


        /* Close menu with Escape */

        document.addEventListener("keydown", (event) => {

            if (event.key === "Escape" && navMenu.classList.contains("active")) {

                navMenu.classList.remove("active");
                navToggle.classList.remove("active");

                navToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                const icon = navToggle.querySelector("i");

                if (icon) {
                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");
                }

                navToggle.focus();
            }

        });


        /* Close menu when clicking outside */

        document.addEventListener("click", (event) => {

            const clickedInsideNavigation =
                navMenu.contains(event.target) ||
                navToggle.contains(event.target);

            if (
                !clickedInsideNavigation &&
                navMenu.classList.contains("active")
            ) {

                navMenu.classList.remove("active");
                navToggle.classList.remove("active");

                navToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                const icon = navToggle.querySelector("i");

                if (icon) {
                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");
                }

            }

        });

    }


    /* =========================================
       SMOOTH SCROLLING
    ========================================= */

    const anchorLinks = document.querySelectorAll(
        'a[href^="#"]'
    );

    anchorLinks.forEach((link) => {

        link.addEventListener("click", (event) => {

            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const target = document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            const navbarHeight = navbar
                ? navbar.offsetHeight
                : 0;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                navbarHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: prefersReducedMotion
                    ? "auto"
                    : "smooth"
            });

        });

    });


    /* =========================================
       ACTIVE NAVIGATION STATE
    ========================================= */

    const sections = document.querySelectorAll(
        "main section[id]"
    );

    if (sections.length && navLinks.length) {

        const updateActiveNavigation = () => {

            const scrollPosition =
                window.scrollY +
                (navbar ? navbar.offsetHeight : 0) +
                150;

            let currentSection = "";

            sections.forEach((section) => {

                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;

                if (
                    scrollPosition >= sectionTop &&
                    scrollPosition < sectionTop + sectionHeight
                ) {
                    currentSection = section.id;
                }

            });


            navLinks.forEach((link) => {

                const linkTarget =
                    link.getAttribute("href");

                link.classList.toggle(
                    "active",
                    linkTarget === `#${currentSection}`
                );

            });

        };


        window.addEventListener(
            "scroll",
            updateActiveNavigation,
            { passive: true }
        );

        updateActiveNavigation();

    }


    /* =========================================
       SCROLLREVEAL ANIMATIONS
    ========================================= */

    if (
        typeof ScrollReveal !== "undefined" &&
        !prefersReducedMotion
    ) {

        const reveal = ScrollReveal({
            distance: "30px",
            duration: 800,
            easing: "ease-out",
            opacity: 0,
            origin: "bottom",
            scale: 0.98,
            reset: false,
            mobile: true
        });


        /* Section headings */

        reveal.reveal(
            ".section-intro",
            {
                origin: "bottom",
                distance: "25px",
                delay: 100
            }
        );


        /* About */

        reveal.reveal(
            ".about-text",
            {
                origin: "bottom",
                distance: "25px",
                delay: 150
            }
        );


        /* Skills */

        reveal.reveal(
            ".skill-category",
            {
                origin: "bottom",
                distance: "25px",
                interval: 100
            }
        );


        /* Education */

        reveal.reveal(
            ".timeline-item",
            {
                origin: "left",
                distance: "30px",
                interval: 150
            }
        );


        /* Featured projects */

        reveal.reveal(
            ".case-study",
            {
                origin: "bottom",
                distance: "35px",
                interval: 200
            }
        );


        /* Additional projects */

        reveal.reveal(
            ".project-card",
            {
                origin: "bottom",
                distance: "30px",
                interval: 120
            }
        );


        /* Contact */

        reveal.reveal(
            ".contact-info",
            {
                origin: "left",
                distance: "30px"
            }
        );

        reveal.reveal(
            ".contact-form",
            {
                origin: "right",
                distance: "30px",
                delay: 150
            }
        );

    }


    /* =========================================
       HERO IMAGE LOAD EFFECT
    ========================================= */

    const profileImage = document.querySelector(
        ".hero-profile-img"
    );

    if (profileImage) {

        profileImage.addEventListener(
            "load",
            () => {
                profileImage.classList.add("loaded");
            },
            { once: true }
        );

    }


    /* =========================================
       EXTERNAL LINKS
    ========================================= */

    const externalLinks = document.querySelectorAll(
        'a[target="_blank"]'
    );

    externalLinks.forEach((link) => {

        link.setAttribute(
            "rel",
            "noopener noreferrer"
        );

    });

});