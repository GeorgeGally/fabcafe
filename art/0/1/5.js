
var numParticles= 85;
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
        x: x+offset,
        y: 0,
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
        fillColor: randomColor({luminosity: 'dark', hue: 'pink', format: 'rgb' }),
        //fillColor: rgba(155,0,155, 0.5),
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
  // ctx.fillStyle = rgba(0,0,0,0.8);
  // ctx.fillRect(0,0,width,height);
  ctx.clearRect(0,0,w,h);
  for (var i = 0; i < particles.length; i++) {
    var x = 0;
     //var x = findMapping(mic.getSprectrum(i),window.innerWidth);
    var y = 0;
    particles[i].height = findMapping(mic.getSprectrum(i*2),6*window.innerHeight)*2 ;
    particles[i].height = clamp(particles[i].height,0,3000);

    particles[i].size = Math.abs(y);
  }
  moveParticles();

}

function moveParticles(){
  ctx.save();
  ctx.translate(w/2, h/2);
  ctx.rotate(radians(55));
  for (var i = 0; i < particles.length; i++) {
    particle = particles[i];
    //console.log(particle.size);

      ctx.fillStyle= particle.fillColor;
      // ctx.fillRect(particle.x-20, particle.y-particle.size/2, 20, particle.y+particle.size/2);
      ctx.fillRect(particle.x-w/2, -h*2, 10, (particle.height+h));
      ctx.fillRect(particle.x-w/2, window.innerHeight-h/6, 10, -1*particle.height);
   
  };
  // ctx.rotate(radians(-10));
  // ctx.fillStyle = "#000000";
  // ctx.fillRect(-w/8,-h/2,400,400);
   ctx.restore();
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
