
var numParticles=100;
var frames=400;
var angle;
var dir = 1;
var rect = false;
var movers =1;;
var ss = 0;
var r=2.1001;
var done = 0;

function draw(){

  ctx.fillStyle = rgba(0,0,100,0.5); 
  ctx.fillRect(0,0,window.innerWidth,window.innerHeight);
  ctx.strokeStyle = rgba(255,255,255,0.5);

  var x = map(Math.sin(r),-1,1,22,188);
   
  if (r < window.innerWidth-90 && done == 0) { 
    r+=1.8;
  } else {
    done = 1;
    sound = 20+findMapping(mic.getSprectrum(100),800);
    r = sound;
    //if(!isNaN(mic)) r = tween(r, 20+findMapping(mic.getSprectrum(100), width),5);
  }

  ss++;
  ctx.save();
  ctx.translate(window.innerWidth/2,window.innerHeight/2);
  ctx.fillStyle = rgb(0,0,0);
  if (random(1500)>1490) rect = !rect;
    ctx.HfillEllipse(0, 0, r,r);  
    ctx.restore(); 
  }


