document.addEventListener("DOMContentLoaded", () => {
    const wrongBtn = document.getElementById("wrongBtn");
    const correctBtn = document.getElementById("correctBtn");
    const popup = document.getElementById("popup");
    const closePopup = document.getElementById("closePopup");

    // Hàm di chuyển nút "Không"
    function moveButton() {
        const containerWidth = window.innerWidth; // Chiều rộng của màn hình
        const containerHeight = window.innerHeight; // Chiều cao của màn hình
        const btnWidth = wrongBtn.offsetWidth; // Chiều rộng nút
        const btnHeight = wrongBtn.offsetHeight; // Chiều cao nút

        // Tính vị trí ngẫu nhiên
        const randomX = Math.random() * (containerWidth - btnWidth);
        const randomY = Math.random() * (containerHeight - btnHeight);

        // Cập nhật vị trí của nút
        wrongBtn.style.position = "absolute";
        wrongBtn.style.left = `${randomX}px`;
        wrongBtn.style.top = `${randomY}px`;
    }

    // Thêm sự kiện di chuyển nút
    wrongBtn.addEventListener("mouseover", moveButton); // Dành cho desktop
    wrongBtn.addEventListener("touchstart", moveButton); // Dành cho thiết bị cảm ứng

    // Hiển thị popup khi chọn đúng
    correctBtn.addEventListener("click", () => {
        popup.classList.remove("hidden");
        startFireworks();
    });

    // Đóng popup
    closePopup.addEventListener("click", () => {
        popup.classList.add("hidden");
        stopFireworks();
    });

    // Pháo hoa
    const canvas = document.getElementById("fireworkCanvas");
    const ctx = canvas.getContext("2d");
    let particles = [];
    let animationFrame;

    function startFireworks() {
        canvas.width = window.innerWidth;
        canvas.height = 300;

        function createParticle() {
            const particle = {
                x: Math.random() * canvas.width,
                y: canvas.height,
                size: Math.random() * 3 + 1,
                speedX: Math.random() * 2 - 1,
                speedY: Math.random() * -5 - 2,
                color: `hsl(${Math.random() * 360}, 100%, 50%)`,
                opacity: 1,
                fade: 0.03
            };
            particles.push(particle);
        }

        function drawParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach((particle, index) => {
                ctx.fillStyle = particle.color;
                ctx.globalAlpha = particle.opacity;
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fill();

                // Update
                particle.x += particle.speedX;
                particle.y += particle.speedY;
                particle.opacity -= particle.fade;

                // Remove faded particles
                if (particle.opacity <= 0) {
                    particles.splice(index, 1);
                }
            });
        }

        function updateFireworks() {
            createParticle();
            drawParticles();
            animationFrame = requestAnimationFrame(updateFireworks);
        }

        updateFireworks();
    }

    function stopFireworks() {
        cancelAnimationFrame(animationFrame);
        particles = [];
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
});
