
var numParticles= 45;
var movers=4
var d=200
var d2=120
var frames=400;
var angle;
var theta = 0;

var dir = 1;

var particles = [];
var offset = map(1, 0, numParticles, 0, window.innerWidth)/2;
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
        kind: "circ",
        r:random(1000),
        strokeColor: rgb(random(100,255),random(55),random(155)),
        fillColor: "#000000",
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
  ctx.fillStyle = rgb(0,5,155); 
  ctx.fillRect(0,0,window.innerWidth,window.innerHeight);
  //ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
  for (var i = 0; i < particles.length; i++) {
    var x = 0;
     //var x = findMapping(mic.getSprectrum(i),window.innerWidth);
    var y = 0;
    var h  = 2 + findMapping(mic.getSprectrum(i*2),window.innerHeight*2);
    //h += random(-20,20);
    particles[i].height = tween(particles[i].height, h, 15);
    particles[i].y = tween(window.innerHeight/2, random(-50,50), 10);

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
      ctx.fillStyle= particle.fillColor;
      // ctx.fillRect(particle.x-20, particle.y-particle.size/2, 20, particle.y+particle.size/2);
      ctx.fillRect(particle.x, window.innerHeight, 20, -1*particle.height);
    } else if(particle.kind=="circ"){
      ctx.fillStyle = particle.fillColor;
       //ctx.fillEllipse(particle.x, w/2-(particle.y-particle.size/2), -1*(particle.size+s), -1*(particle.size+s));
  
      ctx.HfillEllipse(w-particle.x, particle.y-particle.height*2+15, particle.height*-2, particle.height*-2);
      ctx.HfillEllipse(particle.x, particle.y+particle.height*2+-15, particle.height*2, particle.height*2);
      
    }
  }
  for (var i = 0; i < particles.length; i++) {
    particle = particles[i];
    ctx.fillStyle = "yellow";
      ctx.HfillEllipse(w-particle.x, particle.y-particle.height*2+15, 8, 8);
      ctx.HfillEllipse(particle.x, particle.y+particle.height*2+-15, 8, 8);
  }
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
