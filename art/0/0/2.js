rbvj = function(){

  ctx.background(0);
  pixel_size = 28;
  ctx.lineWidth = 0.3;
  samplesize = 8;
  
draw = function() {

  motionDetection();
  ctx.background(0, 0.1);
  for (var j = 0; j < motion_array.length; j++) {

          var m = motion_array[j];
          universe(m.x, m.y, m.z);

        }
    }
}


function universe(x, y, c){
  
  var b = brightness(c.x, c.y, c.z);
  //console.log(c)
  _num = 5;

  for (var i = 0; i< _num; i++){
    ctx.save();
    ctx.fillstyle = rgba(c.x, c.y, c.z, 0.5);
    
    var n = x;
    var m = y;
    
    n+= random(-50,50);
    m+= random(-50,50);
    var ww = w/random(10, 30);
    ww+= random(-5,5);
    ctx.translate(n, m);
    
    ctx.rotate(radians(b));
    //ellipse(n, m, 80+w,80+w);
    ctx.strokeStyle = rgb(c.x, c.y, c.z, 0.15);
    ctx.line(-ww, -ww, ww, ww);
    ctx.rotate(radians(-b));
    ctx.restore();
  } 

}





rbvj();

