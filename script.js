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

// Start slideshow when page loads
window.addEventListener('load', startSlideshow);

// Start animation when page loads
window.onload = function() {
  // Clear any existing content
  document.getElementById("typewriter").innerHTML = '';
  
  // Start typing
  typeWriter();
};

// Start animation when page loads
window.onload = typeWriter;

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

// Run when page loads
window.addEventListener('load', createBubbles);

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

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
    }
  });
}, { threshold: 0.1 });

observer.observe(aboutSection);

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
