rbvj = function(){
  samplesize = 20;
  ctx.background(0);
  pixel_size = 28;
  ctx.lineWidth = 0.5;
  var particles = [];
  var max_particles = 1500;

draw = function() {

  motionDetection();
  ctx.background(0, 0.1);
  ctx.scale(-1.0, 1.0);
  ctx.drawImage(video, -w,0, w, h);
  ctx.scale(-1.0, 1.0);
  redFilter();

  for (var j = 0; j < motion_array.length; j++) {

          var m = motion_array[j];
          var c = m.z;
          addParticle(m.x,m.y + random(-10, 10),c);
          ctx.fillStyle = "black";
          //ctx.fillRect(0, m.y + random(-10, 10), m.x/2, random(2, 5));
          
  }
    mirror();
    drawParticles();
    }
  

function redFilter(){
  var imageData = ctx.getImageData(0, 0, w, h);
        var data = imageData.data;

        for(var i = 0; i < data.length; i += 4) {
          // red
          data[i] = data[i]*2;
          // green
          data[i + 1] = 0;
          // blue
          data[i + 2] = data[i + 2];
        }

        // overwrite original image
        ctx.putImageData(imageData, 0, 0);
}


function drawParticles(){
  for (var i = 0; i < particles.length; i++) {
    p = particles[i];
    //p.x += p.speedx;
    p.y += p.speedy;
    p.sz *= 1.15;
    p.speedx += 1.1;
    ctx.fillStyle = "black";
    ctx.fillRect(p.x,p.y,p.sz, 2);
    if (p.y > h || p.sz > w || p.x > w) {
      particles.splice(i,1);
    }

  };
}

function addParticle(_x,_y, c){
  var particle = {
    x: 0,
    y: _y,
    speedy: random(-4,4),
    speedx: random(-5,-2),
    sz: random(3,6),
    col: rgb(c.x)
  }
  particles.push(particle);
  if(particles.length > max_particles) {
        particles.splice(0,1);
      }
}

}


rbvj();

