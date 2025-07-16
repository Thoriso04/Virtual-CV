// ===== Typing Effect for Hero Section (Inspired by Video 1 & 5) =====
const typingTextElement = document.querySelector('.typing-text');
const professions = ["Software Developer.", "IT Student.", "Problem Solver."];
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

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(type, 1500); // Start the typing animation after a brief delay
});

// ===== ScrollReveal Animations (Inspired by Video 5) =====
// General reveal for all sections
ScrollReveal().reveal('.section', {
  distance: '60px',
  origin: 'bottom',
  duration: 1000,
  easing: 'ease-in-out',
  interval: 200,
  reset: false
});

// Specific animations for titles and text
ScrollReveal().reveal('.section-title', {
    distance: '30px',
    origin: 'top',
    duration: 800,
    delay: 200
});

// ===== Chart.js for Skills (Inspired by Video 3 & 4) =====
// Technical Skills Chart
const techCtx = document.getElementById('technicalSkillsChart').getContext('2d');
new Chart(techCtx, {
  type: 'bar',
  data: {
    labels: ['Python', 'C# ASP.NET', 'Java', 'SQL', 'Microsoft Office 365', 'Requirements Gathering', 'ERD', 'Logical & Physical Design', 'Use Cases'],
    datasets: [{
      label: 'Proficiency (%)',
      data: [70, 65, 55, 40, 90, 60, 65, 70, 75],
      backgroundColor: 'rgba(30, 144, 255, 0.8)',
      borderColor: 'rgba(30, 144, 255, 1)',
      borderWidth: 1,
      borderRadius: 5
    }]
  },
  options: {
    indexAxis: 'y', // Horizontal bars
    scales: {
      x: {
        max: 100,
        beginAtZero: true,
        grid: { display: false },
        ticks: {
          stepSize: 20,
          callback: value => value + '%'
        }
      },
      y: {
        beginAtZero: true,
        grid: { display: false }
      }
    },
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true }
    },
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 1500, // Smooth animation on load
      easing: 'easeInOutQuad'
    }
  }
});

// Soft Skills Chart
const softCtx = document.getElementById('softSkillsChart').getContext('2d');
new Chart(softCtx, {
  type: 'bar',
  data: {
    labels: ['Problem Solving', 'Communication', 'Critical Thinking'],
    datasets: [{
      label: 'Proficiency (%)',
      data: [80, 75, 75],
      backgroundColor: 'rgba(144, 238, 144, 0.8)',
      borderColor: 'rgba(34, 139, 34, 1)',
      borderWidth: 1,
      borderRadius: 5
    }]
  },
  options: {
    indexAxis: 'y',
    scales: {
      x: {
        max: 100,
        beginAtZero: true,
        grid: { display: false },
        ticks: {
          stepSize: 20,
          callback: value => value + '%'
        }
      },
      y: {
        beginAtZero: true,
        grid: { display: false }
      }
    },
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true }
    },
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 1500,
      easing: 'easeInOutQuad'
    }
  }
});