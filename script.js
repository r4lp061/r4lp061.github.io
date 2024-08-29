const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
const nextButton = document.querySelector('.nav-hover-next');
const prevButton = document.querySelector('.nav-hover-prev');
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
    updateNextButtonState();
    updatePrevButtonState();

}

function nextSlide() {
    if (currentIndex < totalSlides - 1) { 
        currentIndex++;
        updateSliderPosition();
        updateNextButtonState();
        updatePrevButtonState(); // Update the Next button state
    }
}
function prevSlide() {
    if (currentIndex !== 0) { 
        currentIndex--;
        updateSliderPosition();
        updateNextButtonState();
        updatePrevButtonState(); // Update the Next button state
    }
}

function updateNextButtonState() {
    if (currentIndex === totalSlides - 1) {
        nextButton.disabled = true; // Disable the button
        nextButton.style.visibility = 'hidden'; // Optionally hide the button
    } else {
        nextButton.disabled = false; // Enable the button
        nextButton.style.visibility = 'visible'; // Show the button
    }
}
function updatePrevButtonState() {
    if (currentIndex === 0) {
        prevButton.disabled = true; // Disable the button
        prevButton.style.visibility = 'hidden'; // Optionally hide the button
    } else {
        prevButton.disabled = false; // Enable the button
        prevButton.style.visibility = 'visible'; // Show the button
    }
}



slider.addEventListener('touchstart', handleTouchStart);

slider.addEventListener('touchmove', handleTouchMove);

slider.addEventListener('touchend', handleTouchEnd);

nextButton.addEventListener('click', nextSlide);

prevButton.addEventListener('click', prevSlide);

// Handle dot clicks
dots.forEach(dot => {
    dot.addEventListener('click', (event) => {
        currentIndex = parseInt(event.target.getAttribute('data-index'));
        updateSliderPosition();
    });
});

updateNextButtonState()
updatePrevButtonState()
