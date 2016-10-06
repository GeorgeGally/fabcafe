rbvj = function(){

ctx.background(0);
ctx.fillStyle = rgba(255, 0.01);
var particles = new particleEngine(1500);

for (var i = 0; i < particles.particles.length; i++) {
        p = particles.particles[i];
        p.position.x = w/2;
        p.position.y = map(i, 0, particles.particles.length, 0, h);
        //console.log()
    }


draw = function(){

    freqs[2] = Math.sin(frameCount/100)* 50;
    for (var i = 0; i < particles.particles.length; i++) {
        p = particles.particles[i];
        p.position.x = w/2 + posNeg() * mapAudio(p.me, particles.particles.length);
        ctx.fillRect(p.position.x, p.position.y, 1, 1);
    }
}

    
}

rbvj();
