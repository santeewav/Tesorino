gsap.registerPlugin(ScrollTrigger,ScrollToPlugin);

import { Application } from '@splinetool/runtime';

const canvas = document.getElementById('canvas3d');
const app = new Application(canvas);
app
  .load("https://prod.spline.design/zbCPwuioXdtnqnqu/scene.splinecode")
  .then(() => {
    const bottle = app.findObjectByName("water-bottle");
    gsap.set(keyboard.scale, { x: 1, y: 1, z: 1 });
    gsap.set(keyboard.position, { x: 110, y: 50 });
  });
  