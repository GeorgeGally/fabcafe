	//var words = undefined;
	var particle_array = [];
	var imgData;
	var maxParticles = 1000;
	ctx.font = "380px helvetica";
	ctx.fillStyle="blue";
	ctx.textAlign = "center";
	ctx.textBaseline = "middle";
	var words = ['love','love'];
	brightSpark();

	function draw(){
	ctx.fillStyle= rgba(0,0,0,0.1);
	ctx.fillRect(0, 0, width, height);
	var img = new Image();
	img.src = 'images/dot.png';
		//addParticle(mouseX, mouseY);
		//c.clearRect(0,0,window.innerWidth,window.innerHeight);
		
		for (var i = particle_array.length - 1; i >= 0; i--) {
			p = particle_array[i];
			// c.fillRect(p.x, p.y, p.size, p.size);
			if(p.x!=0 && p.y!=0) {	
			//ctx.globalCompositeOperation = 'lighten';
			ctx.fillStyle=p.c;
			//c.drawImage(img,p.x, p.y, p.size, p.size);
			ctx.fillEllipse(p.x, p.y, p.size, p.size);


			if (p.alpha<1) p.alpha+=0.0009;
			if (p.size<0.005) { 
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



function brightSpark(){
		//drawLogo();
		var w = randomInt(words.length-1);
		//alert(w)
		ctx.fillStyle = "#ffffff";
		ctx.fillText(words[w], window.innerWidth/2, window.innerHeight/2);
		//draw();
		//c.render();
		imgData = ctx.getImageData(0, 0, window.innerWidth, window.innerHeight).data;
		//console.log(imgData);
		for (var y = 0; y < window.innerHeight; y+=4) {
			 for (var x = 0; x < window.innerWidth; x+=4) {
				var pt = (y *window.innerWidth + x)*4;
				var fBrightness;
				//addParticle(x,y);
				fBrightness = (0.3*imgData[pt] + 0.59*imgData[pt+1] + 0.11*imgData[pt+2]);
				//console.log(fBrightness);
				 if(fBrightness > 20) {
				 //if(random(40) > 38) {	
			 	addParticle(x,y);
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
		size: 4,
		// reduce: random(0.8, 0.9999), 
		reduce: random(0.9, 0.99), 
		alpha: 0,
		speedx: random(-2,2),
		speedy: random(-2,2) 
	};
	particle_array.push(particle);
}
	// requestAnimationFrame(drawme);