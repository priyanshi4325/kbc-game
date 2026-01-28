// Get amount from URL ?amount=xxxx
const params = new URLSearchParams(window.location.search);
const finalAmount = parseInt(params.get("amount")) || 0;

// Animate the amount
const display = document.getElementById("amountDisplay");

function animateAmount(start, end, duration) {
    const startTime = performance.now();

    function update(now) {
        let progress = Math.min((now - startTime) / duration, 1);
        let value = Math.floor(start + (end - start) * progress);
        display.textContent = "₹" + value.toLocaleString();

        if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
}

animateAmount(0, finalAmount, 1200);
