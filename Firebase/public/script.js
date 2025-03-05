function appendValue(value) {
    document.getElementById("display").value += value;
}
function clearDisplay() {
    document.getElementById("display").value = "";
}
function deleteLast() {
    let current = document.getElementById("display").value;
    document.getElementById("display").value = current.slice(0, -1);
}
function calculateResult() {
    try {
        let result = eval(document.getElementById("display").value);
        document.getElementById("display").value = result;
    } catch (error) {
        alert("Invalid Expression");
    }
}
const canvas = document.getElementById("fireCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const particles = [];
class Particle {
    constructor(x, y, size, speedX, speedY, color) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.speedX = speedX;
        this.speedY = speedY;
        this.color = color;
    }
    update() {
        this.x += this.speedX;
        this.y -= this.speedY;
        this.size *= 0.98;
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI *2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}
function generateParticles() {
    for (let i = 0; i < 5; i++) {
        let x = Math.random() * canvas.width;
        let y = canvas.height;
        let size = Math.random() * 10 + 5;
        let speedX = (Math.random() - 0.5) * 2;
        let speedY = Math.random() * 3 + 2;
        let colors = x < canvas.width / 2 ? ["#00aaff", "#0088ff"] : ["#ff4000", "#ff8000"]; // Left = Blue, Right = Red
        let color = colors[Math.floor(Math.random() * colors.length)];
        
        particles.push(new Particle(x, y, size, speedX, speedY, color));
    }
}
function updateParticles() {
    for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        if (particles[i].size < 1) {
            particles.splice(i, 1);
        }
    }
}   
function drawParticles() {
    for (let particle of particles) {
        particle.draw();
    }
}
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    generateParticles();
    updateParticles();
    drawParticles();
    requestAnimationFrame(animate);
}
animate();