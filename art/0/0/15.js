

rbvj = function(){

  ctx.background(0);

  var circs = [];  
  var r = width/2-10;
  ctx.lineWidth = 1;
  var j = 0;
  var vol = 0;
  var speed = 2;
  var down = true;


  for (var _y= 10; _y < h-10; _y+=20){
  
    for (var _x= left.x; _x< right.x; _x+=box_size.x/2){

      var circle =  {
        r: r,
        me: j,
        x: _x, 
        y: _y,  
        myfill: rgb(255)
      }
      circs.push(circle);  
    }

  j++;

 }

draw = function()  { 
  
  
  ctx.background(0);
  ctx.fillStyle = "black";
  ctx.fillRect(topLeft.x, topLeft.y, box_size.x, box_size.y);
  

  for (var i=0; i<circs.length; i++){
  
    var p = circs[i];
    //vol = 120*(mic.getSprectrum(i%4096));
    vol = random(6) + (freqs[0] + freqs[1])/1000
    //vol = random(4);

    //ctx.fillStyle= p.myfill; 
    ctx.fillStyle = "#fff"; 
    ctx.fillRect(p.x, p.y, box_size.x/2, 0 + 2*Math.abs(vol)); 
    
    for (var j = 0; j < motion_array.length; j++) {
      
        var m = motion_array[j];

        if (p.y >= m.y - pixel_size/2 && p.y < m.y + pixel_size/2 
        && m.x > left.x && m.x <= right.x - pixel_size
        )  {
        
          ctx.fillStyle = "blue";
          ctx.fillRect(p.x, p.y, box_size.x/2, vol);
          //ctx.fillStyle = "white";
      
        }

    }

  } 
//  motionDetection();
    
}   







}

rbvj();

