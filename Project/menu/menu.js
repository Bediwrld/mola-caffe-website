const cursor = document.getElementById('.cursor-follower');
let mouseX = 0;
let mouseY = 0;
let ballX = 0;
let ballY = 0;
const speed = 0.2;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animateCursor() {
  ballX += (mouseX - ballX) * speed;
  ballY += (mouseY - ballY) * speed;
  cursor.style.transform = `translate(${ballX - 10}px, ${ballY - 10}px)`;
  requestAnimationFrame(animateCursor);
}

animateCursor();

const overlay = document.querySelector('.loading-overlay');
const content = document.querySelector('.main-content');

setTimeout(() => {
  overlay.classList.replace('phase-1', 'phase-2');

  setTimeout(() => {
    overlay.classList.replace('phase-2', 'phase-3');
    document.body.style.backgroundColor = 'rgb(20,31,31)';

    // ✨ Wait 1.5s after overlay animation, then reveal content
    setTimeout(() => {
      content.classList.remove('hidden');
      content.classList.add('fade-in-up');
    cursor.style.opacity = '1';
    }, 10);

  }, 2000); // duration of expandOverlay
}, 3500); // duration of growLine




function handleCursorVisibility() {
  const elementUnderCursor = document.elementFromPoint(mouseX, mouseY);

  if (elementUnderCursor && elementUnderCursor.closest('a')) {
    cursor.style.opacity = '0'; // fade out
  } else {
    cursor.style.opacity = '1'; // fade in
  }

  requestAnimationFrame(handleCursorVisibility);
}

handleCursorVisibility(); // start loop
