ctx.clearRect(0,0,w,h);
var particle_array = [];
var imgData;
var maxParticles = 1000;
ctx.font = "300px helvetica";
ctx.fillStyle="blue";
ctx.textAlign = "center";
ctx.textBaseline = "middle";
var words = ['horse', 'fox', 'hunter', 'disco'];
//brightSpark();
init();
draw();

function init(){}

function draw(){
	ctx.fillStyle= rgba(0,0,0,0.01);
	ctx.fillRect(0, 0, width, height);
	var img = new Image();
	img.src = 'images/dot.png';
	
	if(chance(10)) addParticle(random(w), random(h));
		//c.clearRect(0,0,window.innerWidth,window.innerHeight);
		
		for (var i = particle_array.length - 1; i >= 0; i--) {
			p = particle_array[i];

			if(p.x!=0 && p.y!=0) {	
				ctx.globalCompositeOperation = 'lighten';
				//ctx.globalAlpha = p.alpha;
			 	//c.fillStyle="purple";
				ctx.fillStyle=p.c;
				//c.drawImage(img,p.x, p.y, p.size, p.size);
				ctx.fillEllipse(p.x, p.y, p.size, p.size);

				if (p.alpha<1) p.alpha+=0.0009;
				if (p.size<0.002) { 
					p.x = p.orig_x+random(-4,4); p.y = p.orig_y+random(-4,4); p.size = 3;p.speedx = random(-2,2),
					p.speedy =  random(-2,2)
				}
				// p.speedy = random(-1,1) ; 
				// p.speedx = random(-1,1) ; 
				p.x += p.speedx;
				p.y += p.speedy;
				p.size *= p.reduce;
			}
		};
		
		if(particle_array.size>maxParticles) particle_array.shift();
	}


	function drawLogo(){
		ctx.strokeStyle = "#ffffff";
    	ctx.lineWidth = 2;
    	ctx.save();
    	ctx.translate(width/2, height/2);
    	ctx.rotate(radians(180));
    	ctx.moveTo(-200,-100);
    	ctx.line(-200,-100,-200,100);
		
		ctx.line(200,-100,200,100);

		ctx.line(-200,0,-100,0);

		ctx.line(200,0,100,0);

		ctx.line(-200,-200, 0,200);

    	ctx.line(200,-200, 0,200, 0);

    	ctx.line(-100,0, 0,-150);

	    ctx.line(100,0, 0,-150);

  		ctx.restore();
	}

	function brightSpark(){
		//drawLogo();
		var w = randomInteger(0,3);
		//ctx.fillText(words[w], window.innerWidth/2, window.innerHeight/2);
		draw();
		//c.render();
		//imgData = ctx.getImageData(0, 0, window.innerWidth, window.innerHeight).data;
		//console.log(imgData);
		for (var y = 0; y < window.innerHeight; y+=4) {
			 for (var x = 0; x < window.innerWidth; x+=4) {
				var pt = (y *window.innerWidth + x)*4;
				var fBrightness;
				//addParticle(x,y);
				//fBrightness = (0.3*imgData[pt] + 0.59*imgData[pt+1] + 0.11*imgData[pt+2]);
				//console.log(fBrightness);
				// if(fBrightness > 20) {
				 if(random(60) > 58) {	
			 	//addParticle(x,y);
			 	}
			 }
		}
		ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
	}
function addParticle(_x, _y){
		var particle = {
		orig_x: _x, 
		orig_y: _y,
		x: _x+random(-4,4), 
		y: _y+random(-4,4),
		c: rgb(random(40,255),random(10,255), random(255)),
		//c: rgb(random(0,35),random(0,225), random(25)),
		size: 2,
		// reduce: random(0.8, 0.9999), 
		reduce: random(0.99, 0.99999), 
		alpha: 0,
		speedx: random(-2,2),
		speedy: random(-2,2) 
	};
	particle_array.push(particle);
	if(particle_array.size>maxParticles) particle_array.shift();
}
	