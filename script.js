// Typewriter effect with multi-line text (no cursor)
const lines = [
  "Hello,",
  "I'm Vikum Prabhath",
  "Welcome to my page..."
];
let currentLine = 0;
let currentChar = 0;
const speed = 100; // Typing speed in ms
const lineDelay = 500; // Delay between lines in ms

function typeWriter() {
  const typewriter = document.getElementById("typewriter");
  
  // If we've completed all lines
  if (currentLine >= lines.length) {
    return; // Animation complete
  }
  
  // If we're still typing the current line
  if (currentChar < lines[currentLine].length) {
    // Get or create the current line element
    let lineElement = typewriter.children[currentLine];
    if (!lineElement) {
      lineElement = document.createElement('div');
      typewriter.appendChild(lineElement);
    }
    
    // Add the next character
    lineElement.textContent += lines[currentLine].charAt(currentChar);
    currentChar++;
    setTimeout(typeWriter, speed);
  } 
  // Move to next line
  else {
    currentLine++;
    currentChar = 0;
    setTimeout(typeWriter, lineDelay);
  }
}

function startSlideshow() {
  const images = document.querySelectorAll('.hero-image');
  let currentIndex = 0;
  let nextIndex = 1;
  
  // Show first image immediately
  images[currentIndex].classList.add('active');
  
  // Preload all images to prevent flickering
  images.forEach(img => {
    new Image().src = img.src;
  });

  // Change image every 3 seconds
  setInterval(() => {
    // Get next image index (loop back to 0 after last)
    nextIndex = (currentIndex + 1) % images.length;
    
    // First fade out current image
    images[currentIndex].classList.remove('active');
    
    // After fade out completes, fade in next image
    setTimeout(() => {
      images[nextIndex].classList.add('active');
      currentIndex = nextIndex;
    }, 1000); // Matches our 1s transition time
  }, 4000); // 3s display + 1s transition = 4s total
}

// Create bubbles
function createBubbles() {
  const bubbles = document.querySelector('.bubbles');
  const bubbleCount = 20; // Number of bubbles
  
  for (let i = 0; i < bubbleCount; i++) {
    const bubble = document.createElement('div');
    bubble.classList.add('bubble');
    
    // Random size (10px to 100px)
    const size = Math.random() * 90 + 10;
    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;
    
    // Random position
    bubble.style.left = `${Math.random() * 100}%`;
    
    // Random animation duration (10s to 20s)
    bubble.style.animationDuration = `${Math.random() * 10 + 10}s`;
    
    // Random delay (0s to 5s)
    bubble.style.animationDelay = `${Math.random() * 5}s`;
    
    bubbles.appendChild(bubble);
  }
}

// Particle Effect
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff'];

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 5 + 1;
    this.color = colors[Math.floor(Math.random() * colors.length)];
    this.speedX = Math.random() * 3 - 1.5;
    this.speedY = Math.random() * 3 - 1.5;
  }
  
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.size > 0.2) this.size -= 0.1;
  }
  
  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function handleParticles() {
  for (let i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].draw();
    
    if (particles[i].size <= 0.2) {
      particles.splice(i, 1);
      i--;
    }
  }
}

let mouseX = null;
let mouseY = null;

window.addEventListener('mousemove', (event) => {
  mouseX = event.x;
  mouseY = event.y;
  
  for (let i = 0; i < 5; i++) {
    particles.push(new Particle(mouseX, mouseY));
  }
});

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  handleParticles();
  requestAnimationFrame(animate);
}

animate();

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// Intersection Observer for scroll animations
const aboutSection = document.querySelector('.about-section');
const servicesSection = document.querySelector('.services-section');
const projectsSection = document.querySelector('.projects-section');
const contactSection = document.querySelector('.contact-section');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
    }
  });
}, { threshold: 0.1 });

observer.observe(aboutSection);
observer.observe(servicesSection);
observer.observe(projectsSection);
observer.observe(contactSection);

