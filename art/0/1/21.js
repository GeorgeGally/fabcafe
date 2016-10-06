
	var particle_array = [];
	var imgData;
	var frameCount = 20;
	var frame = 16;
	var counter = 0;
	var maxParticles = 1000;
	var circsize = 0;
	var done = false;
	var counter2 = 0;

	var imgs = [];
	for (var i = 0; i < frameCount; i++) {
		imgs[i] =  new Image();
		imgs[i].src = 'images/clouds2/'+(i)+'.jpg';
	};
	

	function draw(){
		//console.log(frame);
		ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
		ctx.drawImage(imgs[frame],0, 0, window.innerWidth*1.6, window.innerHeight);
		ctx.shade(cover_colours[cover_count]);
		if (done == false) {
			
			ctx.fillStyle = rgba(0,0,200,0.8);
		} else {
			ctx.fillStyle = rgba(200,0,200,0.5);
		} 
		if (counter%7 == 0) {
			frame++;
		}
		
		ctx.HfillEllipse( width/2, height/2, circsize, circsize );
		if (frame >= frameCount) frame = 0;
		counter++;
		counter2++;
		if (counter2>1000) circsize+=0.9;
		if (circsize>width-100) 
			{ 
				circsize = 0;
				done = true;
			}
	
	}


