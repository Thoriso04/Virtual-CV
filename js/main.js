// Register the datalabels plugin globally (CRITICAL for charts with datalabels)
// Ensure you have loaded the Chart.js and Chartjs-plugin-datalabels libraries in your HTML
// e.g., <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
//        <script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-datalabels@2.0.0"></script>
// Chart.register(ChartDataLabels); // REMOVED - No longer needed without Chart.js datalabels

// ===== Typing Effect for Hero Section =====
const typingTextElement = document.querySelector('.typing-text');
const professions = ["IT Student."];
let professionIndex = 0;
let charIndex = 0;

function type() {
    if (charIndex < professions[professionIndex].length) {
        typingTextElement.textContent += professions[professionIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, 100);
    } else {
        setTimeout(erase, 2000);
    }
}

function erase() {
    if (charIndex > 0) {
        typingTextElement.textContent = professions[professionIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, 50);
    } else {
        professionIndex = (professionIndex + 1) % professions.length;
        setTimeout(type, 500);
    }
}

// ===== Smooth Scrolling for Navigation =====
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Adjust headerOffset based on your fixed header's actual height
                const headerOffset = document.querySelector('header').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - headerOffset - 20; // Added extra 20px padding

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });

                // Close mobile menu after clicking a link
                const navLinks = document.getElementById('nav-links');
                const menuToggle = document.getElementById('menu-toggle');
                if (navLinks && menuToggle && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    menuToggle.classList.remove('open');
                }
            }
        });
    });
}

// ===== DOMContentLoaded Listener (Ensure HTML is loaded before running scripts) =====
document.addEventListener('DOMContentLoaded', () => {
    // Start typing effect
    setTimeout(type, 1500);
    // Set up smooth scrolling for nav links
    setupSmoothScrolling();

    // ===== Hamburger Menu Toggle (Now exclusively in main.js) =====
    const toggleBtn = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');

    if (toggleBtn && navLinks) { // Ensure elements exist before adding listener
        toggleBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            toggleBtn.classList.toggle('open'); // Keep this for button animation
        });
    }

    // ===== ScrollReveal animations =====
    // Ensure you have loaded the ScrollReveal library in your HTML
    // e.g., <script src="https://unpkg.com/scrollreveal"></script>
    if (typeof ScrollReveal !== 'undefined') { // Check if ScrollReveal is loaded
        ScrollReveal().reveal('.section', {
            distance: '60px',
            origin: 'bottom',
            duration: 1000,
            easing: 'ease-in-out',
            interval: 200,
            reset: false
        });

        ScrollReveal().reveal('.section-title', {
            distance: '30px',
            origin: 'top',
            duration: 800,
            delay: 200,
            reset: false
        });

        ScrollReveal().reveal('.about-text, .contact-info, .skills-category, .education-content, .project-card', {
            distance: '30px',
            origin: 'bottom',
            duration: 900,
            delay: 300,
            interval: 100,
            reset: false
        });
    } else {
        console.warn("ScrollReveal library not found. Skipping ScrollReveal animations.");
    }

    // ===== Intersection Observer for 'visible' class (used with ScrollReveal, but defined separately here) =====
    const sections = document.querySelectorAll('.section');
    const sectionObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                // Optional: remove 'visible' class when out of view (uncomment if you want sections to animate in every time they scroll into view)
                // entry.target.classList.remove('visible');
            }
        });
    }, { threshold: 0.2 }); // Trigger when 20% of the section is visible

    sections.forEach(section => sectionObserver.observe(section));

    // ===== Highlight nav link on scroll (Optional, as ScrollReveal also handles visibility) =====
    // This part assumes your navigation links have a class like 'nav-link-item' and their 'href' points to section IDs.
    const navLinksHighlight = document.querySelectorAll('.nav-links a'); // Targeting all nav links

    window.addEventListener('scroll', () => {
        const fromTop = window.scrollY + 120; // Adjust offset as needed for your fixed header
        navLinksHighlight.forEach(link => {
            // Get the target section ID from the href attribute
            const targetId = link.getAttribute('href');
            // Ensure it's an internal link (starts with #) and not just '#'
            if (targetId && targetId.startsWith('#') && targetId.length > 1) {
                const section = document.querySelector(targetId);
                if (section) { // Ensure section exists
                    if (section.offsetTop <= fromTop && section.offsetTop + section.offsetHeight > fromTop) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                }
            }
        });
    });

    // ===== List Technical Skills =====
    const technicalSkillsListContainer = document.getElementById('technicalSkillsList');
    if (technicalSkillsListContainer) {
        const technicalSkills = ['Microsoft Office 365', 'Python Programming', 'C# ASP.NET Programming', 'Java Programming', 'SQL', 'HTML', 'CSS', 'JavaScript'];
        const ul = document.createElement('ul');
        technicalSkills.forEach(skill => {
            const li = document.createElement('li');
            li.textContent = skill;
            ul.appendChild(li);
        });
        technicalSkillsListContainer.appendChild(ul);
    } else {
        console.warn("Element with ID 'technicalSkillsList' not found. Skipping technical skills list initialization.");
    }

    // ===== List Soft Skills =====
    const softSkillsListContainer = document.getElementById('softSkillsList');
    if (softSkillsListContainer) {
        const softSkills = ['Communication Skills', 'Teamwork', 'Problem-Solving', 'Adaptability', 'Time Management', 'Creativity'];
        const ul = document.createElement('ul');
        softSkills.forEach(skill => {
            const li = document.createElement('li');
            li.textContent = skill;
            ul.appendChild(li);
        });
        softSkillsListContainer.appendChild(ul);
    } else {
        console.warn("Element with ID 'softSkillsList' not found. Skipping soft skills list initialization.");
    }
});