// Projects

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

// Projects animation function
function animateProjects() {
    const projectsSection = document.querySelector('#projects');
    const projectsSticky = document.querySelector('.projects__sticky');
    const projectsSlider = document.querySelector('.projects__slider');
    
    if (!projectsSection || !projectsSticky || !projectsSlider) return;
    
    // Get the position of the projects section relative to viewport
    const rect = projectsSection.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    
    // Calculate progress (0 to 1) as projects section scrolls
    const sectionTop = rect.top;
    const sectionHeight = rect.height;
    
    // Calculate scroll progress through the projects section
    let progress = 0;
    
    // When section enters from bottom
    if (sectionTop < viewportHeight && sectionTop > -sectionHeight) {
        progress = 1 - (sectionTop / (viewportHeight - sectionHeight));
        progress = Math.max(0, Math.min(1, progress)); // Clamp between 0 and 1
    } else if (sectionTop <= -sectionHeight) {
        progress = 1; // Section completely scrolled past
    }
    
    // Calculate translateX based on progress
    const sliderWidth = projectsSlider.scrollWidth;
    const containerWidth = document.querySelector('.slider__container').offsetWidth;
    const maxTranslate = -(sliderWidth - containerWidth);
    
    // Apply the animation with easing
    const translateX = maxTranslate * progress;
    projectsSlider.style.transform = `translateX(${translateX}px)`;
    projectsSlider.style.transition = 'transform 0.1s linear';
}

// Add scroll event listener
mainElement.addEventListener('scroll', () => {
    animateVideo();
    animateProjects();
});

// Initial call to set initial state
animateVideo();
animateProjects();

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
  duration: 0.6,
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
  animateProjects(); // Initialize projects position
});

// Projects array
const projects = [
    {
        name: 'PROJECT ONE',
        type: 'WEB DESIGN',
        pos: 'start',
        image: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&q=80&w=2370&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' 
    },
    {
        name: 'PROJECT 2',
        type: 'GRAPHIC DESIGN',
        pos: 'mid',
        image: 'https://images.unsplash.com/reserve/aOcWqRTfQ12uwr3wWevA_14401305508_804b300054_o.jpg?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2952&q=80' 
    },
    {
        name: 'PROJECT 3',
        type: 'TYPE DESIGN',
        pos: 'end',
        image: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?auto=format&fit=crop&q=80&w=2487&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'    },
    {
        name: 'PROJECT 4',
        type: 'WEB DESIGN',
        pos: 'mid',
        image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=2564&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' 
    },
    {
        name: 'PROJECT 5',
        type: 'WEB DESIGN',
        pos: 'end',
        image: 'https://images.unsplash.com/photo-1604871000636-074fa5117945?auto=format&fit=crop&q=80&w=2487&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' 
    },
    {
        name: 'PROJECT 6',
        type: 'GRAPHIC DESIGN',
        pos: 'mid',
        image: 'https://images.unsplash.com/photo-1561998338-13ad7883b20f?auto=format&fit=crop&q=80&w=2487&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' 
    },
    {
        name: 'PROJECT 7',
        type: 'WEB DESIGN',
        pos: 'start',
        image: 'https://images.unsplash.com/photo-1454117096348-e4abbeba002c?auto=format&fit=crop&q=80&w=2602&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' 
    },
    {
        name: 'PROJECT 8',
        type: 'TYPE DESIGN',
        pos: 'end',
        image: 'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' 
    },
];

// GSAP Projects Animation
function setupProjectsAnimation() {
    const projectsSection = document.querySelector('#projects');
    const projectsSlider = document.querySelector('.projects__slider');
    
    if (!projectsSection || !projectsSlider) return;
    
    const sliderWidth = projectsSlider.scrollWidth;
    const containerWidth = document.querySelector('.slider__container').offsetWidth;
    const maxTranslate = -(sliderWidth - containerWidth);
    
    // Create GSAP animation with ScrollTrigger
    gsap.to(projectsSlider, {
        x: maxTranslate,
        ease: "none",
        scrollTrigger: {
            trigger: "#projects",
            scroller: "main",
            start: "top top",
            end: "bottom bottom",
            scrub: true,
            // markers: true // Uncomment to see trigger points
        }
    });
}

// Call this after creating projects and on window load
window.addEventListener('load', () => {
    ScrollTrigger.refresh();
    setupProjectsAnimation();
});