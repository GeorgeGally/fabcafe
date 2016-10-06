 
var circs = [];  
var r = 150;
ctx.lineWidth = 1;
var j = 0;
var vol = 0;
var speed = 5;
var down = true;
for (var y=r; y<h; y+=r){
  
  for (var x=r; x<w; x+=r){

    var circle =  {
      r: r,
      me: j,
      x: x, 
      y: y, 
      // myfill: randomColor({hue: 'pink', luminosity: 'dark'}) 
      myfill: rgb(255, 0, 0)
    }
    circs.push(circle);  
  }

  j++;
 }

function draw()  { 
  ctx.clearRect(0, 0, w, h); 
 
 for (var i=0; i<circs.length; i++){
  var p = circs[i];
  //if (!isNaN(mic) && mic!=undefined) 
    vol = 25+findMapping(mic.getSprectrum(i*20),r*1.1);
    // if (r < 20) down = false;
    // if (vol > p.r && down == false) {
    //   speed = 2
    // } else {
    //   speed = 50;
    //   down = true;
    // }

  p.r = tween(p.r, vol, speed);
    // p.r = clamp(p.r, 40,800);
    ctx.fillStyle= p.myfill;;
    ctx.strokeStyle = "black";
    ctx.fillRect(p.x, p.y, p.r, p.r);  
    ctx.strokeEllipse(p.x, p.y, 20, 20);
    ctx.fillStyle = "black";  
    ctx.fillRect(p.x, p.y, 20, 20);  
 
 } 
  if (v>50 || chance(200)) {

    console.log('xx')
    for (var i=0; i<circs.length; i++){
      var p = circs[i];
      p.r = 200;
      ctx.fillStyle= p.myfill;
      ctx.fillRect(p.x, p.y, p.r, p.r);  
      ctx.strokeStyle = "black";
      ctx.strokeEllipse(p.x, p.y, 20, 20);
      ctx.fillStyle = "black";  
      ctx.fillRect(p.x, p.y, 20, 20); 
    }
  }    
}   


