
var circSize= 30;
var t = 0; 
var numDots = 120;  
var circs = [];  
var hiFreq = 0;
var loFreq = 1000;
var r = 80;

ctx.lineWidth = 1;
  
  for (var i=0; i<numDots; i++){
    
    var circle =  {
      r: r,
      me: i,
      x: r * Math.cos(t), 
      y: r * Math.sin(t), 
      theta: t
    }
    circs.push(circle); 
    t  +=  radians(360/numDots);  
  }
  
  for (var i=0; i<numDots; i++){
    drawCirc(circs[i],80); 
  }
 

function draw()  {  
    ctx.fillStyle= "blue";
  ctx.fillRect(0, 0, width, height);
  //ctx.clearRect(0,0,window.innerWidth,window.innerHeight);  
  // // Polar to Cartesian conversion 
  // //rotate(radians(frameCount/10));
 for (var i=0; i<numDots; i++){
  var vol = findMapping(mic.getSprectrum(i*2),500);
  drawCirc(circs[i],vol);
  
 } 
      
}   



function drawCirc( p, _rr){   
    // noStroke(); 
    p.r -= (r-_rr)/5;
    p.r = clamp(p.r, 140,400);
    //console.log(_rr)
    // //noFill(); 
    // //stroke(255,200);  
    ctx.strokeStyle = "#000";
    ctx.strokeEllipse(p.x+width/2, p.y+height/2, p.r/2, p.r/2);  
    // //fill(255);

    ctx.strokeEllipse(p.x+width/2, p.y+height/2, 2, 2);  
    // //stroke(255);
    // //pushMatrix();
    // translate(width/2, height/2);
    p.x = p.r * Math.cos(p.theta); 
    p.y = p.r * Math.sin(p.theta); 
    // //popMatrix();
  }

