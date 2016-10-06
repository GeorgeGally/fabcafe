rbvj = function(){

  ctx.background(0, 0.2);
  pixel_size = 40;
  ctx.lineWidth = 0.5;
  var max_particles = 2500;
  var particles = [];
  samplesize = 15;

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
  //ctx.fillStyle = rgb(0, 200, 0);
  ctx.fillStyle = "#fff200";
  for (var i = 0; i < particles.length; i++) {
    p = particles[i];
    p.x+=(p.target_x-p.x)/p.speedx;
    p.y+=(p.target_y-p.y)/p.speedy;
    // p.x += p.speedx;
    // p.y += p.speedy;
    p.sz *= 0.8;
    //p.speedx += 5.1;
    
    ctx.fillEllipse(p.x,p.y,p.sz,p.sz);
    ctx.fillEllipse(p.target_x,p.target_y,p.sz*0.8,p.sz*0.8);
    p.target_x += 0.8;
    if (p.sz < 0.1 || dist(p.x, p.y, p.target_x, p.target_y)<0.1) {
      particles.splice(i,1);
    }
  };
}

function addParticle(_x,_y, c){
  var particle = {
    target_x: _x + random(-samplesize/2,samplesize/2),
    target_y: _y + random(-samplesize/2,samplesize/2),
    x: randomInt(w),
    y: randomInt(h),
    speedy: randomInt(5,20),
    speedx: randomInt(5,20),

    sz: random(5,12),
    col: rgb(c.x)
  }
  particles.push(particle);
  if(particles.length > max_particles) {
        particles.splice(0,1);
      }
}

}
rbvj();

