document.addEventListener("DOMContentLoaded", () => {
    const slides = document.querySelectorAll(".hero-img");
    let currentSlide = 0;
    const slideInterval = 5000; // Changes image every 5 seconds

    function nextSlide() {
        // Remove active class from current slide
        slides[currentSlide].classList.remove("active");

        // Move to next slide index (loops back to 0 at the end)
        currentSlide = (currentSlide + 1) % slides.length;

        // Add active class to new slide
        slides[currentSlide].classList.add("active");
    }

    if (slides.length > 0) {
        setInterval(nextSlide, slideInterval);
    }
});
