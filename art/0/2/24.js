
num = 2;
movers = 2;
var d = 350;
var d2 = 320;
var frames=800;
var angle;
var theta = 0;
var counter = 0;
var stage = 0;
 
function draw() {
  ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
  ctx.fillStyle = rgba(0,0,200,0.8);
  ctx.fillRect(0,0,width,height);
  ctx.strokeStyle="#cc0011";
  ctx.fillStyle="black";
  ctx.lineWidth = 4;
  ctx.save();
  ctx.translate(window.innerWidth/2,window.innerHeight/2);
  ctx.rotate(-theta/10);
  d2 = tween(d2, Math.abs(Math.sin(counter))*d + findMapping(mic.getSprectrum(100),200),120);;

  if (randomInt(10000) == 444) stage = 0; 
  if (randomInt(10000) == 998) stage = 1; 
  if (randomInt(10000) == 234) stage = 2; 
  if (randomInt(10000) == 445) stage = 3; 

  for (var i=0; i<num; i++) {
    if (stage == 1) {
      if(i%4 == 1) {
        var outerX = Math.sin(theta/2)*-window.innerWidth/2;
        var outerY = -window.innerHeight/2;
      } else if(i%4 == 2) {
        var outerX = Math.sin(theta/2)*window.innerWidth/2;
        var outerY = -window.innerHeight/2;
      } else if(i%4 == 3) {
        var outerX = Math.sin(theta/2)*window.innerWidth/2;
        var outerY = window.innerHeight/2;
      } else {
        var outerX = Math.sin(theta/2)*-window.innerWidth/2;
        var outerY = window.innerHeight/2;
      }

    } else if (stage == 2) {
    if(i%4 == 1) {
      var outerX = Math.sin(theta/2)*-window.innerWidth/2;
      var outerY = -window.innerHeight/2;
    } else if(i%4 == 2) {
      var outerX = Math.sin(theta/2)*window.innerWidth/2;
      var outerY = -window.innerHeight/2;
    } else if(i%4 == 3) {
      var outerX = window.innerWidth/2;
      var outerY = window.innerHeight/2;
    } else {
      var outerX = -window.innerWidth/2;
      var outerY = window.innerHeight/2;
    }
    
    } else if (stage == 3) {
    if(i%4 == 1) {
      var outerX = -window.innerWidth/2;
      var outerY = Math.sin(theta/2)*-window.innerHeight/2;
    } else if(i%4 == 2) {
      var outerX = Math.sin(theta/2)*window.innerWidth/2;
      var outerY = Math.sin(theta/2)*-window.innerHeight/2;
    } else if(i%4 == 3) {
      var outerX = window.innerWidth/2;
      var outerY = Math.sin(theta/2)*window.innerHeight/2;
    } else {
      var outerX = Math.sin(theta/2)*-window.innerWidth/2;
      var outerY = Math.sin(theta/2)*window.innerHeight/2;
    }
    } else {
       if(i%4 == 1) {
      var outerX = 100 + Math.sin(counter/2)*-d2;
      var outerY = 100 + Math.sin(theta/2)*-d2;
    } else if(i%4 == 2) {
      var outerX = -100 + Math.sin(theta/2)*d2;
      var outerY = 100 + Math.sin(counter/2)*-d2;
    } else if(i%4 == 3) {
      var outerX = -100 + Math.sin(counter/2)*d2;
      var outerY = -100 + Math.sin(theta/2)*d2;
    } else {
      var outerX = 100 + Math.sin(theta/2)*-d2;
      var outerY = -100 + Math.sin(counter/2)*d2;
    }
    }
    
    //;
    angle = 2*Math.PI/num*i;
    //console.log("--"+movers);
    for (var j=0; j<movers; j++) {
      var offSet = 2*Math.PI/movers*j;
       
      var moverX = Math.cos(theta+offSet)*d2;
      var moverY = Math.sin(theta+offSet)*d2;
      ctx.strokeEllipse(moverX,moverY, 0.2*d2,0.2*d2)
      ctx.strokeEllipse(moverX,moverY, Math.sin(-theta/2)*d2,Math.sin(-theta/2)*d2)
      ctx.line(outerX, outerY, moverX, moverY);

    }
    ctx.HstrokeEllipse(0, 0, d2*2, d2*2);
    //ctx.line(100, 100, 300, 200);
  }
  ctx.restore();
  theta += 2*Math.PI/frames;
  counter+=0.001;
  //movers = Math.sin(theta/2)*20;
  //if (randomInt(2000) > 1995) drawLogo();
}


  function drawLogo(){
    
    ctx.strokeStyle = "#cc00cc";
    ctx.lineWidth = 4;
    ctx.save();
    ctx.translate(width/2, height/2);
    ctx.rotate(radians(180));
    ctx.moveTo(-200,-100);
    ctx.line(-200,-100,-200,100);  
    ctx.line(200,-100,200,100);
    ctx.line(-200,0,-100,0);
    ctx.line(200,0,100,0);
    ctx.line(-200,-200, 0,200);
    ctx.line(200,-200, 0,200, 0);
    ctx.line(-100,0, 0,-150);
    ctx.line(100,0, 0,-150);
    ctx.restore();
    
  }


window.onkeydown=function(event){
  //console.log("xxxx"+event.which);
  if (event.which == 38) movers = (movers+1)%40
    if (event.which == 40) movers = (movers-1); if (movers < 0) movers = 40;
  if (event.which == 39) num = (num+1)%20;
  if (event.which == 37) num = (num-1); if (num < 0) num = 40;
      console.log("movers "+ movers);
      console.log("num: " + num);
  if (event.which == 32) stage = (stage + 1)%4;
};
