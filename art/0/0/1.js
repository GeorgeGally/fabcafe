rbvj = function(){

  ctx.background(0);
  pixel_size = 60;

draw = function() {
  
  motionDetection();

  ctx.background(0);
  ctx.fillStyle = "black";
  //ctx.save();

  ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = "white";

  if (chance(500)) {
      //pixel_size = Math.sin(frameCount/10000) * 32;
      pixel_size = 2 + randomInt(1,10)*10;
      //pixel_size = freqs[0]/4;
      //freqs[0] = (pixel_size*3 + 25)%100;

  }


  // for (var x = 0; x < w; x += pixel_size) {    
    
  //   for (var y = 0; y < h; y += pixel_size) { 
    
      if (chance(940)) { 
        ctx.fillRect(x , y, pixel_size, pixel_size);
        var x = Math.round(random(w)/pixel_size)*pixel_size; 
        var y = Math.round(random(h)/pixel_size)*pixel_size; 
      }
    // }
    //   }

      for (var j = 0; j < motion_array.length; j++) {
      
          var m = motion_array[j];

          var x = Math.round(m.x/pixel_size)*pixel_size; 
          var y = Math.round(m.y/pixel_size)*pixel_size; 

            ctx.fillStyle = "white";
            ctx.fillRect(x, y, pixel_size, pixel_size);



        }

    


}




}

rbvj();

