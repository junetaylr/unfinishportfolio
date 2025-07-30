const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');
const welcome = document.getElementById('hello world.');

const fontSize = 16;
const chars = 'J U N E T A Y L R C R E A T O R F U T U R E C O D E 2 0 2 5 @ # $ % & * < >'.split(' ');
let columns, drops;
let state = 'matrix';
let welcomeDuration = 3000; // ms

function initMatrix() {
    const container = document.querySelector('.content-container'); 
    const containerWidth = container ? container.clientWidth : window.innerWidth;

    canvas.width = containerWidth;  // match container width
    canvas.height = 150; // fixed height for the effect
    columns = Math.floor(canvas.width / fontSize);
    drops = Array(columns).fill(0);
}

function drawMatrix() {
    ctx.fillStyle = 'rgba(0,0,0,0.08)'; // background fade
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#FFFFFF'; // matrix text color
    ctx.font = fontSize + 'px Overpass';

    let allDone = true;
    for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize < canvas.height) allDone = false;
        if (Math.random() > 0.875) drops[i]++;
    }

    if (allDone) {
        state = 'hello world.';
        welcome.style.display = 'block';
        setTimeout(() => {
            welcome.style.display = 'none';
            initMatrix();
            state = 'matrix';
        }, welcomeDuration);
    }
}

function loop() {
    if (state === 'matrix') drawMatrix();
    requestAnimationFrame(loop);
}

// Init & responsive
initMatrix();
loop();
window.addEventListener('resize', initMatrix);
