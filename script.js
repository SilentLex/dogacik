const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");

const heart = document.getElementById("heart");
const overlay = document.getElementById("overlay");
const closeBtn = document.getElementById("close");

const music = document.getElementById("music");
const soundBtn = document.getElementById("soundBtn");

let soundOn = false;

/* ===== SES KONTROL ===== */
soundBtn.addEventListener("click", async () => {
  try {
    if (!soundOn) {
      music.volume = 0.6;
      await music.play(); // kullanıcı etkileşimi = garanti
      soundBtn.textContent = "🔊";
      soundOn = true;
    } else {
      music.pause();
      soundBtn.textContent = "🔇";
      soundOn = false;
    }
  } catch (e) {
    console.log("Ses engellendi:", e);
  }
});

/* ===== KALP TIK ===== */
heart.addEventListener("click", () => {
  overlay.classList.add("active");
});

closeBtn.addEventListener("click", () => {
  overlay.classList.remove("active");
});

/* ===== CANVAS BOYUT ===== */
let w, h;
function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

/* ===== MOUSE TAKİBİ ===== */
let mouseX = w / 2;
let mouseY = h / 2;
let moving = false;
let moveTimeout;

window.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  moving = true;

  clearTimeout(moveTimeout);
  moveTimeout = setTimeout(() => {
    moving = false;
  }, 120);
});

/* ===== PARTİKÜL SİSTEMİ ===== */
const particles = [];

function spawn() {
  particles.push({
    x: mouseX,
    y: mouseY,
    vx: (Math.random() - 0.5) * 1.6,
    vy: (Math.random() - 0.5) * 1.6,
    r: Math.random() * 2 + 1,
    life: 80
  });
}

function animate() {
  ctx.clearRect(0, 0, w, h);

  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];

    p.x += p.vx;
    p.y += p.vy;
    p.life--;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,42,109,${p.life / 80})`;
    ctx.fill();

    if (p.life <= 0) {
      particles.splice(i, 1);
    }
  }

  requestAnimationFrame(animate);
}

/* ===== SADECE HAREKETTEYKEN ÜRET ===== */
setInterval(() => {
  if (moving) spawn();
}, 80);

animate();

/* ===== CUSTOM CURSOR ===== */
const cursor = document.getElementById("cursor");

if (cursor) {
  window.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top  = e.clientY + "px";
  });

  window.addEventListener("mousedown", () => {
    cursor.style.transform = "translate(-50%, -50%) scale(1.8)";
  });

  window.addEventListener("mouseup", () => {
    cursor.style.transform = "translate(-50%, -50%) scale(1)";
  });
}



