// Register the datalabels plugin globally (CRITICAL for charts with datalabels)
Chart.register(ChartDataLabels);

// ===== Typing Effect for Hero Section =====
const typingTextElement = document.querySelector('.typing-text');
const professions = ["Software Developer.", "IT Student."]; // Corrected if needed, keeping generic for flexibility
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
                const headerOffset = document.querySelector('header').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - headerOffset - 20;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
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


  // ===== ScrollReveal animations =====
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


  // ===== Intersection Observer for 'visible' class (used with ScrollReveal, but defined separately here) =====
  const sections = document.querySelectorAll('.section');
  const sectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add('visible');
          } else {
              // Optional: remove 'visible' class when out of view
              // entry.target.classList.remove('visible');
          }
      });
  }, { threshold: 0.2 }); // Trigger when 20% of the section is visible

  sections.forEach(section => sectionObserver.observe(section));

  // ===== Highlight nav link on scroll (Optional, as ScrollReveal also handles visibility) =====
  const navLinksHighlight = document.querySelectorAll('.nav-link-item');

  window.addEventListener('scroll', () => {
    const fromTop = window.scrollY + 120; // Adjust offset as needed for your fixed header
    navLinksHighlight.forEach(link => {
      const section = document.querySelector(link.getAttribute('href'));
      if (section) { // Ensure section exists
          if (section.offsetTop <= fromTop && section.offsetTop + section.offsetHeight > fromTop) {
              link.classList.add('active');
          } else {
              link.classList.remove('active');
          }
      }
    });
  });


  // ===== Chart.js - Technical Skills =====
  const technicalSkillsCtx = document.getElementById('technicalSkillsChart').getContext('2d');
  new Chart(technicalSkillsCtx, {
      type: 'bar',
      data: {
          labels: ['Microsoft Office 365', 'Python Programming', 'C# ASP.NET Programming', 'Java Programming', 'SQL', 'HTML', 'CSS', 'JavaScript'],
          datasets: [{
              label: 'Proficiency (%)',
              data: [90, 75, 70, 50, 45, 40, 40, 45], // Added proficiency %
              backgroundColor: 'rgba(30, 144, 255, 0.8)',
              borderColor: 'rgba(30, 144, 255, 1)',
              borderWidth: 1,
              borderRadius: 5
          }]
      },
      options: {
          indexAxis: 'y', // Horizontal bars
          responsive: true,
          maintainAspectRatio: false,
          scales: {
              x: {
                  max: 100,
                  beginAtZero: true,
                  grid: { display: false },
                  ticks: {
                      stepSize: 20,
                      callback: value => value + '%' // Add % to ticks
                  }
              },
              y: {
                  beginAtZero: true,
                  grid: { display: false }
              }
          },
          plugins: {
              legend: { display: false },
              tooltip: { enabled: true },
              datalabels: { // Datalabels plugin configuration
                  display: true,
                  align: 'end',
                  anchor: 'end',
                  formatter: (value) => value + '%', // Show value as percentage
                  color: '#333', // Dark color for readability on light bars
                  font: {
                      weight: 'bold'
                  },
                  offset: 8
              }
          },
          animation: {
              duration: 1500,
              easing: 'easeInOutQuad'
          }
      },
      plugins: [ChartDataLabels] // Register plugin for this chart instance
  });

  // ===== Chart.js - Soft Skills (Radar Chart) =====
  const softSkillsCtx = document.getElementById('softSkillsChart').getContext('2d');
  new Chart(softSkillsCtx, {
      type: 'radar',
      data: {
          labels: ['Communication Skills', 'Teamwork', 'Problem-Solving', 'Adaptability', 'Time Management', 'Creativity'],
          datasets: [{
              label: 'Proficiency',
              data: [85, 80, 85, 75, 90, 70],
              backgroundColor: 'rgba(102, 164, 205, 0.04)',
              borderColor: 'rgba(5, 133, 252, 1)',
              pointBackgroundColor: 'rgba(5, 133, 252, 1)',
              borderWidth: 2
          }]
      },
      options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
              legend: {
                  display: false
              },
              tooltip: { enabled: true },
              datalabels: { // Datalabels plugin configuration for radar chart
                  display: true,
                  formatter: (value) => value + '%', // Show value as percentage
                  color: '#333', // Dark color for readability
                  font: {
                      weight: 'bold'
                  },
                  anchor: 'end', // Position label outside the point
                  align: 'end'
              }
          },
          scales: {
              r: {
                  beginAtZero: true,
                  max: 100,
                  ticks: {
                      display: false,
                      stepSize: 20,
                      color: '#333', // Make radar ticks (numbers) visible on dark background
                      backdropColor: 'transparent' // No background behind labels
                  },
                  pointLabels: {
                      color: '#333' // Make point labels (skills names) visible on dark background
                  },
                  grid: {
                      color: 'rgba(255, 255, 255, 0.2)' // Lighter grid lines
                  },
                  angleLines: {
                      color: 'rgba(255, 255, 255, 0.2)' // Lighter angle lines
                  }
              }
          },
          animation: {
              duration: 1500,
              easing: 'easeInOutQuad'
          }
      },
      plugins: [ChartDataLabels] // Register plugin for this chart instance
  });
});