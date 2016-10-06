rbvj = function(){

  ctx.background(0);
  pixel_size = 40;
  samplesize = 20;
  ctx.lineWidth = 0.5;
  var max_particles = 4000;
  var particles = [];
  var tail_length_max = 6;
  ctx.lineWidth = 2;
  ctx.strokeStyle = rgba(255, 0.2);

  draw = function() {

    motionDetection();
    ctx.background(0, 0.9);

    for (var j = 0; j < motion_array.length; j++) {

      var m = motion_array[j];
      var c = m.z;
           
      addParticle(m.x,m.y,c);
      //addParticle(m.x+pixel_size/2,m.y+pixel_size/2,c);
      
      if (particles.length > max_particles) {
      particles.splice(0,1);
      }  
  }



  drawParticles();

}

function drawParticles(){
  for (var i = 0; i < particles.length; i++) {
    p = particles[i];
    p.x += p.speedx;
    p.y += p.speedy;
    var pos = new Vector(p.x, p.y);
    p.tail.push(pos);
    p.sz *= 0.98;
    p.speedx += random(2,4);
    //ctx.fillStyle = p.col;
    //ctx.fillRect(p.x,p.y,p.sz,p.sz);
    tail(p);
    if (p.y > h || p.y < 0 || p.x > w || p.x < 0 || p.sz < 0.1) {
      particles.splice(i,1);
    }
  };
}

function tail(p){

    // ctx.strokeStyle = rgba(255, 0.6);
    ctx.strokeStyle = p.c;
    if(p.tail.length > tail_length_max) {
        p.tail = p.tail.splice(p.tail.length - tail_length_max, p.tail.length);
    }

    for(var k=0; k < p.tail.length-1; k++) {
                
        p0 = p.tail[k];
        p1 = p.tail[k+1];

        var t = p.radius - map(k, 0.0, p.tail.length-1, 0.1, p.radius);
        ctx.lineWidth = p.radius * t;
        // draw trail  
        ctx.line(p0.x, p0.y, p1.x, p1.y);
          
}

}

function addParticle(_x,_y, c){
    if (_x<w/2) {
        dirx = -1; 
    } else {
        dirx = 1; 
    }

    if (_y<h/2) {
        diry = -1; 
    } else {
        diry = 1; 
    }
    var trail = [];
    var particle = {
    x: _x,
    y: _y,
    speedy: diry*random(-8,8),
    speedx: random(-1,8),
    sz: random(2,6),
    radius: 3,
    tail: trail,
    c: rgba(c.x, c.y, 0, 0.8)
    //c: rgb(0, c.y, c.z/2)
    //c: rgb(c.x, 0, c.z)
    // c: rgb(c.x, c.y, c.z)
  }
  particles.push(particle);
  if(particles.length > max_particles) {
        particles.splice(0,1);
      }
}

}
rbvj();

