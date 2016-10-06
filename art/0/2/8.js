
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
        fillColor: randomColor({luminosity: 'dark', hue: 'red', format: 'rgb' }),
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
  ctx.fillStyle = rgba(0,0,0,0.8);

  ctx.fillRect(0,0,width,height);
  //ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
  for (var i = 0; i < particles.length; i++) {
    var x = 0;
     //var x = findMapping(mic.getSprectrum(i),window.innerWidth);
    var y = 0;
    particles[i].height = findMapping(mic.getSprectrum(i*2),2*window.innerHeight)*3;
    //var x = 10;
    //console.log(mic.getNote(1)[0]);
    if (particles[i].center_trail == true) {
      particles[i].centerx -= (particles[i].centerx -mouseX)/100;
      particles[i].centery -= (particles[i].centery -mouseY)/100;
    } else {
        // particles[i].x = particles[i].centerx+(x*particles[i].flip);
        // particles[i].y = particles[i].centery+(y*particles[i].flip);      
    }


    particles[i].size = Math.abs(y);
  }
  moveParticles();

}

function moveParticles(){
  ctx.save();
  ctx.translate(w/2, h/2);
  ctx.rotate(radians(45));
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
      ctx.fillRect(particle.x-w/2, 0, 20, particle.height-h);
      ctx.fillRect(particle.x-w/2, window.innerHeight+h/2, 10, -1*particle.height);
    } else if(particle.kind=="circ"){
      ctx.fillStyle= particle.fillColor;
      // console.log(particle.y);
      ctx.HfillEllipse(particle.x-particle.size/2, particle.y-particle.size/2, particle.size, particle.size);
    }
  };
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
