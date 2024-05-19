import { Application } from '/@splinetool/runtime/build/runtime.js'

gsap.registerPlugin(ScrollTrigger,ScrollToPlugin);



var eventFired = 0;
const canvas = document.getElementById('canvas3d');
const app = new Application(canvas);
app.load('https://prod.spline.design/zbCPwuioXdtnqnqu/scene.splinecode')
.then(() => {

  function animationLG(){
    gsap.set(bottle.scale, { x: 40, y: 40, z: 40 });
    gsap.set(bottle.position, { x: 150, y: -60, z: -60 });
    gsap.set(bottle.rotation, {x:0.4, y:1, z:0});

    gsap
      .timeline({
        scrollTrigger: {
          trigger: "#videoT",
          start: "top bottom",
          end: "bottom bottom",
          scrub: true
        }
      })
      .to(bottle.rotation, { x: 0.4, y: 5, z:0}, 0)
        .to(bottle.position, { x: 150, y: -60, z:-60 }, 0)
        .to(bottle.scale, { x: 50, y: 50, z: 50 }, 0);
  
      gsap
      .timeline({
        scrollTrigger: {
          trigger: "#part1",
          start: "top bottom",
          end: "bottom bottom",
          scrub: true
        }
      })
      .to(bottle.rotation, { x: -0.4, y: 30, z:0}, 0)
        .to(bottle.position, { x: 50, y: -70, z:-80 }, 0)
        .to(bottle.scale, { x: 35, y: 35, z: 35 }, 0);

  
      gsap
      .timeline({
        scrollTrigger: {
          trigger: "#part2",
          start: "top bottom",
          end: "bottom bottom",
          scrub: true
        }
      })
      .to(bottle.rotation, { x: 0.4, y: 6, z:0}, 0)
        .to(bottle.position, { x: 50, y: 0, z:80 }, 0)
        .to(bottle.scale, { x: 20, y: 20, z: 20 }, 0);
  
      gsap
      .timeline({
        scrollTrigger: {
          trigger: "#part3",
          start: "top bottom",
          end: "bottom bottom",
          scrub: true
        }
      })
      .to(bottle.rotation, { x: -0.2, y: 10, z:0}, 0)
        .to(bottle.position, { x: 50, y: -90, z:-80 }, 0)
        .to(bottle.scale, { x: 35, y: 35, z: 35 }, 0);
  
    gsap
      .timeline({
        scrollTrigger: {
          trigger: "#part4",
          start: "top bottom",
          end: "bottom bottom",
          scrub: true
        }
      })
      .to(bottle.rotation, { x: 0.1, y: 40, z:0}, 0)
        .to(bottle.position, { x: 50, y: -10, z:100 }, 0)
        .to(bottle.scale, { x: 30, y: 30, z: 30 }, 0);
    
    gsap
      .timeline({
        scrollTrigger: {
          trigger: "#part5",
          start: "top bottom",
          end: "bottom bottom",
          scrub: true
        }
      })
      .to(bottle.rotation, { x: Math.PI * 0.5, y: 30, z:0}, 0)
        .to(bottle.position, { x: 50, y: 50, z:-50 }, 0)
        .to(bottle.scale, { x: 30, y: 30, z: 30 }, 0);
  
  
  
  
  
      gsap
      .timeline({
        scrollTrigger: {
          trigger: "#footer",
          start: "top bottom",
          end: "bottom bottom",
          scrub: true
        }
      })
      .to(bottle.rotation, { x: Math.PI * 0.5, y:  Math.PI * 13.5 , z:0}, 0)
        .to(bottle.position, { x: 50, y: 5, z:-50 }, 0)
        .to(bottle.scale, { x: 30, y: 30, z: 30 }, 0);
  
      
  }

    const bottle = app.findObjectByName("water-bottle");

    if ($(window).width() < 768) {

    gsap.set(bottle.scale, { x: 40, y: 40, z: 40 });
    gsap.set(bottle.position, { x: 150, y: -60 });
    gsap.set(bottle.rotation, {x:0.4, y:1, z:0});

    gsap
    .timeline({
      scrollTrigger: {
        trigger: "#part1",
        start: "top bottom",
        end: "bottom bottom",
        scrub: true
      }
    })
    .to(bottle.rotation, { x: -0.4, y: 2, z:0}, 0)
      .to(bottle.position, { x: 50, y: -90, z:40 }, 0)
      .to(bottle.scale, { x: 35, y: 35, z: 35 }, 0);

    gsap
    .timeline({
      scrollTrigger: {
        trigger: "#part2",
        start: "top bottom",
        end: "bottom bottom",
        scrub: true
      }
    })
    .to(bottle.rotation, { x: 0.4, y: 6, z:0}, 0)
      .to(bottle.position, { x: 50, y: -90, z:20 }, 0)
      .to(bottle.scale, { x: 15, y: 15, z: 15 }, 0);

    gsap
    .timeline({
      scrollTrigger: {
        trigger: "#part3",
        start: "top bottom",
        end: "bottom bottom",
        scrub: true
      }
    })
    .to(bottle.rotation, { x: -0.2, y: 10, z:0}, 0)
      .to(bottle.position, { x: 50, y: -90, z:-20 }, 0)
      .to(bottle.scale, { x: 25, y: 25, z: 25 }, 0);

  gsap
    .timeline({
      scrollTrigger: {
        trigger: "#part4",
        start: "top bottom",
        end: "bottom bottom",
        scrub: true
      }
    })
    .to(bottle.rotation, { x: 0.2, y: 40, z:0}, 0)
      .to(bottle.position, { x: 50, y: -30, z:20 }, 0)
      .to(bottle.scale, { x: 30, y: 30, z: 30 }, 0);
  
  gsap
    .timeline({
      scrollTrigger: {
        trigger: "#part5",
        start: "top bottom",
        end: "bottom bottom",
        scrub: true
      }
    })
    .to(bottle.rotation, { x: Math.PI * 0.5, y: 30, z:0}, 0)
      .to(bottle.position, { x: 50, y: 50, z:-50 }, 0)
      .to(bottle.scale, { x: 30, y: 30, z: 30 }, 0);





    gsap
    .timeline({
      scrollTrigger: {
        trigger: "#footer",
        start: "top bottom",
        end: "bottom bottom",
        scrub: true
      }
    })
    .to(bottle.rotation, { x: 0, y: 2, z:0}, 0)
      .to(bottle.position, { x: 50, y: -120, z:40 }, 0)
      .to(bottle.scale, { x: 50, y: 50, z: 50 }, 0);
    
    }
    else {
       animationLG();
       eventFired = 1;
    }

    $(window).on('resize', function() {
      if (!eventFired) {
          if ($(window).width() < 960) {
          } else {
              animationLG();
          }
      }
  });



});
