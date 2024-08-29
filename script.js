const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
const dotsContainer = document.querySelector('.navigation-dots');

let currentIndex = 0;
let startX = 0;
let isDragging = false;

const totalSlides = slides.length;

// Function to create pagination dots
function createDots() {
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        dot.setAttribute('data-index', i);
        dotsContainer.appendChild(dot);
    }
}

createDots();
const dots = document.querySelectorAll('.dot');

function updateSliderPosition() {
    slider.style.transform = `translateX(-${currentIndex * 100}%)`;
    updateDots();
}

function updateDots() {
    dots.forEach(dot => dot.classList.remove('active'));
    dots[currentIndex].classList.add('active');
}

function handleTouchStart(event) {
    startX = event.touches[0].clientX;
    isDragging = true;
}

function handleTouchMove(event) {
    if (isDragging) {
        const currentX = event.touches[0].clientX;
        const deltaX = currentX - startX;
        slider.style.transform = `translateX(${deltaX - currentIndex * 100}%)`;
    }
}

function handleTouchEnd(event) {
    isDragging = false;
    const endX = event.changedTouches[0].clientX; // Update endX here
    const swipeThreshold = 50; // Minimum swipe distance in pixels

    if (startX - endX > swipeThreshold && currentIndex < totalSlides - 1) {
        // Swipe left (next slide)
        currentIndex++;
    } else if (endX - startX > swipeThreshold && currentIndex > 0) {
        // Swipe right (previous slide)
        currentIndex--;
    }
    updateSliderPosition();
}

slider.addEventListener('touchstart', handleTouchStart);

slider.addEventListener('touchmove', handleTouchMove);

slider.addEventListener('touchend', handleTouchEnd);

// Handle dot clicks
dots.forEach(dot => {
    dot.addEventListener('click', (event) => {
        currentIndex = parseInt(event.target.getAttribute('data-index'));
        updateSliderPosition();
    });
});
