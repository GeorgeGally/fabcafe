 
var circs = [];  
var r = width/5;

var j = 0;
var vol = 0;
var speed = 2;
var down = true;
vignetteOn = false;

for (var _y= 10; _y < h-10; _y+=10){
  
  for (var _x= 10; _x<w-10; _x+=r){
    var x = _x;
    var lw = random(10)
    var circle =  {
      r: r-10,
      me: j,
      x: x, 
      y: _y,  
      myfill: rgb(255, 255, 255),
      lw: lw
    }
    circs.push(circle);  
  }

  j++;
  //console.log(j)
 }

function draw()  { 
  ctx.clearRect(0, 0, w, h); 
  // if (chance(25)) {
  //  ctx.strokeStyle = "#ffffff";
  // } else {
     ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = "#000000";
  // }
  
  //ctx.fillStyle = "#ffffff"
  //ctx.fillRect(0, 0, w, h)
  for (var i=0; i<circs.length; i++){
    
    var p = circs[i];
    vol = 500*(mic.getSprectrum(i%4096))-4;
    // p.r = tween(p.r, vol, speed);
    p.r = vol;
    p.y += vol;
    if (p.y > height) p.y = 0;
    if (p.y < 0) p.y = height;
    ctx.lineWidth = p.lw;
    //if (chance(2)) {
      ctx.line(p.x, p.y, p.x + r - 0, p.y); 
    // } else {
    //   ctx.line(p.x, p.y - vol, p.x + r - 5, p.y + vol); 
    // }
    
    //ctx.fillEllipse(p.x, p.y, p.x+20, p.y+p.r);   
    //ctx.fillRect(p.x, p.y, r - 5, 0 + 2*Math.abs(vol)); 
    //console.log(vol)
  } 
    
}   


