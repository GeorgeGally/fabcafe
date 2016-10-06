rbvj = function(){

  ctx.background(0);
  pixel_size = w/6;
  ctx.strokeStyle = "white";
  ctx.lineWidth = 2;
draw = function() {

  ctx.background(0);
  
  ctx.scale(-1.0, 1.0);
  ctx.drawImage(video, -w,0, w, h);
  ctx.scale(-1.0, 1.0);


  
  for (var x = 0; x < w; x += pixel_size) {    
    
    for (var y = 0; y < h; y += pixel_size) { 
         
    ctx.save();
    
    // ctx.beginPath();
    // ctx.moveTo(188, 150);
    // ctx.curveTo(288, 0, 388, 150);
    // ctx.lineWidth = 10;
    // ctx.quadraticCurveTo(288, 288, 188, 150);
    // ctx.lineWidth = 100;
    ctx.fillEllipse(x , y, pixel_size-20, pixel_size-20);
    // ctx.beginPath();
    // ctx.ellipse(w/2 , h/2, 200, 200);
    // ctx.fill(); 
    
    // ctx.closePath();
    ctx.clip();
    ctx.drawImage(video, 0, 0, w, h);
    ctx.restore(); 
    ctx.HstrokeEllipse(x , y, pixel_size-20, pixel_size-20);
     }
      }

    
    

    


}



function circ(x, y, w, h){

}


}

rbvj();

