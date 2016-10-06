
  var particle_array = [];
  var imgData;
  var frame = 0;
  var maxParticles = 1000;
  ctx.font = "300px helvetica";
  ctx.fillStyle="blue";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  var words = ['horse', 'fox', 'hunter', 'disco'];
  
  var xx = 0;
  var num_frames = 92;
  var counter = num_frames;
  var imgs = [];
  for (var i = 0; i < num_frames+1; i++) {
    imgs[i] =  new Image();
    imgs[i].src = 'images/forest/'+ i +'.jpg';
  };
  

  function draw(){
    
    ctx.clearRect(0,0,window.innerWidth,window.innerHeight);

    counter-=0.2;
    frame = Math.abs(Math.floor(counter)%num_frames);


  ctx.drawImage(imgs[frame],0, -0.25*(w-imgs[frame].height), w, w);
  
  xx = tween(xx, random(-250, 250), 100);
  
  ctx.shade(cover_colours[cover_count]);
  // ctx.fillStyle= rgba(0,0,250, 0.5);
  // ctx.fillRect(0,xx+height/2-150,width,xx+height/2-40);
  }

  
