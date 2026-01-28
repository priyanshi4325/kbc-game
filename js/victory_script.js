/* -------------------------
 Confetti + Amount Animation
-------------------------- */

// Canvas Setup
const canvas = document.getElementById("confettiCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const confettiPieces = [];

for (let i = 0; i < 150; i++) {
    confettiPieces.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        size: Math.random() * 8 + 4,
        speedY: Math.random() * 4 + 2,
        color: `hsl(${Math.random() * 360}, 90%, 60%)`,
        rotate: Math.random() * 360,
        rotateSpeed: Math.random() * 10 - 5
    });
}

function animateConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    confettiPieces.forEach(p => {
        p.y += p.speedY;
        p.rotate += p.rotateSpeed;

        // Reset when off-screen
        if (p.y > canvas.height) {
            p.y = -10;
            p.x = Math.random() * canvas.width;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotate * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(0, 0, p.size, p.size * 0.5);
        ctx.restore();
    });

    requestAnimationFrame(animateConfetti);
}

animateConfetti(); // Start animation


/* -------------------------
 Winning Amount Animation
-------------------------- */

const params = new URLSearchParams(window.location.search);
const winAmount = parseInt(params.get("amount")) || 0;

const amountEl = document.getElementById("victoryAmount");

function animateAmount(start, end, duration) {
    const startTime = performance.now();

    function update(now) {
        let progress = Math.min((now - startTime) / duration, 1);
        let value = Math.floor(start + (end - start) * progress);
        amountEl.textContent = "₹" + value.toLocaleString();

        if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
}

animateAmount(0, winAmount, 1500);
