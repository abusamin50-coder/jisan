// // Particle Background Animation
// (function () {
//     const canvas = document.getElementById('particle-background-canvas');
//     if (!canvas) return;

//     const ctx = canvas.getContext('2d');
//     let particles = [];
//     let mouse = { x: null, y: null, radius: 30 };
//     let animationId;

//     // Resize canvas
//     function resizeCanvas() {
//         canvas.width = window.innerWidth;
//         canvas.height = window.innerHeight;
//         initParticles();
//     }

//     // Get particle count based on screen size
//     function getParticleCount() {
//         if (window.innerWidth < 640) return 20;
//         if (window.innerWidth < 1024) return 35;
//         return 50;
//     }

//     // Particle class
//     class Particle {
//         constructor() {
//             this.x = Math.random() * canvas.width;
//             this.y = Math.random() * canvas.height;
//             this.vx = (Math.random() - 0.5) * 0.4;
//             this.vy = (Math.random() - 0.5) * 0.4;
//             this.size = Math.random() * 1.5 + 0.5;
//         }

//         update() {
//             this.x += this.vx;
//             this.y += this.vy;

//             if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
//             if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
//         }

//         draw() {
//             ctx.fillStyle = 'rgba(74, 222, 128, 0.6)';
//             ctx.beginPath();
//             ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
//             ctx.fill();
//         }
//     }

//     // Initialize particles
//     function initParticles() {
//         particles = [];
//         const count = getParticleCount();
//         for (let i = 0; i < count; i++) {
//             particles.push(new Particle());
//         }
//     }

//     // Connect particles
//     function connectParticles() {
//         const maxDistance = window.innerWidth < 640 ? 70 : 100;

//         for (let i = 0; i < particles.length; i++) {
//             for (let j = i + 1; j < particles.length; j++) {
//                 const dx = particles[i].x - particles[j].x;
//                 const dy = particles[i].y - particles[j].y;
//                 const distance = Math.sqrt(dx * dx + dy * dy);

//                 if (distance < maxDistance) {
//                     const opacity = (1 - distance / maxDistance) * 0.2;
//                     ctx.strokeStyle = `rgba(74, 222, 128, ${opacity})`;
//                     ctx.lineWidth = 0.8;
//                     ctx.beginPath();
//                     ctx.moveTo(particles[i].x, particles[i].y);
//                     ctx.lineTo(particles[j].x, particles[j].y);
//                     ctx.stroke();
//                 }
//             }
//         }
//     }

//     // Animation loop
//     function animate() {
//         ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
//         ctx.fillRect(0, 0, canvas.width, canvas.height);

//         particles.forEach(particle => {
//             particle.update();
//             particle.draw();
//         });

//         connectParticles();
//         animationId = requestAnimationFrame(animate);
//     }

//     // Mouse/Touch events
//     function handleMouseMove(e) {
//         mouse.x = e.clientX;
//         mouse.y = e.clientY;
//     }

//     function handleTouchMove(e) {
//         if (e.touches.length > 0) {
//             mouse.x = e.touches[0].clientX;
//             mouse.y = e.touches[0].clientY;
//         }
//     }

//     function handleMouseLeave() {
//         mouse.x = null;
//         mouse.y = null;
//     }

//     // Event listeners
//     window.addEventListener('resize', resizeCanvas);
//     canvas.addEventListener('mousemove', handleMouseMove);
//     canvas.addEventListener('touchmove', handleTouchMove);
//     canvas.addEventListener('mouseleave', handleMouseLeave);

//     // Initialize
//     resizeCanvas();
//     animate();

//     // Cleanup function
//     window.particleBackgroundCleanup = function () {
//         cancelAnimationFrame(animationId);
//         window.removeEventListener('resize', resizeCanvas);
//         canvas.removeEventListener('mousemove', handleMouseMove);
//         canvas.removeEventListener('touchmove', handleTouchMove);
//         canvas.removeEventListener('mouseleave', handleMouseLeave);
//     };
// })();


// Navigation Bar (Only this part for hamburger menu)
document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu li a');

    // Hamburger toggle
    if (hamburger) {
        hamburger.addEventListener('click', function (e) {
            e.stopPropagation(); // Prevent event bubbling
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close menu when clicking nav links
    if (navLinks.length > 0) {
        navLinks.forEach(link => {
            link.addEventListener('click', function () {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // Close menu when clicking outside
    document.addEventListener('click', function (e) {
        if (hamburger && navMenu) {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        }
    });
});

//
//

// review section

const cards = document.querySelectorAll('.review-card');
const nextBtn = document.getElementById('nextBtn');
const reviewContainer = document.getElementById('review-container');
let current = 0;
let isAnimating = false; // Prevent multiple clicks during animation

function showCard(index) {
    if (isAnimating) return; // Block if animation is running
    isAnimating = true;

    cards.forEach((card, i) => {
        if (window.innerWidth < 640) { // Mobile only
            if (i === index) {
                card.style.display = 'block';
                // Remove class first to reset animation
                card.classList.remove('slide-horizontal');
                // Force reflow to restart animation
                void card.offsetWidth;
                // Add animation class back
                card.classList.add('slide-horizontal');
            } else {
                card.style.display = 'none';
            }
        } else {
            card.style.display = 'block'; // show all on tablet/laptop
            card.classList.remove('slide-horizontal');
        }
    });

    // Allow next animation after current one completes
    setTimeout(() => {
        isAnimating = false;
    }, 700); // Match with CSS animation duration
}

// Next button click
nextBtn.addEventListener('click', (e) => {
    e.preventDefault(); // Prevent any default behavior
    if (!isAnimating) {
        current = (current + 1) % cards.length;
        showCard(current);
    }
});

// Auto change every 4.5s (only on mobile)
setInterval(() => {
    if (window.innerWidth < 640 && !isAnimating) {
        current = (current + 1) % cards.length;
        showCard(current);
    }
}, 5000);

// Responsive handler
window.addEventListener('resize', () => {
    if (!isAnimating) {
        showCard(current);
    }
});

// Initial load
showCard(current);

