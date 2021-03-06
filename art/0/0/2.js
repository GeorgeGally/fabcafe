rbvj = function(){

  ctx.background(0);
  pixel_size = 40;
  ctx.lineWidth = 0.5;
  var max_particles = 1500;
  var particles = [];
  ctx.strokeStyle = "white";
  samplesize = 20;

  draw = function() {

    motionDetection();
    ctx.background(0);

    for (var j = 0; j < motion_array.length; j++) {

      var m = motion_array[j];
      var c = m.z;
           
      addParticle(m.x,m.y,c);
      
      
      
      
  }
  drawParticles();

}

function drawParticles(){
  for (var i = 0; i < particles.length; i++) {
    p = particles[i];
    p.x += p.speedx;
    p.y += p.speedy;
    p.sz *= 0.95;
    p.speedx -= 2.1;
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
    speedy: random(-4,4),
    speedx: random(-2,-1),
    sz: random(3,26),
    col: rgb(c.x, c.y, c.z)
  }
  particles.push(particle);
  if(particles.length > max_particles) {
        particles.splice(0,1);
      }
}

}
rbvj();

