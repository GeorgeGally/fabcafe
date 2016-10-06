rbvj = function(){

  ctx.background(0);

	ctx.strokeStyle = rgba(0,0,0,0.8);
	var particles = [];
	var radius = 50;
	var rot = 0;
	var num_particles = 30;
	var space = 4;

	for (var i = 0; i < num_particles; i++) {
			var c = random(225);
		    var cc = rgba(c, c, c, 1);
			addParticle(120, i*space , cc, i);
	}


draw = function(){
	ctx.clearRect(0, 0, w, h);
	ctx.strokeStyle = rgb(255);
	ctx.lineWidth = 0.5;
	//ctx.line(w/2, 0, w/2, h);
	moveParticles();
}


function addParticle(_x, _y, _colour, _me){
	var particle = {
			x: _x,
			y: _y,
			x2: _x,
			y2: _y,
			c: _colour,
			me: _me,
			stroke_width: 40,
			speedx: 0,
			speedy: random(2,20),
			sz: radius+ _me*26,
			angle: 0
	}
	particles.push(particle);
}
	

var on = 2;
var dir = 4;

function moveParticles(){

		for (var i = particles.length-1; i >=0 ; i--) {
			
			p = particles[i];
			
			if (i == on) {
				//console.log(on);
				if (p.y < p.y2 + space) {
					p.y = (p.y + dir);
				} else {
					p.y2 = p.y;
					on = (on + 1)%(particles.length)
				}
				
			
			// if (p.y > height-20) p.y = p.me*space;
			// if (p.y < 20) p.y = p.me*space;
				
			}
			//DISTRIBUTED MAPPED SOUND VALUE  
			freqs[0] = p.me/10;
			var s =map(freqs[0], 0, 150, 10, 150);
			//console.log(s)
			ctx.lineWidth = p.me/30;

			p.x2 = tween(p.x2, p.x + s, 10);

			ctx.line(w/2, h/2 - p.y, w/2 - p.x2, h/2);
			ctx.line(w/2, h/2 + p.y, w/2 - p.x2, h/2);

			ctx.line(w/2, h/2 - p.y, w/2 + p.x2, h/2);
			ctx.line(w/2, h/2 + p.y, w/2 + p.x2, h/2);
		

			
		};

	}
	}
rbvj();