rbvj = function(){

  ctx.background(0);
  pixel_size = 40;
  ctx.lineWidth = 0.5;
  var max_particles = 2500;
  var particles = [];

  draw = function() {

    motionDetection();
    ctx.background(0);

    ctx.scale(-1.0, 1.0);
    ctx.drawImage(video, -w,0, w, h);
    ctx.scale(-1.0, 1.0);


}

function drawParticles(){
  for (var i = 0; i < particles.length; i++) {
    p = particles[i];
    p.x += p.speedx;
    p.y += p.speedy;
    p.sz *= 0.999;
    p.speedx += 12.1;
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
    speedx: random(1,8),
    sz: random(2,6),
    col: rgb(c.x, c.y, c.z)
  }
  particles.push(particle);
  if(particles.length > max_particles) {
        particles.splice(0,1);
      }
}

}
rbvj();

