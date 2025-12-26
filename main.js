// Video animation
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
if (title) {
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
                if (revealAnimation && revealAnimation.scrollTrigger) {
                    revealAnimation.scrollTrigger.refresh();
                }
            }
        });
    }
}

// Projects array
const projects = [
    {
        name: 'PROJECT ONE',
        type: 'WEB DESIGN',
        pos: 'start',
         image: './images/corporate.gif' 
    },
    {
        name: 'PROJECT 2',
        type: 'GRAPHIC DESIGN',
        pos: 'mid',
         image: './images/3.jpg' 
    },
    {
        name: 'PROJECT 3',
        type: 'TYPE DESIGN',
        pos: 'end',
        image: './images/1.jpg'  
    
    },
    {
        name: 'PROJECT 4',
        type: 'WEB DESIGN',
        pos: 'mid',
       image: './images/5.jpg' 
    },
    {
        name: 'PROJECT 5',
        type: 'WEB DESIGN',
        pos: 'end',
         image: './images/6.jpg' 
    },
    {
        name: 'PROJECT 6',
        type: 'GRAPHIC DESIGN',
        pos: 'mid',
         image: './images/flower-blooming.gif' 
    },
    {
        name: 'PROJECT 7',
        type: 'WEB DESIGN',
        pos: 'start',
         image: './images/5.jpg' 
    },
    {
        name: 'PROJECT 8',
        type: 'TYPE DESIGN',
        pos: 'end',
        image: './images/2.jpg' 
    },
];

// Create projects
const createProjects = () => {
    const slider = document.querySelector('.projects__slider');
    if (!slider) return;
    
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

        slider.appendChild(panel);
    });
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
                markers: false,
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
                    start: "center 80%",
                    end: "center 20%",
                    scrub: 1,
                }
            });
        });
    } else {
        console.log('No animation needed - content fits in container');
    }
}

