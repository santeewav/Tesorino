

const moveElements = (e) => {
    const shapes = document.querySelectorAll(".shape");

    shapes.forEach((shape) => {
        const shapeOffset = shape.getAttribute("data-offset");  
        
        let offsetX = (window.innerWidth - e.clientX) * shapeOffset;
        let offsetY = (window.innerWidth - e.clientY) * shapeOffset;
    
        shape.style.translate = `${offsetX}px ${offsetY}px`
    });
};



document.addEventListener('mousemove', moveElements)

document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);
  
    // Animazioni per ogni sezione
    gsap.from('.first .logo', {
        duration: 1.5,
        y: -50,
        opacity: 0,
        ease: 'power2.out'
    });
  
    gsap.from('.first h3', {
        duration: 1.5,
        x: -100,
        opacity: 0,
        delay: 0.5,
        ease: 'power2.out'
    });
  
    const sections = gsap.utils.toArray('section');
  
    sections.forEach((section) => {
        gsap.from(section.querySelector('h1'), {
            scrollTrigger: {
                trigger: section,
                start: 'top center',
                end: 'bottom center',
                scrub: true
            },
            y: 50,
            opacity: 0,
            duration: 1,
            ease: 'power2.out'
        });
  
        gsap.from(section.querySelector('p'), {
            scrollTrigger: {
                trigger: section,
                start: 'top center',
                end: 'bottom center',
                scrub: true
            },
            y: 50,
            opacity: 0,
            duration: 1.5,
            delay: 0.5,
            ease: 'power2.out'
        });
  
        gsap.from(section.querySelectorAll('.shape'), {
            scrollTrigger: {
                trigger: section,
                start: 'top center',
                end: 'bottom center',
                scrub: true
            },
            y: 100,
            opacity: 0,
            duration: 1.5,
            stagger: 0.2,
            ease: 'power2.out'
        });
    });
  
    // Animazioni di Scroll per il video di background
    gsap.to('#background-video', {
        scrollTrigger: {
            trigger: '.first',
            start: 'top top',
            end: 'bottom top',
            scrub: true
        },
        scale: 1.2,
        filter: 'blur(10px)'
    });
  
    gsap.to('.grass', {
      scrollTrigger: {
          trigger: '.first',
          start: 'top top',
          end: 'bottom top',
          scrub: true
      },
      filter: 'blur(0px)'
  });

  gsap.to('.canvas-cont', {
    scrollTrigger: {
        trigger: '.first',
        start: 'top top',
        end: 'bottom top',
        scrub: true
    },
    filter: 'blur(0px)'
});
  
  gsap.to('.third .container p', {
    scrollTrigger: {
        trigger: '.first',
        start: 'top top',
        end: 'center top',
        scrub: true
    },
    backdropFilter: 'blur(10px)'
  });
  
  });