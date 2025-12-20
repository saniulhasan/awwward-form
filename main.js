// Video animation (keep existing)
const videoSection = document.querySelector('#video');
const video = document.querySelector('.main__video');
const headerLeft = document.querySelector('.text__header__left');
const headerRight = document.querySelector('.text__header__right');

// Get the main element for scrolling
const mainElement = document.querySelector('main');

// Animation function
function animateVideo() {
    if (!videoSection || !video || !headerLeft || !headerRight) return;
    
    let { bottom } = videoSection.getBoundingClientRect();
    let scale = 1 - ((bottom - window.innerHeight) * .0005);
    scale = scale < .2 ? .2 : scale > 1 ? 1 : scale;
    video.style.transform = `scale(${scale})`;

    // Text transformation
    let textTrans = bottom - window.innerHeight;
    textTrans = textTrans < 0 ? 0 : textTrans;
    headerLeft.style.transform = `translateX(${-textTrans}px)`;
    headerRight.style.transform = `translateX(${textTrans}px)`;
}

// Add scroll event listener
mainElement.addEventListener('scroll', animateVideo);

// Initial call to set initial state
animateVideo();

// GSAP Scroll Animations
gsap.registerPlugin(ScrollTrigger);

const title = document.querySelector(".text__reveal");
const heroSection = document.querySelector("#hero");

// Split text
const letters = title.textContent.split("");
title.innerHTML = letters.map(l => `<span>${l}</span>`).join("");

// Store animation reference
let revealAnimation;

// Animate once on first scroll DOWN
revealAnimation = gsap.to(".text__reveal span", {
  y: 0,
  duration: 0.9,
  ease: "power4.out",
  stagger: 0.12,
  scrollTrigger: {
    trigger: heroSection,
    scroller: "main",
    start: "top 95%",
    once: true,
    onEnter: () => {
      // Reset animation when scrolling up to the top
      gsap.set(".text__reveal span", { y: "110%" });
    },
    // markers: true
  }
});

// Add scroll up animation at the end of hero section
ScrollTrigger.create({
  trigger: "#about",
  scroller: "main",
  start: "top 100%", // When about section touches bottom of viewport
  end: "top 10%",
  onEnterBack: () => {
    // When scrolling up and about section enters from bottom
    animateHeroTextOnScrollUp();
  },
  onLeaveBack: () => {
    // When scrolling up past hero section
    resetHeroText();
  },
  // markers: true // Uncomment to see trigger points
});

// Function to animate hero text when scrolling up
function animateHeroTextOnScrollUp() {
  // Kill any existing animation first
  gsap.killTweensOf(".text__reveal span");
  
  // Animate with different timing when scrolling up
  gsap.to(".text__reveal span", {
    y: "110%",
    duration: 0.3,
    ease: "power3.out",
      stagger: 0.05,
  });
}

// Function to reset hero text to hidden state
function resetHeroText() {
  gsap.to(".text__reveal span", {
    y: 0,
    duration: 0.3,
    ease: "power2.in",
    stagger: 0.05,
    onComplete: () => {
      // Re-enable the original scroll trigger animation
      revealAnimation.scrollTrigger.refresh();
    }
  });
}

// Handle initial page load
window.addEventListener('load', () => {
  ScrollTrigger.refresh();
});