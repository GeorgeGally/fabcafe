rbvj = function(){

  ctx.background(0);
  var frame = 0;
  var counter = 0;
  var imgs = [];
  
  for (var i = 0; i < 15; i++) {
    imgs[i] =  new Image();
    imgs[i].src = 'images/grey_eyes/eyes'+(i+1)+'.jpg';
  };
  

  draw = function (){
    
    ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
    
    if (frame == 5 || frame == 12) {
        
      if (chance(6000)) {
        
        counter += 1;
        frame = 5+Math.abs(Math.floor(Math.sin(counter)*9));

      }

    } else {

      counter+=0.1;
      frame = 5+Math.abs(Math.floor(Math.sin(counter)*9));
    
    }
    
    ctx.drawImage(imgs[frame],0, 0, window.innerWidth*1.6, window.innerHeight);

    
  }



}

rbvj();