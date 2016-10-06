rbvj = function(){
  samplesize = 10;
  ctx.background(0);
  pixel_size = 28;
  ctx.lineWidth = 0.5;

draw = function() {

  motionDetection();
  ctx.background(0, 0.1);
  ctx.scale(-1.0, 1.0);
  ctx.drawImage(video, -w,0, w, h);
  ctx.scale(-1.0, 1.0);
  
  for (var j = 0; j < motion_array.length; j++) {

          var m = motion_array[j];
          var c = m.z;
          //console.log(c)
          ctx.fillStyle = "white";

          ctx.circle(m.x, m.y, samplesize-2,samplesize-2);
  }
    mirror();
    }
    
}


rbvj();

