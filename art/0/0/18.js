rbvj = function(){

  ctx.background(0);

	ctx.strokeStyle = rgba(0,0,0,0.8);
	var particles = [];
	var rot = 0;
	var num_particles = 20;
	var space = 12;
	ctx.strokeStyle = rgb(255);
	ctx.lineWidth = 3;

	for (var i = 0; i < num_particles; i++) {
			var c = random(225);
		    var cc = rgba(c, c, c, 1);
			addParticle(i*space, 220, cc, i);
	}


draw = function(){
	
	ctx.clearRect(0, 0, w, h);

	// draw diamond mask
	var p = particles[particles.length-1];
	ctx.save();
	ctx.translate(w/2, h/2);

	ctx.beginPath(); 

  	ctx.moveTo(0, 0 - p.y); 
  	ctx.lineTo(0 - p.x2, 0);

  	ctx.moveTo(0, 0 + p.y); 
	ctx.lineTo(0 - p.x2, 0);

	ctx.lineTo(0, 0 - p.y); 
	ctx.lineTo(p.x2, 0);

	ctx.lineTo(0, 0 + p.y); 
	ctx.lineTo(0 + p.x2, 0);

  	ctx.fill(); 
  	ctx.closePath();

  	ctx.translate(-w/2, -h/2);
  	ctx.clip();
    
    ctx.scale(-1.0, 1.0);
    ctx.drawImage(video, -w,0, w, h);
    ctx.scale(-1.0, 1.0);

    triangulate(30,30, 0.7); 

    ctx.restore();

    

    ctx.translate(w/2, h/2);

    moveParticles();
	//drawParticles();


	
	//ctx.lineWidth = 4;
	ctx.beginPath(); 

  	ctx.moveTo(0, 0 - p.y); 
  	ctx.lineTo(0 - p.x2, 0);

  	ctx.moveTo(0, 0 + p.y); 
	ctx.lineTo(0 - p.x2, 0);

	ctx.lineTo(0, 0 - p.y); 
	ctx.lineTo(0 + p.x2, 0);

	ctx.lineTo(0, 0 + p.y); 
	ctx.lineTo(0 + p.x2, 0);

  	ctx.stroke(); 
  	ctx.closePath();
  	ctx.translate(-w/2, -h/2);

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
			speedy: random(4,10),
	}
	particles.push(particle);
}
	

var on = 2;
var dir = 4;

function moveParticles(){

		//for (var i = particles.length-1; i >=0 ; i--) {
			
			p = particles[on];
			
			//if (i == on) {
				//console.log(on);
				if (p.x < p.x2 + space) {
					p.x = (p.x + dir);
				} else {
					p.x2 = p.x;
					on = (on + 1)%(particles.length)
				}
				
				
			//}
		
			p.x2 = tween(p.x2, p.x + random(2), 20);

			ctx.line(0, 0 - p.y, 0 - p.x2, 0);
			ctx.line(0, 0 + p.y, 0 - p.x2, 0);

			ctx.line(0, 0 - p.y, 0 + p.x2, 0);
			ctx.line(0, 0 + p.y, 0 + p.x2, 0);

			
		};

//}



}
rbvj();