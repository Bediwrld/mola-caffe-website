 // ===== Navbar visual change on scroll =====
 const navbar = document.querySelector('.navbar');
 window.addEventListener('scroll', () => {
   navbar.classList.toggle('scrolled', window.scrollY > 50);
 });

 // ===== Mobile toggle =====
 const navToggle = document.querySelector('.nav-toggle');
 const navMenu = document.querySelector('.nav-menu');
 
 navToggle?.addEventListener('click', () => {
   navToggle.classList.toggle('active');
   navMenu.classList.toggle('active');
   document.body.classList.toggle('menu-open');
 });
 
 // Close mobile menu when clicking on a link
 const navLinks = document.querySelectorAll('.nav-link');
 navLinks.forEach(link => {
   link.addEventListener('click', () => {
     navToggle.classList.remove('active');
     navMenu.classList.remove('active');
     document.body.classList.remove('menu-open');
   });
 });
 
 // Close mobile menu when clicking outside
 document.addEventListener('click', (e) => {
   if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
     navToggle.classList.remove('active');
     navMenu.classList.remove('active');
     document.body.classList.remove('menu-open');
   }
 });

 // ===== Truly infinite ticker (no jump, no twitch) - Desktop Only =====
 (function(){
   const viewport = document.getElementById('tickerViewport');
   const track    = document.getElementById('tickerTrack');
   const mobileGallery = document.getElementById('mobileGallery');
   const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
   
   // Only run ticker on desktop (screen width > 768px)
   function isMobile() {
     return window.innerWidth <= 768;
   }
   
   if (!viewport || !track || prefersReduced || isMobile()) {
     // Show mobile gallery on mobile
     if (mobileGallery && isMobile()) {
       mobileGallery.style.display = 'block';
     }
     return;
   }

   // Hide mobile gallery on desktop
   if (mobileGallery) {
     mobileGallery.style.display = 'none';
   }

   // Keep originals so we can rebuild on resize
   const seedCards = Array.from(track.children).map(n => n.cloneNode(true));

   let offset = 0; // current translateX
   let speed  = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--ticker-speed')) || 0.9;
   let gapPx  = 0;
   let reqId  = null;

   function pxToNumber(px){ return Number(px.replace('px','')) || 0; }

   function build(){
     // reset
     track.innerHTML = '';
     seedCards.forEach(c => track.appendChild(c.cloneNode(true)));

     // compute gap from CSS flex gap
     const cs = getComputedStyle(track);
     gapPx = pxToNumber(cs.gap);

     // clone until we have at least 2x viewport width so we can cycle
     const targetWidth = viewport.clientWidth * 2 + 2 * gapPx;
     while (track.scrollWidth < targetWidth){
       seedCards.forEach(c => track.appendChild(c.cloneNode(true)));
     }

     offset = 0;
     track.style.transform = 'translateX(0)';
   }

   function step(){
     offset -= speed; // move left

     // When the first card is fully out of view, move it to the end and adjust offset
     const first = track.firstElementChild;
     if (first){
       const firstWidth = first.offsetWidth; // layout width (ignores transform scale)
       const threshold = -(firstWidth + gapPx);
       if (offset <= threshold){
         // move first to end
         track.appendChild(first);
         offset -= threshold; // bring track forward by exactly the amount we removed
       }
     }

     track.style.transform = `translateX(${offset}px)`;
     reqId = requestAnimationFrame(step);
   }

   function start(){ 
     if (isMobile()) {
       // Show mobile gallery, hide ticker
       if (mobileGallery) mobileGallery.style.display = 'block';
       if (viewport) viewport.style.display = 'none';
       return;
     } else {
       // Show ticker, hide mobile gallery
       if (viewport) viewport.style.display = 'block';
       if (mobileGallery) mobileGallery.style.display = 'none';
       cancelAnimationFrame(reqId); 
       build(); 
       reqId = requestAnimationFrame(step);
     }
   }

   // Debounce resize rebuild
   let rAF = null;
   window.addEventListener('resize', () => {
     if (rAF) cancelAnimationFrame(rAF);
     rAF = requestAnimationFrame(start);
   });

   start();
 })();



 
const ball = document.querySelector('.cursor-follower');

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

// ===== Mobile Touch Support =====
// Add touch support for gallery cards
const cards = document.querySelectorAll('.card');
cards.forEach(card => {
  let touchStartY = 0;
  let touchEndY = 0;
  let touchStartX = 0;
  let touchEndX = 0;
  
  card.addEventListener('touchstart', (e) => {
    touchStartY = e.changedTouches[0].screenY;
    touchStartX = e.changedTouches[0].screenX;
    card.classList.add('touching');
  }, { passive: true });
  
  card.addEventListener('touchend', (e) => {
    touchEndY = e.changedTouches[0].screenY;
    touchEndX = e.changedTouches[0].screenX;
    card.classList.remove('touching');
    
    // Show overlay on tap (not swipe)
    const deltaY = Math.abs(touchStartY - touchEndY);
    const deltaX = Math.abs(touchStartX - touchEndX);
    if (deltaY < 10 && deltaX < 10) {
      card.classList.toggle('show-overlay');
    }
  }, { passive: true });
  
  // Allow vertical scrolling on mobile gallery
  const mobileGallery = document.getElementById('mobileGallery');
  if (mobileGallery && card.closest('.mobile-gallery')) {
    card.addEventListener('touchmove', (e) => {
      // Allow vertical scrolling in mobile gallery
      e.stopPropagation();
    }, { passive: true });
  } else {
    // Prevent default touch behaviors for ticker cards
    card.addEventListener('touchmove', (e) => {
      e.preventDefault();
    }, { passive: false });
  }
});

// ===== Mobile Gallery Smooth Scrolling =====
const mobileGallery = document.getElementById('mobileGallery');
if (mobileGallery) {
  let isScrolling = false;
  let scrollTimeout;
  
  // Add smooth scroll behavior
  mobileGallery.addEventListener('scroll', () => {
    isScrolling = true;
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      isScrolling = false;
    }, 150);
  });
  
  // Add momentum scrolling for iOS
  mobileGallery.style.webkitOverflowScrolling = 'touch';
}

// ===== Mobile Performance Optimizations =====
// Reduce animation complexity on mobile
const isMobile = window.innerWidth <= 768;
if (isMobile) {
  // Reduce ticker speed for better performance
  document.documentElement.style.setProperty('--ticker-speed', '0.3');
  
  // Disable hover effects on mobile
  const style = document.createElement('style');
  style.textContent = `
    @media (max-width: 768px) {
      .card:hover {
        transform: none !important;
        box-shadow: 0 15px 35px rgba(0,0,0,.7), 0 0 60px rgba(0,0,0,.3) inset !important;
        filter: brightness(.9) !important;
      }
    }
  `;
  document.head.appendChild(style);
}


