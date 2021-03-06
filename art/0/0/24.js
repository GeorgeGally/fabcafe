
var numParticles = 25;
var movers=4
var d=200
var d2=120
var frames=400;
var angle;
var theta = 0;

var dir = 1;

var particles = [];
for (var i = 0; i < numParticles; i++) {
  addParticle(i);
}

function addParticle(i){
      var particle = {
        x: 0,
        y: 0,
        size: 10,
        speedx: 0,
        speedy: 0,
        kind: "line",
        r:random(1000),
        strokeColor: rgb(random(100,255),random(55),random(155)),
        fillColor: rgb(random(100,255),random(55),random(255)),
        strokeWeight: 2,
        size: random(10),
        me: i,
        flip: dir
    }
    dir *=-1;
    particles.push(particle);
}


function draw() {
  //counter+=1;
  ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
  for (var i = 0; i < particles.length; i++) {
    var f = findMapping(mic.getSprectrum(i), w*4);
    // particles[i].x = mic.getSprectrum(i*10);
    particles[i].x = Math.sin(theta/10)*w/2 +w/2 + (f*particles[i].flip);

  }
  
  moveParticles();
  theta += 2*Math.PI/frames;

}

function moveParticles(){
  for (var i = 0; i < particles.length; i++) {
    particle = particles[i];
    //particle.x = (particle.x+particle.speedx)%window.innerWidth;
    ctx.strokeStyle= particle.strokeColor;
    ctx.lineWidth = particle.strokeWeight;
    if(particle.kind=="line"){
      ctx.line(particle.x, 0, particle.x, window.innerHeight);
    }
  };
        //var f = random(255);
        // ctx.strokeStyle= circs[i].c;
        // ctx.lineWidth = circs[i].s;
        //ctx.fillStyle= rgb(f,f,f);
        //circs[i].r = (circs[i].r + Math.abs(Math.tan(counter)*10))%2000;
        //ctx.HstrokeEllipse(window.innerWidth/2, window.innerHeight-circs[i].r/2, circs[i].r, circs[i].r);
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
      console.log(numParticles);
  //movers = randomInt(1,40);
};
