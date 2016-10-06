
var numParticles=55;
var movers=4
var d=200
var d2=120
var frames=400;
var angle;
var theta = 0;

var dir = 1;
var particles = [];
var offset = map(1, 0, numParticles, 0, window.innerWidth)/2;
console.log(offset);
for (var i = 0; i < numParticles; i++) {
  addParticle(i);
}

function addParticle(i){
    var x = map(i, 0, numParticles, 0, window.innerWidth);
      var particle = {
        x: 0,
        y: x+offset,
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
        fillColor: rgb(0,0,random(20,255)),
        strokeWeight: 4,
        size: random(80),
        me: i,
        dir: dir,
        flip: dir
    }
    dir *=-1;
    particles.push(particle);
    //console.log(particles[i].x);
}

 
function draw() {
  ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
  for (var i = 0; i < particles.length; i++) {
    var x = 0;
     //var x = findMapping(mic.getSprectrum(i),window.innerWidth);
    var y = 0;
    var sound = findMapping(mic.getSprectrum(i*1),window.innerHeight*4);
    particles[i].height = tween(particles[i].height, sound, 20);
    sound = findMapping(mic.getSprectrum(i*1),20);
    particles[i].y = (particles[i].y + sound) %height;      



    particles[i].size = Math.abs(y);
  }
  moveParticles();
  
}

function moveParticles(){
  for (var i = 0; i < particles.length; i++) {
    particle = particles[i];
    //console.log(particle.size);
    ctx.fillStyle= particle.fillColor;
    ctx.fillRect(particle.x, particle.y, width, particle.height);
   
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
    numParticles = (numParticles+1)%100; 
    addParticle(particles.length);
    recalX();
    }
  if (event.which == 37) 
     {
      numParticles = (numParticles-2); 
      if (numParticles < 1) {numParticles = 1; } else {particles.shift();}  
      recalX();
    }
      console.log("numParticles: " + numParticles);
};
