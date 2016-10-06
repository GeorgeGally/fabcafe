 
var circs = [];  
var r = 20;
ctx.lineWidth = 1;
var j = 0;
var vol = 0;
var speed = 2;
var down = true;


for (var _y= 60; _y < h-60; _y+=100){
  
  for (var _x= 60; _x<w-60; _x+=5){

    var circle =  {
      r: r,
      me: j,
      x: _x, 
      y: _y,  
      myfill: rgb(255, 255, 255)
    }
    circs.push(circle);  
  }

  j++;
  //console.log(j)
 }

function draw()  { 
  ctx.clearRect(0, 0, w, h); 
 
  for (var i=0; i<circs.length; i++){
  
    var p = circs[i];
    vol = 3020*(mic.getSprectrum(i%4096));
    // p.r = tween(p.r, vol, speed);
    p.r = vol;

    ctx.fillStyle= p.myfill;;
    //ctx.fillEllipse(p.x, p.y, p.x+20, p.y+p.r);   
    ctx.fillRect(p.x, p.y, 2, 0 + 2*Math.abs(vol)); 
    //console.log(vol)
  } 
    
}   


