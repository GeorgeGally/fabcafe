 
var circs = [];  
var r = 100;
ctx.lineWidth = 1;
var j = 0;
var vol = 0;
var speed = 2;
var down = true;
for (var y=r/2; y<h; y+=r){
  
  for (var x=r/2; x<w; x+=r){

    var circle =  {
      r: r,
      me: j,
      x: x, 
      y: y, 
      // myfill: randomColor({hue: 'pink', luminosity: 'dark'}) 
      myfill: rgb(255, 255, 255)
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
    vol = 25+findMapping(mic.getSprectrum(i*10),r*4);

  p.r = tween(p.r, vol, speed);
    // p.r = clamp(p.r, 40,800);
    ctx.fillStyle= p.myfill;;
    ctx.strokeStyle = "black";
    ctx.fillRect(p.x, p.y, p.r, p.r);  
    ctx.fillRect(p.x, p.y, 20, 20);
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


