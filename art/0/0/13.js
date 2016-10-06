rbvj = function(){

  ctx.background(0);
  pixel_size = 18;
  ctx.lineWidth = 0.5;

draw = function() {

  	motionDetection();
  	ctx.background(0, 0.1);

  	pixel_size = clamp(motion_array.length/50, 10, 100); 
 	for (var x = 0; x < w; x += pixel_size) {    
    
    	for (var y = 0; y < h; y += pixel_size) { 

  			for (var j = 0; j < motion_array.length; j++) {

	          var m = motion_array[j];
    	      var c = m.z;
        		if (x >= m.x - pixel_size/2 && x < m.x + pixel_size/2 &&
            	y >= m.y - pixel_size/2 && y < m.y + pixel_size/2)  {
          
            		ctx.fillStyle = rgb(c.x);
            		ctx.fillRect(x, y, pixel_size/4, pixel_size*10);

          		}
    		}
		}
	}

}

}
rbvj();

