
var numParticles=2;
var movers=4
var d=200
var d2=120
var frames=400;
var angle;
var theta = 0;
var hiFreq = 0;
var loFreq = 1000;
var dir = 1;
var particles = [];
for (var i = 0; i < numParticles; i++) {
  addParticle(i);
}

function addParticle(i){
      var particle = {
        x: random(width),
        y: height/2,
        size: 10,
        speedx: random(-4,4),
        speedy: 0,
        kind: "circ",
        r:random(1000),
        strokeColor: rgb(random(100,255),random(55),random(155)),
        fillColor: '#000000',
        strokeWeight: 4,
        size: 2,
        me: i,
        flip: dir
    }
    dir *=-1;
    particles.push(particle);
}


 
function draw() {
  //ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
  ctx.fillStyle = rgb(0,0, 180);
  ctx.fillRect(0, 0, width, height);
  for (var i = 0; i < particles.length; i++) {
    particles[i].x = tween(particles[i].x, Math.sin(theta)*(window.innerWidth/2*particles[i].speedx)+width/2, 20);
  }
  moveParticles();
  theta+= 0.008;
}

function moveParticles(){
  for (var i = 0; i < particles.length; i++) {
    particle = particles[i];
    particle.size +=0.1;
    if(particle.kind =="line"){
      ctx.strokeStyle= particle.strokeColor;
      ctx.lineWidth = particle.strokeWeight;
      ctx.line(particle.x, 0, particle.x, window.innerHeight);
    } else if(particle.kind=="rect"){
      ctx.fillStyle= particle.fillColor;
      ctx.fillRect(particle.x-particle.size/2, 0, particle.size, window.innerHeight);
    } else if(particle.kind=="circ"){
      ctx.fillStyle= particle.fillColor;
      // console.log(particle.y);
      ctx.HfillEllipse(particle.x-particle.size/2, particle.y, particle.size, particle.size);
    }
  };
}


// move this into keypress eventually

window.onkeydown=function(event){
  
  if (event.which == 38) movers = (movers+1)%40
    if (event.which == 40) movers = (movers-1); if (movers < 0) movers = 40;
  if (event.which == 39) {
    numParticles = (numParticles+1)%100; 
    addParticle(particles.length);
    }
  if (event.which == 37) 
     {
      numParticles = (numParticles-2); 
      if (numParticles < 1) {numParticles = 1; } else {particles.shift();}  
    }
      console.log("numParticles: " + numParticles);
};
