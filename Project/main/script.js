document.addEventListener('DOMContentLoaded', () => {
  if (window.innerWidth >= 1024 && window.innerWidth <= 1440) {
    alert('You are viewing this site on a laptop-sized screen!');
  }
});



const ball = document.querySelector('.cursor-ball');

let targetX = window.innerWidth / 2;
let targetY = window.innerHeight / 2;
let currentX = targetX;
let currentY = targetY;

document.addEventListener('mousemove', (e) => {
  targetX = e.clientX;
  targetY = e.clientY;
});
function animate() {
  currentX += (targetX - currentX) * 0.1; // smooth easing
  currentY += (targetY - currentY) * 0.1;

  ball.style.left = `${currentX}px`;
  ball.style.top = `${currentY}px`;

  requestAnimationFrame(animate);
}

animate();

const links = document.querySelectorAll('a');
links.forEach(link => {
  link.addEventListener('mouseover', () => {
    ball.classList.add('hidden'); // fades out
  });
  link.addEventListener('mouseout', () => {
    ball.classList.remove('hidden'); // fades in
  });
});

const button = document.querySelectorAll('button');

button.forEach(btn =>{
  btn.addEventListener('mouseover', () => {
    ball.classList.add('hidden'); // fades out
  });
  btn.addEventListener('mouseout', () => {
    ball.classList.remove('hidden'); // fades in
  });
})

const beans = document.querySelectorAll('.coffee-beans');
let beansAnimated = false;

window.addEventListener('scroll', () => {
  if (window.scrollY >= 400 && !beansAnimated) {
    beans.forEach(bean => {
      bean.classList.add('fade-in-left');
    });
    beansAnimated = true;
  }
});



document.addEventListener('DOMContentLoaded', () => {
  const molaVideo = document.querySelector('.mola-video');
  molaVideo.playbackRate = 0.85;
});


  document.addEventListener("DOMContentLoaded", function () {
    const heartBeatVideo = document.querySelector(".heartbeat-video");
    heartBeatVideo.addEventListener("contextmenu", function (e) {
      e.preventDefault();
    });
  });

 const h2 = document.getElementById("animated-text");
    const span = h2.querySelector("span");
    const text = span.innerHTML;

    // Split text by <br> to keep line breaks
    const lines = text.split(/<br\s*\/?>/i);

    h2.innerHTML = ""; // Clear it for reconstruction

    lines.forEach((line, lineIndex) => {
      const lineContainer = document.createElement("div");

      line
        .trim()
        .split(" ")
        .forEach((word, i) => {
          const wordSpan = document.createElement("span");
          wordSpan.textContent = word + " ";
          wordSpan.classList.add("word");
          wordSpan.style.animationDelay = `${(lineIndex * 0.6 + i * 0.1).toFixed(2)}s`;
          lineContainer.appendChild(wordSpan);
        });

      h2.appendChild(lineContainer);
    });


   document.addEventListener("DOMContentLoaded", function () {
  const nav = document.getElementById("animated-nav");
  const navLinks = nav.querySelectorAll("a");

  navLinks.forEach((link, index) => {
    const words = link.textContent.trim().split(" ");
    link.innerHTML = ""; // Clear original text

    words.forEach((word, wordIndex) => {
      const span = document.createElement("span");
      span.textContent = word + " ";
      span.classList.add("word");
      span.style.display = "inline-block";
      span.style.animationDelay = `${(index * 0.4 + wordIndex * 0.1).toFixed(2)}s`;
      link.appendChild(span);
    });
  });
});




 const scroll1 = document.getElementById('scroll1');
  const scroll2 = document.getElementById('scroll2');

  // Get width of one scrolling text block
  const scrollWidth = scroll1.offsetWidth;

  // Set initial positions
  scroll1.style.left = '0px';
  scroll2.style.left = scrollWidth + 'px';

  let duration = 65000; // 20 seconds
  let startTime = null;

  function animateScroll(timestamp) {
    if (!startTime) startTime = timestamp;
    let elapsed = timestamp - startTime;

    // Calculate how much to translate based on elapsed time and duration
    let distance = (elapsed / duration) * scrollWidth;

    // Loop the animation
    if (distance > scrollWidth) {
      startTime = timestamp;
      distance = 0;
    }

    // Move both scrolls left by distance
    scroll1.style.transform = `translateX(${-distance}px)`;
    scroll2.style.transform = `translateX(${-distance}px)`;

    requestAnimationFrame(animateScroll);
  }

  requestAnimationFrame(animateScroll);


  

  const textOverlay = document.querySelector('.footer-text-overlay');
  const footerBottom = document.querySelector('.footer-bottom');

  let animated = false;

  window.addEventListener('scroll', () => {
    if (window.scrollY >= 1200 && !animated) {
      textOverlay.classList.add('slide-up');
      footerBottom.classList.add('slide-up');
      animated = true;
    }
  });