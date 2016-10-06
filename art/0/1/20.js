
	var particle_array = [];
	var imgData;
	var frameCount = 51;
	var frame = 16;
	var counter = 0;
	var maxParticles = 1000;
	ctx.font = "300px helvetica";
	ctx.fillStyle="blue";
	ctx.textAlign = "center";
	ctx.textBaseline = "middle";
	var words = ['horse', 'fox', 'hunter', 'disco'];

	var imgs = [];
	for (var i = 0; i < frameCount; i++) {
		//for (var i = 0; i < 2; i++) {
		imgs[i] =  new Image();
		// console.log('images/tears/tears2_'+(i+1)+'.jpg');
		// imgs[i].src = 'images/tears/tears2_'+(i+1)+'.jpg';
		//imgs[i].src = 'images/blink/blink'+(i+1)+'.png';
		imgs[i].src = 'images/clouds/'+(i+1)+'.jpg';
	};
	

	function draw(){
		//console.log(frame);
		ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
		ctx.drawImage(imgs[frame],0, 0, window.innerWidth*1.6, window.innerHeight);
		ctx.fillStyle = rgba(0,0,220,0.6);

		// ctx.HfillEllipse( width/2, height/2, 220, 220 );
		// ctx.save()
		// ctx.translate(width/2,height/2);
		// ctx.rotate(0.8);
		// ctx.fillRect( -100, -100, 200, 200 );
		// ctx.restore();
		//ctx.globalCompositeOperation = "multiply";
		if (counter%7 == 0) {
			frame++;
		}
	
	if (frame >= frameCount) frame = 0;
	counter++;
	ctx.shade(cover_colours[cover_count]);
	
	}


