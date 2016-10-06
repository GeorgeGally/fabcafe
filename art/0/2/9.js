
num=154;
movers=4
var d=200
var d2=120
var frames=400;
var angle;
var theta = 0;

var dir = 1;

var particles = [];
var offset = map(1, 0, num, 0, window.innerWidth)/2;
// console.log(offset);
for (var i = 0; i < num; i++) {
  addParticle(i);
}

function addParticle(i){
    var x = map(i, 0, num, 0, window.innerWidth);
      var particle = {
        x: x+offset,
        y: window.innerHeight/2,
        centerx: 0,
        centery: window.innerHeight/2,
        center_trail: false,
        height: 400,
        center: false,
        speedx: 0,
        speedy: 0,
        kind: "rect",
        r:random(1000),
        strokeColor: rgb(random(100,255),random(55),random(155)),
        fillColor: rgb(random(120,255),random(55),0),
        strokeWeight: 4,
        size: random(80),
        me: i,
        flip: dir
    }
    dir *=-1;
    particles.push(particle);
    //console.log(particles[i].x);
}

 
function draw() {
  ctx.fillStyle = "#990099";
  ctx.fillRect(0,0,width,height);
  //ctx.slowClear(3)

  for (var i = 0; i < particles.length; i++) {
    var x = 0;
    var y = 0;
    var sound = findMapping(mic.getSprectrum(i*2),window.innerHeight*2);
    if (sound>10) {
      particles[i].height = tween(particles[i].height,sound, 2);
    } else {
      particles[i].height = tween(particles[i].height,sound, 1);
      }
    
    if (particles[i].center_trail == true) {
      particles[i].centerx -= (particles[i].centerx -mouseX)/100;
      particles[i].centery -= (particles[i].centery -mouseY)/100;
    } else {
        // particles[i].x = particles[i].centerx+(x*particles[i].flip);
        particles[i].y = particles[i].centery+(y*particles[i].flip);      
    }


    particles[i].size = Math.abs(y);
  }
  moveParticles();

}

function moveParticles(){
  for (var i = 0; i < particles.length; i++) {
    particle = particles[i];
    //console.log(particle.size);
    if(particle.kind =="line"){
      ctx.strokeStyle= particle.strokeColor;
      ctx.lineWidth = particle.strokeWeight;
      ctx.line(particle.x, 0, particle.x, window.innerHeight);
    } else if(particle.kind=="rect"){
      // ctx.fillStyle= particle.fillColor;
      // ctx.fillStyle = "#000000";
      ctx.fillStyle = rgba(0,0,0,0.5);
      // ctx.fillRect(particle.x-20, particle.y-particle.size/2, 20, particle.y+particle.size/2);
      ctx.fillRect(particle.x, particle.y-particle.height/2, 20, particle.height);
    } else if(particle.kind=="circ"){
      ctx.fillStyle= particle.fillColor;
      // console.log(particle.y);
      ctx.HfillEllipse(particle.x-particle.size/2, particle.y-particle.size/2, particle.size, particle.size);
    }
  };
}


//move this into keypress eventually

function recalX(){
  offset = map(1, 0, numParticles, 0, window.innerWidth)/2;
  for (var i = 0; i < particles.length; i++) {
    particles[i].x = map(i, 0, numParticles, 0, window.innerWidth);
  }
}

window.onkeydown=function(event){
  
  if (event.which == 38) movers = (movers+1)%40
    if (event.which == 40) movers = (movers-1); if (movers < 0) movers = 40;
  if (event.which == 39) {
    num = (num+1)%100; 
    addParticle(particles.length);
    recalX();
    }
  if (event.which == 37) 
     {
      num = (num-2); 
      if (num < 1) {num = 1; } else {particles.shift();}  
      recalX();
    }
      console.log("num: " + num);
};
