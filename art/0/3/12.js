 
var circs = [];  
var r = width/12;
ctx.lineWidth = 1;
var j = 0;
var vol = 0;
var speed = 2;
var down = true;
vignetteOn = false;

for (var _y= 10; _y < h-10; _y+=6){
  
  for (var _x= 10; _x<w-10; _x+=r){
    var x = _x
    var circle =  {
      r: r-10,
      me: j,
      x: x, 
      y: _y,  
      myfill: rgb(0, 0, 0)
    }
    circs.push(circle);  
  }

  j++;
  //console.log(j)
 }

function draw()  { 
  // ctx.clearRect(0, 0, w, h); 
  ctx.fillStyle = "#ffffff"
  ctx.fillRect(0, 0, w, h)
  for (var i=0; i<circs.length; i++){
  
    var p = circs[i];
    vol = 220*(mic.getSprectrum(i%4096));
    // p.r = tween(p.r, vol, speed);
    p.r = vol;

    ctx.fillStyle= p.myfill;
    //ctx.fillEllipse(p.x, p.y, p.x+20, p.y+p.r);   
    ctx.fillRect(p.x, p.y, r -10,  2*Math.abs(vol)); 
    //console.log(vol)
  } 
    
}   


