
numParticles = 35;
var particles = [];
var frames=800;
var angle;

var dir = 1;

var movers =1;;
var ss = 0;
var r=2.1001;
var done = 0;
var dot_count = 65;
var spacing = width/numParticles+0.9;

  for (var i = 0; i < numParticles; ++i) {
    particle = addParticle(20,1,14,2,41*i); 
    //dir *=-1;
    particles.push(particle);
    
  }


function draw(){
  // ctx.fillStyle = rgb(255,255,255, 0.2); 
  // ctx.fillStyle = rgba(random(0,255),random(255),random(100,155),random(255));
  // ctx.fillStyle = rgba(0,0,100,0.1); 
  // ctx.fillStyle = rgba(0,155,0,1); 
  // ctx.fillRect(0,0,window.innerWidth,window.innerHeight);
  ctx.lineWidth = 4;
  ctx.clearRect(0,0,w,h);
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
        fillColor: rgb(random(120,255),random(20,155),random(20,155), random(0.5,1)),
        soundArray: soundArray,
        //strokeWeight: 4,
        dir: _dir, 
        target: 0
    }
    return particle;
}


function drawLine(particle) {

  s = findMapping(mic.getSprectrum(Math.floor(particle.offset/10)),28);
  //s = clamp(s, 0, 28);
  particle.soundArray.shift();
  particle.soundArray.push(s);
  //ctx.fillStyle = rgba(0,0,100,0.1);
  ctx.fillStyle = rgb(random(0,255),random(0,100),0);
  ctx.fillStyle = particle.fillColor;
  ctx.strokeStyle = particle.fillColor;
 
 for ( var i = 0; i < numParticles; ++i) {

      //ctx.fillRect(particle.startY-particle.soundArray[i]/2, i*particle.spacing-particle.soundArray[i]/2, particle.soundArray[i]-4,particle.soundArray[i]-4);
      ctx.strokeEllipse(particle.startY, i*particle.spacing, particle.soundArray[i],particle.soundArray[i]);
      ctx.strokeEllipse(particle.startY, i*particle.spacing, 2,2);
      
      //ctx.quadraticCurveTo(i*particle.spacing, particle.soundArray[i], i*particle.spacing+particle.spacing/2, particle.startY);
    }
    //   curveVertex(width, startY);
    //   curveVertex(width, startY);

    // endShape();
  // ctx.closePath();
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
