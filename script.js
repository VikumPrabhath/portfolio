// Typewriter Effect
const text = "Hi, I'm Vikum";
let i = 0;
const speed = 100; // Typing speed in ms

function typeWriter() {
    if (i < text.length) {
        document.getElementById("typewriter").textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, speed);
    }
}

// Start animation when page loads
window.onload = typeWriter;