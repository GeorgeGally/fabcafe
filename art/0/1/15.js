num=5
movers=4
var d=350
var d2=420
var frames=800;
var angle;
var theta = 0;
 var counter = 0;

var stage = 2;
 
function draw() {
  ctx.clearRect(0,0,w,h);
  // ctx.strokeStyle="#0000ee";
  ctx.strokeStyle="#ee00cc";
  ctx.fillStyle="#0000ee";
  ctx.fillRect(0,0,w,h);
  ctx.lineWidth = 5;
  ctx.save();
  ctx.translate(w/2,h/2);
  var s = findMapping(mic.getSprectrum(100),40);
  var newd = 100+Math.abs(Math.sin(counter))*d+s;
  d2 = tween(d2, newd, 5);
  ctx.fillStyle="#000000";
  ctx.HfillEllipse(0, 0, d2*2, d2*2);
  ctx.rotate(-theta/2);
  

  if (randomInt(10000) == 444) stage = 0; 
  if (randomInt(10000) == 998) stage = 1; 
  if (randomInt(10000) == 234) stage = 2; 
  if (randomInt(10000) == 445) stage = 3; 

  for (var i=0; i<num; i++) {
    if (stage == 1) {
      if(i%4 == 1) {
        var outerX = Math.sin(theta/2+s/100)*-d2;
        var outerY = -d2/2;
      } else if(i%4 == 2) {
        var outerX = Math.sin(theta/2+s/100)*d2/2;
        var outerY = -d2/2;
      } else if(i%4 == 3) {
        var outerX = Math.sin(theta/2+s/100)*d2/2;
        var outerY = d2/2;
      } else {
        var outerX = Math.sin(theta/2+s/100)*-d2/2;
        var outerY = d2/2;
      }

    } else if (stage == 2) {
    if(i%4 == 1) {
      var outerX = Math.sin(theta/2+s/100)*-d2/2;
      var outerY = -d2/2;
    } else if(i%4 == 2) {
      var outerX = Math.sin(theta/2+s/100)*d2/2;
      var outerY = -d2/2;
    } else if(i%4 == 3) {
      var outerX = d2/2;
      var outerY = d2/2;
    } else {
      var outerX = -d2/2;
      var outerY = d2/2;
    }
    
    } else if (stage == 3) {
    if(i%4 == 1) {
      var outerX = Math.cos(theta/2+s/100)*d2;
      var outerY = Math.sin(theta/2+s/100)*d2;
    } else if(i%4 == 2) {
      var outerX = Math.sin(theta/2+s/100)*d2/2;
      var outerY = Math.sin(theta/2+s/100)*-d2/2;
    } else if(i%4 == 3) {
      var outerX = d2;
      var outerY = Math.sin(theta/2+s/100)*d2/2;
    } else {
      var outerX = Math.sin(theta/2+s/100)*-d2/2;
      var outerY = Math.sin(theta/2+s/100)*d2/2;
    }
    } else {
       if(i%4 == 1) {
      var outerX = -d2/2;
      var outerY = -d2/2;
    } else if(i%4 == 2) {
      var outerX = d2/2;
      var outerY = -d2/2;
    } else if(i%4 == 3) {
      var outerX = d2/2;
      var outerY = d2/2;
    } else {
      var outerX = -d2/2;
      var outerY = d2/2;
    }
    }
    

    angle = 2*Math.PI/num*i;
    //console.log("--"+movers);
    for (var j=0; j<movers; j++) {
      var offSet = 2*Math.PI/movers*j;
       
      var moverX = Math.cos(theta+offSet)*d2;
      var moverY = Math.sin(theta+offSet)*d2;
      //ctx.fillEllipse(moverX,moverY, 10,10)
      ctx.line(outerX, outerY, moverX, moverY);

    }
    
  }
  ctx.restore();
  theta += 2*Math.PI/frames;
  counter+=0.001;
  //if (randomInt(5000) > 4995) drawLogo();
  
}


  function drawLogo(){
    
    //ctx.strokeStyle = "#ffffff";
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
  if (event.which == 92) stage = (stage + 1)%4;
};
