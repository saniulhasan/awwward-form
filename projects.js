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

// ... [rest of your code remains the same until createProjects function] ...

const createProjects = () => {
    projects.forEach(project => {
        let panel = document.createElement('div');
        panel.classList.add('project', `${project.pos}`);

        let imageContainer = document.createElement('div');
        imageContainer.className = `image__container`;

        let image = document.createElement('img');
        image.classList.add('project__image');
        image.src = project.image;

        let projectDetails = document.createElement('div');
        projectDetails.classList.add('project__details');

        let projectTitle = document.createElement('p');
        projectTitle.innerText = project.name;

        let projectType = document.createElement('p');
        projectType.innerText = project.type;

        projectDetails.append(projectTitle, projectType);
        imageContainer.appendChild(image);
        panel.append(imageContainer, projectDetails);

        document.querySelector('.projects__slider').appendChild(panel);
    });
    
    // REMOVE this line - we'll call it only once
    // initProjectsAnimation();
};

// Initialize projects GSAP animation
function initProjectsAnimation() {
    const projectsSlider = document.querySelector('.projects__slider');
    const sliderContainer = document.querySelector('.slider__container');
    
    if (!projectsSlider || !sliderContainer) return;
    
    // Check if animation already exists to prevent duplicates
    if (projectsSlider._hasAnimation) {
        console.log('Projects animation already initialized');
        return;
    }
    
    // Mark as having animation
    projectsSlider._hasAnimation = true;
    
    // Calculate the total width and how much we need to scroll
    const sliderWidth = projectsSlider.scrollWidth;
    const containerWidth = sliderContainer.offsetWidth;
    
    console.log('Slider width:', sliderWidth, 'Container width:', containerWidth);
    
    // Only animate if content is wider than container
    if (sliderWidth > containerWidth) {
        const scrollDistance = -(sliderWidth - containerWidth);
        
        console.log('Creating animation with scroll distance:', scrollDistance);
        
        // Create the horizontal scroll animation
        gsap.to(projectsSlider, {
            x: scrollDistance,
            ease: "none",
            scrollTrigger: {
                trigger: "#projects",
                scroller: "main",
                start: "top top",
                end: "bottom bottom",
                scrub: 1,
                pin: ".projects__sticky",
                anticipatePin: 1,
                markers: true, // Keep this enabled to see what's happening
                invalidateOnRefresh: true,
                onUpdate: (self) => {
                    const progress = self.progress;
                    console.log('Progress:', progress);
                }
            }
        });
        
        // Add parallax or scale effect to project images as they scroll
        const projectImages = document.querySelectorAll('.project__image');
        projectImages.forEach((img, index) => {
            gsap.to(img, {
                scale: 1.1,
                filter: "grayscale(0%)",
                ease: "none",
                scrollTrigger: {
                    trigger: img,
                    scroller: "main",
                    start: "top 80%",
                    end: "bottom 20%",
                    scrub: 1,
                   
                    // markers: true,
                }
            });
        });
    } else {
        console.log('No animation needed - content fits in container');
    }
}

// Handle initial page load - call initProjectsAnimation only once here
window.addEventListener('load', () => {
    // First, create all projects
    createProjects();
    
    // Wait a moment for DOM to update, then initialize animation
    setTimeout(() => {
        initProjectsAnimation();
        ScrollTrigger.refresh();
    }, 500); // Increased timeout to ensure DOM is ready
});

// Add CSS to ensure proper layout
const style = document.createElement('style');
style.textContent = `
    .projects__slider {
        gap: 20px; /* Add gap between projects */
    }
    
    .project {
        flex: 0 0 auto; /* Prevent flex items from shrinking */
        width: 25vw;
        min-width: 300px; /* Minimum width for projects */
    }
`;
document.head.appendChild(style);