var circSize= 30;
var t = 0; 
var numDots = 400;  
var circs = [];  
var r = 12;

ctx.lineWidth = 1;
  
  for (var i=0; i<numDots; i++){
    var b = random(100,215);
    var circle =  {
      r: randomInt(2,60),
      me: i,
      speed: b/10,
      x: random(width), 
      y: 0,
      // fillColor: rgba(55,0,b,random(0.5,1)), 
      fillColor: randomColor({hue:'red'}), 
      theta: t
    }
    circs.push(circle); 
    //t  +=  radians(360/numDots);  
  }
  
  for (var i=0; i<numDots; i++){
    drawCirc(circs[i],80); 
  }
 
  function draw()  {  

  // ctx.fillRect(0,0,window.innerWidth,window.innerHeight);
    ctx.clearRect(0,0,w,h);  
    for (var i=0; i<numDots; i++){
      var vol = findMapping(mic.getSprectrum(i),4*h);
      if (vol<4) vol = random(20);
      drawCirc(circs[i],vol); 
    } 
  //console.log(mic.getSprectrum(1000));
}   



function drawCirc( p, _rr){   
    var newy = p.y +_rr;
    if (newy<p.y) {
    p.y = tween(p.y, newy, p.speed*3);
  } else {
    p.y = tween(p.y, newy, p.speed*2);
  }
  if (p.y> h) p.y = random(-100,-10);
    ctx.fillStyle = p.fillColor; 
    ctx.fillEllipse(p.x, p.y, p.r, p.r);  
  }

