rbvj = function(){

  ctx.background(0, 0.2);
  pixel_size = 40;
  ctx.lineWidth = 0.5;
  var max_particles = 3500;
  var particles = [];

  draw = function() {

    motionDetection();
    ctx.background(0);

    for (var j = 0; j < motion_array.length; j++) {

      var m = motion_array[j];
      var c = m.z;
           
      addParticle(m.x,m.y,c);
      // addParticle(m.x+pixel_size/2,m.y+pixel_size/2,c);
      // addParticle(m.x-pixel_size/2,m.y-pixel_size/2,c);
      // addParticle(m.x-pixel_size/2,m.y,c);
      // addParticle(m.x+pixel_size/2,m.y,c);
      
      
      
  }
  drawParticles();

}

function drawParticles(){
  for (var i = 0; i < particles.length; i++) {
    p = particles[i];
    p.x += p.speedx;
    p.y += p.speedy;
    p.sz *= 0.99;
    p.speedx += 4.1;
    ctx.fillStyle = p.col;
    ctx.fillEllipse(p.x,p.y,p.sz,p.sz);
    if (p.y > h || p.sz < 0.8) {
      particles.splice(i,1);
    }
  };
}

function addParticle(_x,_y, c){
  var particle = {
    x: _x,
    y: _y,
    speedy: random(-2,2),
    speedx: random(-21,-5),
    sz: random(3,7),
    col: rgb(c.x)
  }
  particles.push(particle);
  if(particles.length > max_particles) {
        particles.splice(0,1);
      }
}

}
rbvj();

