const moveElements = (e) => {
    const tracker = document.querySelector(".tracker");

    tracker.style.top = `${e.clientY}px`;
    tracker.style.left = `${e.clientX}px`;
    tracker.style.opacity = 1;

};

document.addEventListener("mousemove", moveElements);