// Handle initial page load
window.addEventListener('load', () => {
    // First, create all projects
    createProjects();
    
    // Wait a moment for DOM to update, then initialize animation
    setTimeout(() => {
        initProjectsAnimation();
        ScrollTrigger.refresh();
    }, 500);
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
    
    /* Discover section styles */
    .text__left, .text__right {
        position: absolute;
        will-change: transform;
        transition: transform 0.1s linear;
    }
    
    .text__left {
        left: 10%;
    }
    
    .text__right {
        right: 10%;
    }
    
    .discover__container {
        position: relative;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
`;
document.head.appendChild(style);

// Blog text animation
const blogTitle = document.querySelector(".blog__reveal");
const blogSection = document.querySelector("#blog");

if (blogTitle && blogSection) {
    // Split text into individual letters
    const blogLetters = blogTitle.textContent.split("");
    blogTitle.innerHTML = blogLetters.map(l => `<span>${l}</span>`).join("");

    // Animate on scroll
    gsap.to(".blog__reveal span", {
        y: 0,
        duration: 0.6,
        ease: "power4.out",
        stagger: 0.12,
        scrollTrigger: {
            trigger: blogSection,
            scroller: "main",
            start: "top 80%",
            once: false,
            onEnter: () => {
                gsap.set(".blog__reveal span", { y: "110%" });
            },
        }
    });

    // Animate out when scrolling past
    ScrollTrigger.create({
        trigger: blogSection,
        scroller: "main",
        start: "top 20%",
        end: "top -20%",
        onLeave: () => {
            gsap.to(".blog__reveal span", {
                y: "0",
                duration: 0.2,
                ease: "power3.in",
                stagger: 0.03
            });
        },
        onEnterBack: () => {
            gsap.to(".blog__reveal span", {
                y: "100%",
                duration: 0.2,
                ease: "power3.out",
                stagger: 0.03
            });
        },
    });
}

// Blog posts array
const blogPosts = [
    {
        title: 'BLOG POST ONE',
        time: '3 MIN',
        image: 'https://images.unsplash.com/photo-1561998338-13ad7883b20f?auto=format&fit=crop&q=80&w=2487&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' 
    },
    {
        title: 'BLOG POST TWO',
        time: '4 MIN',
        image: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&q=80&w=2370&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' 
    },
    {
        title: 'BLOG POST THREE',
        time: '5 MIN',
        image: 'https://images.unsplash.com/photo-1454117096348-e4abbeba002c?auto=format&fit=crop&q=80&w=2602&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' 
    }
]

// Create blog posts
const createBlogposts = () => {
    blogPosts.forEach(post => {
        let blogPostSection = document.createElement('div');
        blogPostSection.classList.add('blog__post');

        let postDiv = document.createElement('div');
        postDiv.classList.add('post');

        let imageContainer = document.createElement('div');
        imageContainer.classList.add('post__image__container');

        let image = document.createElement('img');
        image.classList.add('blog__post__img');
        image.src = post.image;

        let postDetails = document.createElement('div');
        postDetails.classList.add('post__details');

        let postTitle = document.createElement('p');
        postTitle.innerText = post.title;

        let postTime = document.createElement('p');
        postTime.innerText = post.time;

        imageContainer.appendChild(image);
        postDetails.append(postTitle, postTime);
        postDiv.append(imageContainer, postDetails);
        blogPostSection.appendChild(postDiv);

        document.getElementById('blog').appendChild(blogPostSection);
    });
}

createBlogposts();

// Circle animation
const circleSection = document.getElementById('circle__section');
const circle = document.querySelector('.circle');
const circleH2 = document.querySelector('.circle__sticky h2'); // Get the h2 element

function scrollCircle() {
    if (!circleSection || !circle || !circleH2) return;
    
    let { top } = circleSection.getBoundingClientRect();
    let scaleTop = Math.abs(top);
    let scale = (scaleTop / window.innerHeight);
    scale = scale < 0 ? 0 : scale > 1 ? 1 : scale;
    
    if (top <= 0) {
        // When circle starts scaling, show the h2
        circle.style.transform = `translate(-50%, -50%) scale(${scale})`;
        
        // Control h2 opacity based on circle scale
        // Start showing text when circle reaches 10% scale, full opacity at 30% scale
        let h2Opacity = 0;
        if (scale >= 0.1) {
            h2Opacity = Math.min((scale - 0.1) * 5, 1); // Faster fade-in
        }
        circleH2.style.opacity = h2Opacity;
    } else {
        // When circle is not visible, hide the h2
        circle.style.transform = `translate(-50%, -50%) scale(0)`;
        circleH2.style.opacity = '0';
    }
}

// Initialize circle animation
if (circleSection && circle && circleH2) {
    // Call initially
    scrollCircle();
    
    // Call on scroll
    mainElement.addEventListener('scroll', scrollCircle);
    
    // Also add resize listener in case window size changes
    window.addEventListener('resize', scrollCircle);
}

// Discover animation with GSAP - text__right ends up at bottom of text__left
const dContainer = document.querySelector('.discover__container');
const leftText = document.querySelector('.text__left');
const rightText = document.querySelector('.text__right');

if (dContainer && leftText && rightText) {
    // Get left text height for positioning
    const leftRect = leftText.getBoundingClientRect();
    const leftTextHeight = leftRect.height;
    const gap = 20; // Gap between stacked texts
    
    // Animate left text: move right to center
    gsap.to(leftText, {
        x: 470, // Moves right to center
        ease: "none",
        scrollTrigger: {
            trigger: "#discover",
            scroller: "main",
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
            // markers: true
        }
    });
    
    // Animate right text: move left to center AND down below left text
    gsap.to(rightText, {
        x: -470, // Moves left to center
        y: leftTextHeight + gap, // Moves down below left text
        ease: "none",
        scrollTrigger: {
            trigger: "#discover",
            scroller: "main",
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
            // markers: true
        }
    });
    
    // Optional: Add fade in effect
    gsap.to([leftText, rightText], {
        opacity: 1,
        ease: "none",
        scrollTrigger: {
            trigger: "#discover",
            scroller: "main",
            start: "top bottom",
            end: "center center",
            scrub: 0.5,
            // markers: true
        }
    });
}

// Simple text reveal animation for all .text__reveal elements
function initTextRevealAnimations() {
    const textRevealElements = document.querySelectorAll('.text__reveal');
    
    textRevealElements.forEach((element, index) => {
        // Get parent section
        const parentSection = element.closest('section');
        if (!parentSection) return;
        
        // Split text
        const letters = element.textContent.split("");
        element.innerHTML = letters.map(l => `<span>${l}</span>`).join("");
        
        // Set initial state - hide all letters
        gsap.set(element.querySelectorAll('span'), { y: "110%" });
        
        // Animate on scroll (REMOVE once: true to make it repeat)
        gsap.to(element.querySelectorAll('span'), {
            y: 0,
            duration: 0.6,
            ease: "power4.out",
            stagger: 0.12,
            scrollTrigger: {
                trigger: parentSection,
                scroller: "main",
                start: "top 80%", // When top of section is 80% from top of viewport
                end: "top 20%", // When top of section is 20% from top of viewport
                toggleActions: "play reverse play reverse", 
                // play: when scroller enters start position
                // reverse: when scroller leaves start position (scrolling back up)
                // play: when scroller enters end position (scrolling down through)
                // reverse: when scroller leaves end position (scrolling up through)
                // markers: true // Uncomment to see trigger points
            }
        });
    });
}

// Initialize on page load
window.addEventListener('load', () => {
    setTimeout(() => {
        initTextRevealAnimations();
        ScrollTrigger.refresh();
    }, 100);
});