var ww = 0;
var ww2 = 0;
var hh = 0;
var counterw = counterh= 0;


function draw(){
	ctx.clearRect(0,0,w,h);
	ctx.globalCompositeOperation = 'lighter';
	ww2 = Math.sin(counterw)*w*2;
	ctx.fillStyle= rgba(0,0,200,0.8);
	ctx.HfillEllipse(ww2,hh, 150+Math.abs(Math.sin(counterw*0.134))*580, 150+Math.abs(Math.sin(counterw*0.134))*580);
	ww = w/2+Math.sin(counterw)*w/2;
	ww3 = w/2+Math.sin(counterw/3)*w/2;
	//if (ww = w) counterh += 0.01;
	counterh += 0.0001;
	hh = h/2+Math.sin(counterh)*h/2;
	ctx.fillStyle= rgba(0,200,0,0.8);
	
	ctx.HfillEllipse(ww,hh, 150+Math.abs(Math.cos(counterw*1.134))*380, 150+Math.abs(Math.cos(counterw*1.134))*380);
	ctx.fillStyle= rgba(200,0,0,0.8);
	ctx.HfillEllipse(w-ww3,hh, 150+Math.abs(Math.sin(counterw*1.029))*800, 150+Math.abs(Math.sin(counterw*1.029))*800);
	
	counterw += 0.018;
}