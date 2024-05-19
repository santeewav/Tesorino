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
