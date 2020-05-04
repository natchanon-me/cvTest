(() => {

    function setup() {
        const canvas = document.getElementById('falling-snow-canvas');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight - 40;
      
        return {
            canvas,
            canvasContext: canvas.getContext('2d'),
            numberOfSnowBall: 1000
        }
    }
    function random(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function createSnowball(canvas, numberOfSnowBall) {
        return [...Array(numberOfSnowBall)].map(() => {
            return {
                x: random(0, canvas.width),
                y: random(0, canvas.height),
                opacity: random(0.5, 0.8),
                radius: random(0, 2),
                speedX: random(-1, 5),
                speedY: random(-1, -5)
            }
        });
    }

    function drawSnowball(canvasContext, snowBall, r, g, b) {
        canvasContext.beginPath();
        canvasContext.arc(snowBall.x, snowBall.y, snowBall.radius, 0, Math.PI * 2);
        canvasContext.fillStyle = `rgba(${r}, ${g}, ${b}, ${snowBall.opacity})`;
        canvasContext.fill()
    }

    function moveSnowball(canvas, snowBall) {
        snowBall.x += snowBall.speedX;
        snowBall.y += snowBall.speedY;

        if(snowBall.x > canvas.width) {
            snowBall.x = 0;
        }else if (snowBall.x < 0 ) {
            snowBall.x = canvas.width;
        }

        if(snowBall.y < 0) {
            snowBall.y = canvas.height;
        }
    }

    function run() {
       const { canvas, canvasContext, numberOfSnowBall } = setup();
       const snowBalls1 = createSnowball(canvas, numberOfSnowBall);
       const snowBalls2 = createSnowball(canvas, numberOfSnowBall);
       setInterval(() => {
        canvasContext.clearRect(0, 0, canvas.width, canvas.height);
        snowBalls1.forEach((snowBall) => {drawSnowball(canvasContext, snowBall, 255, 70, 0);})
        snowBalls1.forEach((snowBall) => {moveSnowball(canvas, snowBall);})
        snowBalls2.forEach((snowBall) => {drawSnowball(canvasContext, snowBall, 255, 130, 0);})
        snowBalls2.forEach((snowBall) => {moveSnowball(canvas, snowBall);})
       }, 40)
    }

    run();

})();