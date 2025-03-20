// Scroll-to-Top Button Functionality
window.onscroll = function () {
  const scrollToTopButton = document.getElementById('scrollToTop');
  if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
    scrollToTopButton.style.display = 'block';
  } else {
    scrollToTopButton.style.display = 'none';
  }
};

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Theme Toggle Functionality
const themeToggle = document.querySelector('.theme-toggle');
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light-mode');
  const icon = themeToggle.querySelector('i');
  if (document.body.classList.contains('light-mode')) {
    icon.classList.remove('fa-sun');
    icon.classList.add('fa-moon');
  } else {
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
  }
});

// Dynamic Greeting Based on Time
function displayGreeting() {
  const greetingElement = document.createElement('div');
  greetingElement.className = 'greeting';
  const hours = new Date().getHours();
  let greetingMessage = '';

  if (hours < 12) {
    greetingMessage = 'Good Morning!';
  } else if (hours < 18) {
    greetingMessage = 'Good Afternoon!';
  } else {
    greetingMessage = 'Good Evening!';
  }

  greetingElement.innerHTML = `<h2>${greetingMessage}</h2>`;
  document.querySelector('.hero-section').prepend(greetingElement);
}

displayGreeting();

// AI Chatbot Interaction
const chatbot = document.getElementById('chatbot1');
chatbot.addEventListener('click', () => {
  alert('Welcome to the Chart Assistant! How can I help you today?');
});

// Add Animation to Hero Section on Load
window.onload = function () {
  const heroSection = document.querySelector('.hero-section');
  heroSection.style.opacity = 0;
  heroSection.style.transform = 'translateY(20px)';
  setTimeout(() => {
    heroSection.style.transition = 'all 1s ease-in-out';
    heroSection.style.opacity = 1;
    heroSection.style.transform = 'translateY(0)';
  }, 200);
};

// Search Box Placeholder Animation
const searchBox = document.getElementById('search-box');
searchBox.addEventListener('focus', () => {
  searchBox.setAttribute('placeholder', 'Type to search...');
});
searchBox.addEventListener('blur', () => {
  searchBox.setAttribute('placeholder', 'Search...');
});

// Add Hover Effect to Sidebar Links
const sidebarLinks = document.querySelectorAll('.sidebar ul li a');
sidebarLinks.forEach((link) => {
  link.addEventListener('mouseover', () => {
    link.style.transform = 'scale(1.1)';
    link.style.transition = 'transform 0.3s ease-in-out';
  });
  link.addEventListener('mouseout', () => {
    link.style.transform = 'scale(1)';
  });
});

// Animate Footer Social Icons
const socialIcons = document.querySelectorAll('.footer .social-icons a');
socialIcons.forEach((icon) => {
  icon.addEventListener('mouseover', () => {
    icon.style.color = '#f59e0b';
    icon.style.transform = 'rotate(360deg)';
    icon.style.transition = 'all 0.5s ease-in-out';
  });
  icon.addEventListener('mouseout', () => {
    icon.style.color = '#facc15';
    icon.style.transform = 'rotate(0deg)';
  });
});