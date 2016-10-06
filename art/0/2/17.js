
rbvj = function(){
var numParticles= 155;
movers=4
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

function addParticle(me){
    var x = map(i, 0, numParticles, 0, window.innerWidth);
    // if (me%9 ==1) mycolor= rgb (255,0,0);
    // else if (me%9==2)  mycolor= rgb (21, 155,0);
    // else if (me%9==3)  mycolor= rgba (255,255,255,1);
    // else if (me%9==4)  mycolor= rgba (255,0,0,0.80); 
    // else if (me%9==5)  mycolor= rgb (51, 255,0);
    // else if (me%9==6)  mycolor= rgb (225, 0, 0,80);
    // else if (me%9==7)  mycolor= rgb (51, 155,0);
    // else if (me%9==8)  mycolor= rgb (255,80,0);
    // else  mycolor= rgb (255,255,0,80);
    mycolor= rgb (21, 155,0);
      var particle = {
        x: width/2,
        y: height/2,
        centerx: 0,
        centery: window.innerHeight/2,
        center_trail: false,
        height: 400,
        center: false,
        speedx: random(-10,10),
        speedy: random(-10,10),
        kind: "circ",
        r: random(1000),
        strokeColor: rgb(0,0,0),
        fillColor: rgb(0,0,0),
        strokeWeight: 2,
        size: random(80),
        me: me,
        flip: dir,
        myscalex: 1,
        myscaley: 1
    }
    dir *=-1;
    particles.push(particle);
    //console.log(particles[i].x);
}


 
draw = function() {
  ctx.fillStyle = rgb(255,255,255); 
  ctx.fillRect(0,0,window.innerWidth,window.innerHeight);
  //ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
  // for (var i = 0; i < particles.length; i++) {
  //   var x = 0;
  //   var y = 0;
  //   var h  = findMapping(mic.getSprectrum(i*2),300)*3;
  //   h += random(-20,20);
  //   particles[i].height = tween(particles[i].height, h, 20);
  //   particles[i].y = tween(window.innerHeight/2, random(-50,50), 20);

  //   particles[i].size = Math.abs(y);
  // }
  moveParticles();

}

function moveParticles(){

  // ctx.save();
  // ctx.translate(window.innerWidth/2,window.innerHeight/2);
  for (var i = 0; i < particles.length; i++) {
    particle = particles[i];
    s = findMapping(mic.getSprectrum(particle.me*2), width/2) - 5;
    s2 = findMapping(mic.getSprectrum(particle.me*10), 50);
    //xx = findMapping(s, width/2);
    // yy = findMapping(s2, height/2);
    particle.speedx += s;
    particle.speedy += s;
    particle.x += particle.speedx;
    particle.y += particle.speedy;
    if (particle.x>width || particle.x < 0) {particle.speedx *=-0.5; particle.x += particle.speedx;};
    if (particle.y>height || particle.y < 0) {particle.speedy *=-0.5; particle.y += particle.speedy;}

    particle.x = tween(particle.x, width/2, 5);
    particle.y = tween(particle.y, height/2, 5);
    particle.speedx *= 0.99;
    particle.speedy *= 0.99;
    ctx.fillStyle = particle.fillColor;
    ctx.strokeStyle= particle.strokeColor;
    ctx.lineWidth = particle.strokeWeight;

    if(i > 0){
      ctx.line(particle.x, particle.y, particles[i-1].x, particles[i-1].y);
      } else {
      ctx.line(particle.x, particle.y, particles[particles.length-1].x, particles[particles.length-1].y);
      }
      
      //ctx.fillStyle = rgba(0,0,0,0.4);
      //ctx.fillEllipse(particle.x, particle.y, 60, 60);

      ctx.fillStyle = particle.fillColor;
      ctx.fillEllipse(particle.x, particle.y, 20, 20);

  };
  //ctx.restore();
}


function figureBezier (PosX, PosY, echelleX, echelleY) {
  ctx.save();
  ctx.scale (echelleX/5, echelleY/5);
  //PosX = PosX/echelleX;
  PosX = 0;
  PosY = PosY/echelleY;
  ctx.translate(0,-height);
  ctx.beginPath(); 
  ctx.moveTo(PosX+(90), PosY+(height + (40))); 
  //ctx.vertex(PosX+(90), PosY+(height + (40))); 
  ctx.bezierCurveTo(PosX+(90), PosY+(height + (101)), PosX+(50), PosY+(height + (150)), PosX+(0), PosY+(height + (150))); 
  ctx.bezierCurveTo(PosX+(-50), PosY+(height + (150)), PosX+(-90), PosY+(height + (101)), PosX+(-90), PosY+(height + (40))); 
  ctx.bezierCurveTo(PosX+(-90), PosY+(height + (-21)), PosX+(0), PosY+(height + (-150)), PosX+(0), PosY+(height + (-150))); 
  ctx.bezierCurveTo(PosX+(0), PosY+(height + (-150)), PosX+(90), PosY+(height + (-21)), PosX+(90), PosY+(height + (40))); 
  //ctx.stroke();
  ctx.closePath();
  ctx.fill();
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
}

rbvj();