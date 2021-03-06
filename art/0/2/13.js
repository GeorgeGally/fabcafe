
var numParticles=50;
var frames=400;
var angle;

var dir = 1;

canvas.width = width;
canvas.height = height;
var particles = [];
var x = 0;
var y = 0;
for (var i = 0; i < numParticles; i++) {
    x = x+(Math.cos(i)), 
    y = y+(Math.sin(i));
  addParticle(i, x, y);
  //console.log(x)
}

function addParticle(i, x, y){
      var particle = {
        x: x,
        y: y,
        centerx: width/2,
        centery: height/2,
        size: 200,
        speedx: random(50,100),
        speedy: 0,
        kind: "line",
        r:random(1000),
        strokeColor: '#fff',
         //strokeColor: rgb(random(100,255),random(55),random(155)),
        fillColor: rgba(random(100,255),random(55),random(100,255),random(255)),
        strokeWeight: 1,
        me: i,
        flip: dir,
        dir: dir, 
        target: 0
    }
    dir *=-1;
    particles.push(particle);
}


 
function draw() {
  ctx.fillStyle= "blue";
  ctx.fillRect(0, 0, width, height);
    
  ctx.clearRect(0,0,window.innerWidth,window.innerHeight);

  for (var i = 0; i < particles.length; i++) {
    
  }
  moveParticles();

}

function moveParticles(){

  for (var i = 0; i < particles.length; i++) {
    particle = particles[i];
    var f = findMapping(mic.getSprectrum(100))*particle.dir;
    
    //particle.size = clamp(f,120,400);
    particle.size = f;
    //particle.size -= (f-particle.size)/10;
    particle.x= particle.size * (Math.sin(i)), 
    particle.y = particle.size * (Math.cos(i));
    if(particle.kind =="line"){
      ctx.strokeStyle= particle.strokeColor;
      ctx.lineWidth = particle.strokeWeight;
      if (particle.dir == 1) {
        var v= 0;
      } else {
        var v= window.innerWidth;
      }
      if (particle.dir == -1) {
        var vv= 0;
      } else {
        var vv= window.innerWidth;
      }
      //ctx.line(particle.centerx+particle.x, particle.centery+particle.y,v,particle.centery);
      ctx.line(vv, particle.centery+particle.y,v,particle.centery);
      //ctx.lineTo(particle.centerx+particle.x, particle.centery+particle.y);
      ctx.fillStyle = '#fff';
      //ctx.fillEllipse(particle.centerx+particle.x, particle.centery,10,10);
    } else if(particle.kind=="rect"){
      ctx.fillStyle= particle.fillColor;
      ctx.fillRect(particle.x-particle.size/2, 0, particle.size, window.innerHeight);
    }
  };
}


// move this into keypress eventually

window.onkeydown=function(event){
  
  // if (event.which == 38) movers = (movers+1)%40
  //   if (event.which == 40) movers = (movers-1); if (movers < 0) movers = 40;
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
