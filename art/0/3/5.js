 
var circs = [];  
var r = 20;
ctx.lineWidth = 1;
var j = 0;
var vol = 0;
var speed = 2;
var down = true;


for (var _y= 60; _y < h-60; _y+=40){
  
  for (var _x= 60; _x<w-60; _x+=30){

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
    vol = 620*(mic.getSprectrum(i));
    // p.r = tween(p.r, vol, speed);
    p.r = vol;

    ctx.fillStyle= p.myfill;;
    //ctx.fillEllipse(p.x, p.y, p.x+20, p.y+p.r);   
    ctx.fillRect(p.x, p.y, 20, 10 + Math.abs(vol)); 
    //console.log(vol)
  } 
    
}   


