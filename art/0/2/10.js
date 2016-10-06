
var numParticles= 55;
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

function addParticle(me){
    var x = map(i, 0, numParticles, 0, window.innerWidth);
    if (me%9 ==1) mycolor= rgb (255,0,0);
    else if (me%9==2)  mycolor= rgb (21, 155,0);
    else if (me%9==3)  mycolor= rgba (255,255,255,1);
    else if (me%9==4)  mycolor= rgba (255,0,0,0.80); 
    else if (me%9==5)  mycolor= rgb (51, 255,0);
    else if (me%9==6)  mycolor= rgb (225, 0, 0,80);
    else if (me%9==7)  mycolor= rgb (51, 155,0);
    else if (me%9==8)  mycolor= rgb (255,80,0);
    else  mycolor= rgb (255,255,0,80);
      var particle = {
        x: window.innerWidth/2,
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
        fillColor: mycolor,
        strokeWeight: 4,
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


function draw() {
  ctx.fillStyle = rgb(0,0,0); 
  ctx.fillRect(0,0,window.innerWidth,window.innerHeight);
  //ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
  for (var i = 0; i < particles.length; i++) {
    var x = 0;
     //var x = findMapping(mic.getSprectrum(i),window.innerWidth);
    var y = 0;
    var h  = findMapping(mic.getSprectrum(i*2),300)*3;
    h += random(-20,20);
    particles[i].height = tween(particles[i].height, h, 20);
    particles[i].y = tween(window.innerHeight/2, random(-50,50), 20);

    particles[i].size = Math.abs(y);
  }
  moveParticles();

}

function moveParticles(){

  ctx.save();
  ctx.translate(window.innerWidth/2,window.innerHeight/2);
  for (var i = 0; i < particles.length; i++) {
    particle = particles[i];
      xx = findMapping(mic.getSprectrum(particle.me*2),window.innerWidth/8);
      yy = findMapping(mic.getSprectrum(particle.me*10),window.innerHeight/10);
  particle.myscalex = tween(particle.myscalex, xx, 40);
  particle.myscaley = tween(particle.myscaley, yy, 90);
  // particle.myscalex = tween(particle.myscalex, (random(-4,4)-particle.myscalex)/80,40);
  // particle.myscaley = tween(particle.myscaley, (random(-4,4)-particle.myscaley)/80,40);
  ctx.fillStyle = particle.fillColor;

  figureBezier (particle.x, particle.y, particle.myscalex, particle.myscaley);

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
      ctx.fillStyle= particle.fillColor;

      // console.log(particle.y);
      //ctx.HfillEllipse(particle.x, particle.y+particle.height*2, particle.height*2, particle.height*2);
    }
  };
  ctx.restore();
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
