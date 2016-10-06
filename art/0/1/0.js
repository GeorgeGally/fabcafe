var canvas = document.getElementById('canvas1');
ctx = canvas.getContext('2d');
var numParticles=30;
var particles = [];
var frames=400;
var angle;
var hiFreq = 0;
var loFreq = 1000;
var dir = 1;
var width = window.innerWidth;
var height = window.innerHeight;
canvas.width = width;
canvas.height = height;
var movers =1;;
var ss = 0;
var r=2.1001;
var done = 0;
var dot_count = 65;
var spacing = width/numParticles+0.9;

  for (var i = 0; i < numParticles; ++i) {
    particle = addParticle(20,1,14,2,40*i); 
    //dir *=-1;
    particles.push(particle);
    
  }


function draw(){
  //ctx.fillStyle = rgb(255,255,255); 
  ctx.fillStyle = rgba(0,0,100,0.5); 
  ctx.fillRect(0,0,window.innerWidth,window.innerHeight);
//ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
  for (var i=0; i<particles.length; i++){
        drawLine(particles[i]);  
  };
}


function addParticle (_offset, _dir, _numItems, _sw, _sy) {
      
      var soundArray = [];
      
      var startY = _sy-20;
      
      for ( var i = 0; i < numParticles; ++i) {
        soundArray[i]=1; 
      }

      var particle = {
        offset: _offset,
        sw: _sw,
        sy: _sy,
        r:random(1000),
        spacing: spacing,
        startY: startY,
        strokeColor: "#ffffff",
        fillColor: "#ffffff",
        soundArray: soundArray,
        strokeWeight: 4,
        dir: _dir, 
        target: 0
    }
    return particle;
}


function drawLine(particle) {

  s = findMapping(mic.getSprectrum(particle.offset/10));
  //s = clamp(s,2,35);
  s = map (s,0,100,1,30);
  particle.soundArray.shift();
  particle.soundArray.push(s);
  ctx.strokeStyle = particle.strokeColor;
  //ctx.line(200,200,200,600)
    ctx.beginPath();
      ctx.moveTo(0, particle.startY);
      ctx.quadraticCurveTo((i)*particle.spacing, 10, i*particle.spacing+particle.spacing/2, particle.startY); 
    for ( var i = 0; i < numParticles; ++i) {
      ctx.strokeEllipse(i*particle.spacing, particle.startY, particle.soundArray[i],particle.soundArray[i]);
      ctx.quadraticCurveTo(i*particle.spacing, particle.soundArray[i], i*particle.spacing+particle.spacing/2, particle.startY);
    }
    //   curveVertex(width, startY);
    //   curveVertex(width, startY);

    // endShape();
  ctx.closePath();
}



window.onkeydown=function(event){
  
  if (event.which == 38) movers = (movers+1)%20
    if (event.which == 40) movers = (movers-1); if (movers < 0) movers = 20;
  
  if (event.which == 39) {
    numParticles = (numParticles+1)%400;   
    }
  if (event.which == 37) 
     {
      numParticles = (numParticles-2); 
      if (numParticles < 1) {numParticles = 1; } 
      //else {particles.shift();}  
    }
      console.log("numParticles: " + numParticles);
};
