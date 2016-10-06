	ctx.clearRect(0,0,w,h);
	var particle_array = [];
	var imgData;
	var maxParticles = 1000;

	ctx.font = "300px helvetica";
	ctx.fillStyle="blue";
	ctx.textAlign = "center";
	ctx.textBaseline = "middle";
	var words = ['horse', 'fox', 'hunter', 'disco'];
	brightSpark();

	function draw(){

	var img = new Image();
	img.src = 'images/dot.png';
		//addParticle(mouseX, mouseY);
		
		
		for (var i = particle_array.length - 1; i >= 0; i--) {
			p = particle_array[i];
			// c.fillRect(p.x, p.y, p.size, p.size);
			if(p.x!=0 && p.y!=0) {	
			ctx.globalCompositeOperation = 'lighten';
			ctx.globalAlpha = p.alpha;
			 //c.fillStyle="purple";
			ctx.fillStyle=p.c;
			//c.drawImage(img,p.x, p.y, p.size, p.size);
			ctx.fillEllipse(p.x, p.y, p.size, p.size);
			//p.speedx=  random(-2,2);
			//p.speedy=  random(-2,2); 
			if (p.alpha<1) p.alpha+=0.0009;
			if (p.size<0.005) { p.x = p.orig_x+random(-4,4); p.y = p.orig_y+random(-4,4); p.size = 3;p.speedx = random(-2,2),
		p.speedy =  random(-2,2)}
			p.x += p.speedx;
			p.y += p.speedy;
			p.size *= p.reduce;
		}
		};
		
		if(particle_array.size>maxParticles) particle_array.shift();
	}


	function drawLogo(){
		ctx.strokeStyle = "#ffffff";
    	ctx.lineWidth = 1;
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
		drawLogo();
		var w = randomInteger(0,3);
		//ctx.fillText(words[w], window.innerWidth/2, window.innerHeight/2);
		draw();
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
			 	//console.log(imgData[pt]);
			 	//console.log(fBrightness);
			 	addParticle(x,y);
			 	}
			 }
		}
		//ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
	}
function addParticle(_x, _y){
		var particle = {
		orig_x: _x, 
		orig_y: _y,
		x: _x+random(-4,4), 
		y: _y+random(-4,4),
		c: randomColor(),
		size: 3,
		reduce: random(0.8, 0.9999), 
		alpha: 0,
		speedx: random(-1,1),
		speedy: random(-1,1) 
	};
	particle_array.push(particle);
}

