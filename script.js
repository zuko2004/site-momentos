const slides = document.querySelector('.slides');
const slide = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

let index = 0;
let autoPlayInterval;
let isTouching = false;

/* ===== MOSTRAR SLIDE ===== */
function showSlide(i) {
    index = (i + slide.length) % slide.length;
    slides.style.transform = `translateX(-${index * 100}%)`;

    slide.forEach((s, idx) => {
        const img = s.querySelector('img');
        const caption = s.querySelector('.caption');

        img.classList.remove('animate-img');
        caption.classList.remove('animate-caption');

        if (idx === index) {
            void img.offsetWidth; // força reflow
            img.classList.add('animate-img');
            caption.classList.add('animate-caption');
        }
    });
}

/* ===== BOTÕES ===== */
nextBtn.addEventListener('click', () => {
    showSlide(index + 1);
    restartAutoplay();
});

prevBtn.addEventListener('click', () => {
    showSlide(index - 1);
    restartAutoplay();
});

/* ===== AUTOPLAY ===== */
function startAutoplay() {
    autoPlayInterval = setInterval(() => {
        if (!isTouching) {
            showSlide(index + 1);
        }
    }, 5000);
}

function stopAutoplay() {
    clearInterval(autoPlayInterval);
}

function restartAutoplay() {
    stopAutoplay();
    startAutoplay();
}

/* ===== SWIPE MOBILE ===== */
let startX = 0;

slides.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
    isTouching = true;
    stopAutoplay();
});

slides.addEventListener('touchend', e => {
    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;

    if (diff > 50) showSlide(index + 1);
    else if (diff < -50) showSlide(index - 1);

    isTouching = false;
    startAutoplay();
});

/* ===== PAUSA COM MOUSE ===== */
slides.addEventListener('mouseenter', stopAutoplay);
slides.addEventListener('mouseleave', startAutoplay);

/* ===== INICIALIZA ===== */
showSlide(index);
startAutoplay();
