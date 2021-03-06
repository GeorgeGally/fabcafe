rbvj = function(){

  ctx.background(0);
  pixel_size = 40;
  ctx.lineWidth = 0.5;
  var max_particles = 2500;
  var particles = [];

  draw = function() {

    motionDetection();
    ctx.background(0);

    for (var j = 0; j < motion_array.length; j++) {

      var m = motion_array[j];
      var c = m.z;
           
      addParticle(m.x,m.y,c);
      addParticle(m.x+pixel_size/2,m.y+pixel_size/2,c);
      

      
  }
  drawParticles();

}

function drawParticles(){
  for (var i = 0; i < particles.length; i++) {
    p = particles[i];
    p.x += p.speedx;
    p.y += p.speedy;
    p.sz *= 0.999;
    p.speedx += 2.1;
    ctx.fillStyle = p.col;
    ctx.fillEllipse(p.x,p.y,p.sz,p.sz);
    if (p.y > h || p.y < 0 || p.x > w || p.sz < 0.5) {
      particles.splice(i,1);
    }
  };
}

function addParticle(_x,_y, c){
  var particle = {
    x: _x,
    y: _y,
    speedy: random(-4,4),
    speedx: random(1,8),
    sz: random(2,15),
    col: rgb(c.x, 0, c.z)
    // col: rgb(c.x, c.y, c.z)
  }
  particles.push(particle);
  if(particles.length > max_particles) {
        particles.splice(0,1);
      }
}

}
rbvj();

