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
      await music.play();      // 🔥 kullanıcı tıkı = garanti
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

/* ===== CANVAS PARTİKÜL ===== */
let w, h;
function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

const particles = [];

function spawn() {
  particles.push({
    x: w / 2,
    y: h / 2,
    vx: (Math.random() - 0.5) * 2.2,
    vy: (Math.random() - 0.5) * 2.2,
    r: Math.random() * 2 + 1,
    life: 100
  });
}

function animate() {
  ctx.clearRect(0, 0, w, h);

  particles.forEach((p, i) => {
    p.x += p.vx;
    p.y += p.vy;
    p.life--;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,42,109,${p.life / 100})`;
    ctx.fill();

    if (p.life <= 0) particles.splice(i, 1);
  });

  requestAnimationFrame(animate);
}

setInterval(spawn, 120);
animate();
