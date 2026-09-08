// ============================================================
// THORISO MBAMBISA — VIRTUAL CV
// Main JavaScript
// ============================================================

document.addEventListener("DOMContentLoaded", () => {

    // ========================================================
    // ELEMENT REFERENCES
    // ========================================================

    const header = document.querySelector(".navbar");
    const navToggle = document.getElementById("nav-toggle");
    const navMenu = document.getElementById("nav-menu");

    const navLinks = document.querySelectorAll(".nav-link");
    const sections = document.querySelectorAll("main section[id]");


    // ========================================================
    // MOBILE NAVIGATION
    // ========================================================

    if (navToggle && navMenu) {

        navToggle.addEventListener("click", () => {

            const isOpen =
                navMenu.classList.toggle("active");

            navToggle.classList.toggle(
                "active",
                isOpen
            );

            navToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

            document.body.classList.toggle(
                "menu-open",
                isOpen
            );
        });


        // Close menu after selecting a navigation link
        navLinks.forEach(link => {

            link.addEventListener("click", () => {

                navMenu.classList.remove("active");

                navToggle.classList.remove("active");

                navToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                document.body.classList.remove(
                    "menu-open"
                );
            });

        });


        // Close menu with Escape
        document.addEventListener("keydown", event => {

            if (
                event.key === "Escape" &&
                navMenu.classList.contains("active")
            ) {

                navMenu.classList.remove("active");

                navToggle.classList.remove("active");

                navToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                document.body.classList.remove(
                    "menu-open"
                );

                navToggle.focus();
            }

        });

    }


    // ========================================================
    // SMOOTH SCROLLING
    // ========================================================

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(anchor => {

            anchor.addEventListener("click", event => {

                const targetId =
                    anchor.getAttribute("href");

                if (
                    !targetId ||
                    targetId === "#"
                ) {
                    return;
                }

                const target =
                    document.querySelector(targetId);

                if (!target) {
                    return;
                }

                event.preventDefault();

                const headerHeight =
                    header
                        ? header.offsetHeight
                        : 0;

                const targetPosition =
                    target.getBoundingClientRect().top +
                    window.scrollY -
                    headerHeight -
                    16;

                window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth"
                });

                history.pushState(
                    null,
                    "",
                    targetId
                );
            });

        });


    // ========================================================
    // ACTIVE NAVIGATION LINK
    // ========================================================

    const updateActiveNavigation = () => {

        if (
            !sections.length ||
            !navLinks.length
        ) {
            return;
        }

        const headerHeight =
            header
                ? header.offsetHeight
                : 0;

        const scrollPosition =
            window.scrollY +
            headerHeight +
            100;

        let currentSection = "home";


        sections.forEach(section => {

            const sectionTop =
                section.offsetTop;

            const sectionBottom =
                sectionTop +
                section.offsetHeight;

            if (
                scrollPosition >= sectionTop &&
                scrollPosition < sectionBottom
            ) {
                currentSection =
                    section.id;
            }

        });


        navLinks.forEach(link => {

            const targetId =
                link
                    .getAttribute("href")
                    ?.replace("#", "");

            link.classList.toggle(
                "active",
                targetId === currentSection
            );

        });

    };


    window.addEventListener(
        "scroll",
        updateActiveNavigation,
        { passive: true }
    );

    updateActiveNavigation();


    // ========================================================
    // NAVBAR SCROLL STATE
    // ========================================================

    const updateNavbar = () => {

        if (!header) {
            return;
        }

        header.classList.toggle(
            "scrolled",
            window.scrollY > 20
        );
    };


    window.addEventListener(
        "scroll",
        updateNavbar,
        { passive: true }
    );

    updateNavbar();


    // ========================================================
    // SCROLLREVEAL
    // ========================================================

    const prefersReducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    if (
        typeof ScrollReveal !== "undefined" &&
        !prefersReducedMotion
    ) {

        const reveal = ScrollReveal({

            distance: "40px",

            duration: 800,

            easing: "ease-out",

            interval: 100,

            reset: false,

            viewFactor: 0.15

        });


        // Hero
        reveal.reveal(".hero-content", {

            origin: "left",

            delay: 150

        });


        reveal.reveal(
            ".hero-image-wrapper",
            {

                origin: "right",

                delay: 300

            }
        );


        // Section headings
        reveal.reveal(
            ".section-intro",
            {

                origin: "bottom",

                delay: 100

            }
        );


        // About
        reveal.reveal(
            ".about-text",
            {

                origin: "bottom",

                delay: 150

            }
        );


        // Skills
        reveal.reveal(
            ".skill-category",
            {

                origin: "bottom",

                interval: 120

            }
        );


        // Education
        reveal.reveal(
            ".timeline-item",
            {

                origin: "left",

                interval: 150

            }
        );


        reveal.reveal(
            ".education-extra-block",
            {

                origin: "bottom",

                interval: 150

            }
        );


        // Featured projects
        reveal.reveal(
            ".case-study",
            {

                origin: "bottom",

                delay: 150

            }
        );


        reveal.reveal(
            ".case-study-block",
            {

                origin: "bottom",

                interval: 100

            }
        );


        // Additional projects
        reveal.reveal(
            ".project-card",
            {

                origin: "bottom",

                interval: 120

            }
        );


        // Contact
        reveal.reveal(
            ".contact-info",
            {

                origin: "left",

                delay: 150

            }
        );


        reveal.reveal(
            ".contact-form",
            {

                origin: "right",

                delay: 250

            }
        );

    } else if (
        typeof ScrollReveal === "undefined"
    ) {

        console.warn(
            "ScrollReveal library not found. " +
            "Animations have been skipped."
        );

    }

});