
var t = 0; 
var numDots = 90;  
var circs = [];  
var r = 310;
var r2 = 400;

ctx.lineWidth = 1;
  
  for (var i=0; i<numDots; i++){
      if (i == numDots/2) r = r2;
    var circle =  {
      r: r,
      me: i,
      x: w/2 + r * Math.cos(t), 
      y: h/2 + r * Math.sin(t), 
      theta: t,
      myfill: rgb(0, 0, random(245)+10)
    }
    circs.push(circle); 
    t  +=  radians(360/numDots);  
  }
  
  for (var i=0; i<numDots; i++){
    drawCirc(circs[i],r); 
  }
 

function draw()  { 
  ctx.clearRect(0, 0, w, h); 
  ctx.fillStyle= rgba(0,0,0,0.02);
 ctx.fillRect(0, 0, w, h);
  //ctx.clearRect(0,0,window.innerWidth,window.innerHeight);  
  // // Polar to Cartesian conversion 
  // //rotate(radians(frameCount/10));
 for (var i=0; i<numDots; i++){
  var vol = findMapping(mic.getSprectrum(i),1500);
  drawCirc(circs[i],vol);
  
 } 
      
}   




function drawCirc( p, _rr){   
    // noStroke(); 
    p.r = tween(p.r, 50+_rr, 25);
    // p.x = r2/2 * Math.cos(p.r);
    // p.y = r/2 * Math.sin(p.r);
    p.r = clamp(p.r, 40,800);
    //console.log(_rr)
    // //noFill(); 
    // //stroke(255,200);  
    //ctx.strokeStyle = "#000";
    ctx.fillStyle= p.myfill;;
    ctx.fillEllipse(p.x+width/2, p.y+height/2, p.r/3, p.r/3);  
    // //fill(255);
    ctx.fillStyle = "#000";
    ctx.fillEllipse(p.x+width/2, p.y+height/2, 4, 4);  
    // //stroke(255);
    // //pushMatrix();
    // translate(width/2, height/2);
    p.x = p.r * Math.cos(p.theta); 
    p.y = p.r * Math.sin(p.theta); 
    // //popMatrix();
  }

