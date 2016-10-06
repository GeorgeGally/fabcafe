
////// AUDIO

var chords = [];
    chords.push([16.35, 32.70, 65.41, 130.8, 261.6, 523.3, 1047, 2093, 4186]); //c_chord
    chords.push([24.50, 49.00, 98.00, 196.0, 392.0, 784.0, 1568, 3136, 6272]); //g_chord
    chords.push([25.96, 51.91, 103.8, 207.7, 415.3, 830.6, 1661, 3322, 6645]); //a_minor_chord
    chords.push([21.83, 43.65, 87.31, 174.6, 349.2, 698.5, 1397, 2794, 5588]); //f_chord

var maximJs;
    
var maxiAudio = new maximJs.maxiAudio();
maxiAudio.setBufferSize(4096);

//var sample = new maximJs.maxiSample();
//maxiAudio.loadSample("sound/sugarbabylove.mp3",sample);

var fft = new maximJs.maxiFFT();
var fftSize = 1024;
fft.setup(fftSize, 512, 256);

clock = new maximJs.maxiClock();
clock.setTicksPerBeat(4);
clock.setTempo(100);

var myWave = new maximJs.maxiOsc();
var myWave2 = new maximJs.maxiOsc();
var phaser = new maximJs.maxiOsc();
var osc = new maximJs.maxiOsc();
var filter1 =  new maximJs.maxiFilter();
var filter2 =  new maximJs.maxiFilter();

var dyn = new maximJs.maxiDyn();

var lowpass_res = 0.05;
var hipass_res = 0.18;
var active_chord = chords[randomInt(chords.length-1)];
var pitch = active_chord[randomInt(active_chord.length-1)];
var play_head = 0;

maxiAudio.init();
    
maxiAudio.play = function() {
    
    clock.ticker();
                
        if(clock.tick){

            // var ss = Math.round(Math.abs(fft.getMagnitude(116)*100), 2);
            // console.log(ss)

        if (chance(200)) {
            active_chord = chords[randomInt(chords.length-1)];
        }

        if (chance(200)) {
            //sample.trigger();
            play_head = random(1000);
            pitch = Math.floor(active_chord[randomInt(active_chord.length-1)]);
            //console.log(pitch);
    }

    }

    //if(sample.isReady()){

    //var texture = sample.playOnce();

    var s1 = myWave.square(freqs[0]) * 0.15; // a sine wave of 440 multiplied by .125 to reduce volume
    var s2 = myWave2.pulse(freqs[1],0.5) * 0.25;
    var s3 = myWave.triangle(freqs[2]*myWave2.sinewave(0.02)) * 0.25;
    // var s4 = myWave.sinewave(freqs[3]/2)* 0.25;
    //var s5 = myWave.square(target_topLeft[0]) * 0.25;
    // var s6 = myWave.pulse(target_topLeft[1],0.5) * 0.25;
    // var s7 = myWave.triangle(target_bottomRight[0]) * 0.25; 
    // var s8 = myWave.sinewave(target_bottomRight[1]) * 0.25;
    

    // var synths = filter2.hipass(synths, hipass_res);
    // var LFO = ((phaser.sinewave(freqs[4]/10)*0.5+0.5)*100);
    // var s5 = filter2.lores(osc.sawn(freqs[4]), Math.abs(LFO),4);

    // var total_synths = s1 + s2 + s3 + s4 + s5 + s6 + s7 + s8;
    // var total_synths = texture + s1 + s2 ;
    var total_synths = s1 + s2 + s3;
    //var total_synths = s1;
    var synths = filter1.lopass(total_synths, lowpass_res);

   
    

    this.output = synths * master_volume;

    if (fft.process(total_synths)) {
            fft.magsToDB();
    }


       /// uncomment this bit to hear the noise gate in action
    
    // this.output = dyn.gate(this.output * 0.25, 
    //                             0.15,// 0.15 is good. nice fx if you vary this 
    //                             0.5,// doesn't seem to do much 
    //                             0.3, // 0.1 - strong gate 0.3 - weak
    //                             0.99);
    
    ///// END noise gate
    
    /// uncomment this to hear the compressor in action
    // this.output = dyn.compressor(this.output, 
    //                             2,// 2-10 is good 
    //                             0.2, // 0.1 to 0.5
    //                             1, //1 - 200 
    //                             0.5// 0.5? 
    //                             );
    
    // END COMPRESSOR
    
    //this.output = dyn.gate(this.output);
    //this.output *= 0.25;


    //}
};


function mapAudio(_me, _total){ 

  var new_me = Math.floor(map(_me, 0, _total, 0, 512)); 
  //
  var s = fft.getMagnitude(new_me);
  var ss = Math.floor(map(s, 0, 20, 0, 100));
  //console.log(ss)
  return ss;

}