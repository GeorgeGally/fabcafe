rbvj = function(){
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
 
  draw = function()  {  
    ctx.fillStyle= rgb(0,0,200);
    ctx.fillRect(0,0,window.innerWidth,window.innerHeight);
    //ctx.clearRect(0,0,window.innerWidth,window.innerHeight);  
    for (var i=0; i<numDots; i++){
    var vol = 2* findMapping(mic.getSprectrum(i),5500);
    drawCirc(circs[i],vol);
  } 
      
}   




function drawCirc( p, _rr){   
    p.r -= (r-_rr)/5;
    p.r = clamp(p.r, 1,200);
    ctx.strokeStyle = "#000";
    ctx.strokeEllipse(p.x+width/2, p.y+height/2, p.r, p.r);  
    ctx.strokeEllipse(p.x+width/2+p.r * Math.cos(p.theta), p.y+height/2+p.r * Math.sin(p.theta), 2, 2);  
  }

}
rbvj();