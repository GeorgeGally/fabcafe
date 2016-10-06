
  var frame = 0;
  var counter = 0;
  var xx = 0;
  var num_frames = 23;
  var imgs = [];
  for (var i = 0; i < num_frames+1; i++) {
    imgs[i] =  new Image();
    imgs[i].src = 'images/sun/'+(i)+'.jpg';
  };
  

  function draw(){
    
    ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
    counter+=0.01;
    frame = Math.abs(Math.floor(Math.sin(counter)*num_frames));
    //frame = Math.abs(Math.floor(counter)%num_frames+1);

  ctx.drawImage(imgs[frame],0, -280, w, w);
  
  xx = tween(xx, random(-250, 250), 100);
  
  ctx.shade(cover_colours[cover_count]);
  // ctx.fillStyle= rgba(0,0,250, 0.5);
  // ctx.fillRect(0,xx+height/2-150,width,xx+height/2-40);
  }

  