// Skill boxes animation on hover
const skillBoxes = document.querySelectorAll('.skill-box');

skillBoxes.forEach(box => {
  box.addEventListener('mouseenter', () => {
    box.style.transform = 'translateY(-5px)';
    box.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.1)';
  });
  
  box.addEventListener('mouseleave', () => {
    box.style.transform = '';
    box.style.boxShadow = '';
  });
});

// Certificate Popup Functionality
document.addEventListener('DOMContentLoaded', function() {
  // Open popup when clicking "View Certificate"
  document.querySelectorAll('.certificate-link a').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      document.querySelector('.certificate-popup').classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  // Close popup when clicking close button (fixed version)
  const closeBtn = document.querySelector('.close-popup');
  if (closeBtn) {
    closeBtn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopImmediatePropagation();
      
      const popup = document.querySelector('.certificate-popup');
      popup.classList.remove('active');
      document.body.style.overflow = '';
      
      // Force remove any leftover classes
      popup.className = popup.className.replace('active', '').trim();
    });
  }

  // Close when clicking overlay
  const overlay = document.querySelector('.popup-overlay');
  if (overlay) {
    overlay.addEventListener('click', function() {
      document.querySelector('.certificate-popup').classList.remove('active');
      document.body.style.overflow = '';
    });
  }
});

// Projects Show More/Less functionality
document.addEventListener('DOMContentLoaded', function() {
  const viewAllBtn = document.getElementById('view-all-btn');
  const projectsGrid = document.querySelector('.projects-grid');
  const hiddenProjects = document.querySelectorAll('.hidden-project');
  
  if (viewAllBtn && projectsGrid && hiddenProjects.length) {
    viewAllBtn.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Toggle the show-all class
      projectsGrid.classList.toggle('show-all');
      
      // Animate the hidden projects
      hiddenProjects.forEach((project, index) => {
        if (projectsGrid.classList.contains('show-all')) {
          // Show projects with staggered animation
          setTimeout(() => {
            project.style.opacity = '1';
            project.style.transform = 'translateY(0)';
          }, index * 100);
          viewAllBtn.textContent = 'Show Less';
        } else {
          // Hide projects
          project.style.opacity = '0';
          project.style.transform = 'translateY(20px)';
          viewAllBtn.textContent = 'View All Projects';
        }
      });
    });
  }
});

// Contact Form Submission
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contactForm');
  const contactBubble = document.querySelector('.contact-bubble');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form values
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const subject = document.getElementById('subject').value;
      const message = document.getElementById('message').value;
      
      // Here you would typically send the form data to a server
      console.log('Form submitted:', { name, email, subject, message });
      
      // Show success message (replace with actual form submission)
      alert('Thank you for your message! I will get back to you soon.');
      contactForm.reset();
    });
  }
  
  if (contactBubble) {
    contactBubble.addEventListener('click', function() {
      // Scroll to contact section
      document.getElementById('contact').scrollIntoView({
        behavior: 'smooth'
      });
    });
  }
});

// Footer Year Update
document.getElementById('year').textContent = new Date().getFullYear();

// Back to Top Button
window.addEventListener('scroll', function() {
  const backToTop = document.querySelector('.back-to-top');
  if (window.scrollY > 300) {
    backToTop.classList.add('active');
  } else {
    backToTop.classList.remove('active');
  }
});

// Newsletter Form
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = this.querySelector('input').value;
    // Add your newsletter submission logic here
    alert('Thank you for subscribing!');
    this.reset();
  });
}

// Initialize footer animations
const footer = document.querySelector('.footer-container');
const footerObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = 1;
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

if (footer) {
  footerObserver.observe(footer);
}

// Combined window.onload event handler
window.addEventListener('load', function() {
  // Start slideshow
  startSlideshow();
  
  // Initialize typewriter
  document.getElementById("typewriter").innerHTML = '';
  typeWriter();
  
  // Create bubbles
  createBubbles();
});