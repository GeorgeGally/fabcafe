

//GET CHANGES FROM BACKGROUND
var sensitivity = 20;
var samplesize = 10;
var old = [];
var motion_array = [];

var hidden_ctx = createCanvas("canvas2");
var canvas2 = document.getElementById("canvas2");
canvas2.style.position = 'absolute';
canvas2.style.top = '0px';
canvas2.style.right = '-2000px';

function darknessDetection(){
	
	
	motion_array = [];
	hidden_ctx.drawImage(video,0,0,w,h);
	sample = hidden_ctx.getImageData(0,0,w,h);
	var buffer = new Uint32Array(sample.data.buffer);

	for (var y = 0; y < h; y+=samplesize) {
		
		for (var x = 0; x < w; x+=samplesize) {
	
			var pos = x + y * w;
			var r = buffer[pos] >> 0 & 0xff;
			var g = buffer[pos] >> 8 & 0xff;
			var b = buffer[pos] >> 16 & 0xff;
  			if (brightness(r, g, b) < 50)
  			//if (Math.abs(r-old[pos]) > sensitivity) {
  				var c = new Vector(r,g,b);
  				motion_array.push(new Vector(w-x,y,c));
  			}

	}
}





