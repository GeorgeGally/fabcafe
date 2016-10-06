rbvj = function(){

	ctx.background(0);
	var grid = createGrid(1, 1, w, h);

	var flies = [];
	var balls = new particleEngine(3);

    b = balls.particles[0];
    b.position.x = grid[0][0];
    b.position.y = h/2;
    b.speed.x = 0;
    b.sz = 20;

    flies[0] = new particleEngine(280);
    for (var j = 0; j < flies[0].particles.length; j++) {
        p = flies[0].particles[j];
        p.position.x = b.position.x;
        p.position.y = b.position.y;
        p.me = p.me + randomInt(200);
    }


// FORCE(gravity) = (G * m1 * m2)/ (d*d) * r
draw = function(){

    // ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = rgba(255, 255, 255, 0.8);
    ctx.fillRect(0, 0, w, h);

        var i = 0;
        b = balls.particles[i];
        
        for (var j = 0; j < flies[i].particles.length; j++) {
            
            p = flies[i].particles[j];
            //ctx.fillStyle = hsl(map(audioChannelVolume[p.me%80], 0, 150, 0, 100),map(audioChannelVolume[p.me%100], 0, 150, 0, 100), 40);
            ctx.fillStyle = "black";
            var mouse = b.position;
            //console.log(mouse)
            mouse = mouse.subtract(p.position);
            // mouse.setMag(0.6);
             mouse.setMag(random(0.5, 0.9));
            //console.log(mouse)
            acceleration = mouse;
            p.speed = p.speed.add(acceleration);
            p.position = p.position.add(p.speed);
            p.speed.limit(randomInt(8, 10));
            //p.sz = 2;
            p.sz =  map(mapAudio(p.me, flies[i].particles.length-1), 0, 100, 0, 6);
            //var s =  map(mapAudio(p.me, flies[i].particles.length-1));
            //var s = fft.getMagnitude(p.me);
            //console.log(s);
            //p.sz =  map(s, 0, 1, 0, 6);
            //p.sz = 4;
            //console.log(p.dist)
            // ctx.line(p.position.x, p.position.y, mouseX, mouseY);
            ctx.fillEllipse(p.position.x, p.position.y, p.sz, p.sz);

        }

 
        b = balls.particles[i];
        var s = mapAudio(b.me, balls.particles.length-1);
        //var s = fft.getMagnitude(b.me%250);
        b.position.y =  tween(b.position.y, map(s, 0, 50, h/2-500, h/2+80) - 90, 4);
        b.position.y = clamp(b.position.y, h/2- 200, h/2+200);
        b.sz =  tween(b.sz, s, 4);
        //b.sz = 4;
        //ctx.fillStyle = hsl(map(audioChannelVolume[p.me*5], 0, 150, 30, 70),map(audioChannelVolume[p.me%100], 0, 150, 0, 100), 15);
        ctx.fillStyle = "black";
        ctx.fillEllipse(b.position.x, b.position.y, b.sz, b.sz);

	}
}
rbvj();