rbvj = function(){

var numParticles = 128;
var movers=4
var d=200
var d2=120
var frames=400;
var angle;
var theta = 0;

var dir = 1;
ctx.lineWidth = 1;
var particles = [];
var offset = map(1, 0, numParticles, 0, window.innerWidth);
// console.log(offset);
for (var i = 0; i < numParticles; i++) {
  addParticle(i);
}

function addParticle(i){
    var x = map(i, 0, numParticles, 0, window.innerWidth);
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
        kind: "line",
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


draw = function() {
  ctx.fillStyle = rgba(0,0,0,0.2);
  ctx.fillRect(0,0,width,height);
  //ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
  for (var i = 0; i < particles.length; i++) {
    var x = 0;
     //var x = findMapping(mic.getSprectrum(i),window.innerWidth);
    var y = 0;
    var sound = findMapping(mic.getSprectrum(i*2),window.innerHeight*2);
    if (sound>10) {
      particles[i].height = tween(particles[i].height,sound, 2);
    } else {
      particles[i].height = tween(particles[i].height,sound, 1);
      }
    
    //var x = 10;
    //console.log(mic.getNote(1)[0]);
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

      if (i>0) {
        ctx.strokeStyle = "#ffffff";
        ctx.line(particle.x, particle.y-particle.height/2, particles[i-1].x, particles[i-1].y-particles[i-1].height/2);
        ctx.line(particle.x, particle.y+particle.height/2, particles[i-1].x, particles[i-1].y+particles[i-1].height/2);
        
        }
   
      // ctx.fillStyle= particle.fillColor;
      ctx.fillStyle = "#000000";
      // ctx.fillRect(particle.x-20, particle.y-particle.size/2, 20, particle.y+particle.size/2);
      //ctx.fillRect(particle.x, particle.y-particle.height/2, 20, particle.height);

      //ctx.HfillEllipse(particle.x, particle.y-particle.height/2, 10, 10);

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

}

rbvj();