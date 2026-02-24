(() => {
  const canvas = document.getElementById('confetti-canvas');
  const ctx = canvas.getContext('2d');
  let W = canvas.width = innerWidth;
  let H = canvas.height = innerHeight;

  window.addEventListener('resize', ()=>{W = canvas.width = innerWidth; H = canvas.height = innerHeight});

  const rand = (a,b)=> Math.random()*(b-a)+a;
  const colors = ['#ffd6fb','#f3c5ff','#b57cff','#8b5bd3','#6f2dbd'];

  class Confetti{
    constructor(){
      this.x = rand(0,W); this.y = rand(-H,0);
      this.r = rand(6,12); this.color = colors[Math.floor(rand(0,colors.length))];
      this.tilt = rand(-10,10); this.speed = rand(1,3);
      this.angular = rand(0.01,0.06);
    }
    update(){
      this.y += this.speed;
      this.x += Math.sin(this.y/30)*1.2;
      this.tilt += this.angular;
      if(this.y>H+20){this.y = rand(-40,-10); this.x = rand(0,W)}
    }
    draw(){
      ctx.save(); ctx.fillStyle = this.color;
      ctx.translate(this.x,this.y); ctx.rotate(this.tilt*0.02);
      ctx.fillRect(-this.r/2,-this.r/2,this.r,this.r*1.6);
      ctx.restore();
    }
  }

  const max = 140; const confetti = Array.from({length:max}, ()=> new Confetti());

  function loop(){
    ctx.clearRect(0,0,W,H);
    for(let c of confetti){ c.update(); c.draw(); }
    requestAnimationFrame(loop);
  }

  document.getElementById('celebrateBtn').addEventListener('click', ()=>{
    // burst of speed
    for(let i=0;i<confetti.length;i++){ confetti[i].y = Math.random()*H*0.6; confetti[i].speed = Math.random()*5+1 }
  });

  // Happy Birthday Bee button (simple pulse + small confetti burst)
  const happyBtn = document.getElementById('happyBeeBtn');
  if(happyBtn){
    happyBtn.addEventListener('click', ()=>{
      happyBtn.animate([{transform:'scale(1)'},{transform:'scale(1.06)'},{transform:'scale(1)'}],{duration:420,iterations:1});
      for(let i=0;i<30;i++){ confetti[i].y = Math.random()*H*0.5; confetti[i].speed = Math.random()*6+2 }
    });
  }

  // Publish button: animate flowers flying to input
  const publishBtn = document.getElementById('publishBtn');
  const publishInput = document.getElementById('publishInput');

  function spawnFlower(targetRect){
    const el = document.createElement('div'); el.className = 'flower'; el.textContent = ['🌸','🌺','💐'][Math.floor(Math.random()*3)];
    // start from random edge position
    const startX = Math.random()*window.innerWidth; const startY = window.innerHeight + 20;
    el.style.left = startX + 'px'; el.style.top = startY + 'px'; el.style.opacity = '1'; el.style.transform = 'translate3d(0,0,0) scale(1)';
    document.body.appendChild(el);
    // force reflow
    void el.offsetWidth;
    const dx = (targetRect.left + targetRect.width/2) - startX;
    const dy = (targetRect.top + targetRect.height/2) - startY;
    el.style.transform = `translate3d(${dx}px,${dy}px,0) scale(0.6) rotate(${(Math.random()*60-30)}deg)`;
    el.style.opacity = '0';
    setTimeout(()=>{ if(el && el.parentNode) el.parentNode.removeChild(el); }, 1100);
  }

  if(publishBtn && publishInput){
    publishBtn.addEventListener('click', ()=>{
      publishInput.focus();
      const targetRect = publishInput.getBoundingClientRect();
      // spawn a burst of flowers
      for(let i=0;i<12;i++){
        setTimeout(()=> spawnFlower(targetRect), i*80 + Math.random()*120);
      }
    });
  }

  loop();
})();
