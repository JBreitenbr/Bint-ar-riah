// JS: Hamburger
const toggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.navbar nav');
toggle.addEventListener('click', () => navLinks.classList.toggle('show'));

// JS: Sand & Sterne
const sandCanvas = document.getElementById('sandMotion');
const sandCtx = sandCanvas.getContext('2d');
const starsCanvas = document.getElementById('stars');
const starsCtx = starsCanvas.getContext('2d');
let width, height;
function resize(){ width=sandCanvas.width=starsCanvas.width=window.innerWidth; height=sandCanvas.height=starsCanvas.height=window.innerHeight-70; }
resize();
window.addEventListener('resize', resize);

// Sandpartikel
const sandParticles = [];
for(let i=0;i<200;i++){ sandParticles.push({x:Math.random()*width,y:Math.random()*height,size:Math.random()*1.5+0.3,speed:Math.random()*0.3+0.1,drift:Math.random()*0.3-0.15}); }
let windFactor=1;
window.addEventListener("mousemove", ()=>windFactor=2);
window.addEventListener("mouseout", ()=>windFactor=1);

// Sterne
const stars=[];
for(let i=0;i<150;i++){ stars.push({x:Math.random()*width,y:Math.random()*height,size:Math.random()*1.5+0.5,twinkle:Math.random()*Math.PI*2}); }

function animate(){
  sandCtx.clearRect(0,0,width,height);
  sandParticles.forEach(p=>{
    p.x+=p.drift*windFactor; p.y-=p.speed*windFactor;
    if(p.y<0){p.y=height;p.x=Math.random()*width;} if(p.x<0)p.x=width; if(p.x>width)p.x=0;
    sandCtx.fillStyle=`rgba(200,160,90,0.6)`;
    sandCtx.beginPath(); sandCtx.arc(p.x,p.y,p.size,0,Math.PI*2); sandCtx.fill();
  });

  starsCtx.clearRect(0,0,width,height);
  stars.forEach(s=>{
    const alpha=0.5+Math.sin(Date.now()*0.002+s.twinkle)*0.5;
    starsCtx.fillStyle=`rgba(223,194,125,${alpha})`;
    starsCtx.beginPath(); starsCtx.arc(s.x,s.y,s.size,0,Math.PI*2); starsCtx.fill();
  });

  requestAnimationFrame(animate);
}
animate();
