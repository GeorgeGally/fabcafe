
var circSize= 30;
var t = 0; 
var numDots = 120;  
var circs = [];  

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
    ctx.fillStyle= rgb(0,0,200);
    ctx.fillRect(0,0,window.innerWidth,window.innerHeight);
    //ctx.clearRect(0,0,window.innerWidth,window.innerHeight);  
    for (var i=0; i<numDots; i++){
    var vol = findMapping(mic.getSprectrum(i),1800);
    drawCirc(circs[i],vol);
    //ctx.shade(cover_colours[cover_count]);
  } 
      
}   




function drawCirc( p, _rr){   
    p.r -= (r-_rr)/5;
    p.r = clamp(p.r, 1,200);
    ctx.strokeStyle = "#000";
    ctx.fillStyle= "#000";
    ctx.fillEllipse(p.x+width/2, p.y+height/2, p.r, p.r); 
    ctx.fillStyle= rgb(0,0,200); 
    ctx.fillEllipse(p.x+width/2+p.r * Math.cos(p.theta), p.y+height/2+p.r * Math.sin(p.theta), p.r/2, p.r/2);  
  }

