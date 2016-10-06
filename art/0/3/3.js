
num=16;
movers =1;

var frames=400;
var angle;
var hiFreq = 0;
var loFreq = 1000;
var dir = 1;

var ss = 0;
var r=2.1001;

function draw(){

  ctx.fillStyle = rgba(0,0,0,0.2); 
  ctx.fillRect(0,0,width,height);
  ctx.strokeStyle = rgba(0,0,255,0.8);

   var x = map(Math.sin(r),-1,1,22,188);
   r+=0.0004;
  r = r%2.1001;
  ss++;
  ctx.save();
  ctx.translate(window.innerWidth/2,window.innerHeight/2);
  ctx.lineWidth = movers;
   for (var i = 0; i < num; ++i) {
    ctx.rotate(radians(x/10));
    // ctx.strokeEllipse(x, x, i/10, i/10);
    // ctx.strokeEllipse(i, 0, x+i, x);
    ctx.line(i-window.innerWidth, -window.innerWidth, i+window.innerWidth, window.innerWidth);
   } 
   ctx.restore(); 
   if (randomInt(200) == 100)  num = (num+1)%400; 
}


window.onkeydown=function(event){
  
  if (event.which == 38) movers = (movers+1)%20
    if (event.which == 40) movers = (movers-1); if (movers < 0) movers = 20;
  
  if (event.which == 39) {
    num = (num+1)%400;   
    }
  if (event.which == 37) 
     {
      num = (num-2); 
      if (num < 1) {num = 1; } 
      //else {particles.shift();}  
    }
      console.log("numParticles: " + num);
};
