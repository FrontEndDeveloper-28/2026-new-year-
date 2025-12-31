const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let fireworks = [];
let particles = [];

// Resize support
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// Firework (Rocket)
class Firework {
  constructor(x) {
    this.x = x || Math.random() * canvas.width;
    this.y = canvas.height;
    this.targetY = Math.random() * canvas.height / 2 + 50;
    this.speed = 6;
  }

  update() {
    this.y -= this.speed;
    this.draw();

    if (this.y <= this.targetY) {
      this.explode();
      return true;
    }
    return false;
  }

  draw() {
    ctx.fillStyle = "white";
    ctx.fillRect(this.x, this.y, 3, 8);
  }

  explode() {
    for (let i = 0; i < 50; i++) {
      particles.push(new Particle(this.x, this.y));
    }
  }
}

// Explosion Particles
class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.angle = Math.random() * Math.PI * 2;
    this.speed = Math.random() * 6 + 2;
    this.life = 100;
    this.color = `hsl(${Math.random() * 360},100%,60%)`;
  }

  update() {
    this.speed *= 0.98; // friction
    this.x += Math.cos(this.angle) * this.speed;
    this.y += Math.sin(this.angle) * this.speed + 0.5; // gravity
    this.life--;
    this.draw();
    return this.life <= 0;
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, 3, 3);
  }
}

// Click to launch firework
canvas.addEventListener("click", (e) => {
  fireworks.push(new Firework(e.clientX));
});

// Animation Loop
function animate() {
  ctx.fillStyle = "rgba(0,0,0,0.2)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Auto fireworks
  if (Math.random() < 0.03) {
    fireworks.push(new Firework());
  }

  fireworks = fireworks.filter(f => !f.update());
  particles = particles.filter(p => !p.update());

  // Glowing Text
  ctx.font = "42px Arial";
  ctx.textAlign = "center";
  ctx.fillStyle = "rgba(255,255,255,0.85)";
  ctx.fillText("🎉 Happy New Year 2026 🎉", canvas.width / 2, 90);

  requestAnimationFrame(animate);
}

animate();
