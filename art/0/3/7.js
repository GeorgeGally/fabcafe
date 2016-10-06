 
var circs = [];  
var r = 20;
ctx.lineWidth = 1;
var j = 0;
var vol = 0;
var speed = 2;
var down = true;


for (var _y= 10; _y < h-10; _y+=10){
  
  for (var _x= 10; _x<w-10; _x+=100){

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
    vol = 50*(mic.getSprectrum(i%1080));
    // p.r = tween(p.r, vol, speed);
    p.r = vol;

    ctx.fillStyle= p.myfill;;
    //ctx.fillEllipse(p.x, p.y, p.x+20, p.y+p.r);   
    ctx.fillRect(p.x, p.y, 90, 0 + 2*Math.abs(vol)); 
    //console.log(vol)
  } 
    
}   


