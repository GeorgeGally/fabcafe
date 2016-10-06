
radius = Math.min( width, height ) * 0.4,

quality = 90,

					// Layer instances
					layers = [],

					// Width/height of layers
					layerSize = radius * 0.35,

					// Layers that overlap to create the infinity illusion
					layerOverlap = Math.round( quality * 0.1 );

				function initialize() {

					for( var i = 0; i < quality; i++ ) {
						layers.push({
							x: width/2 + Math.sin( i / quality * 2 * Math.PI ) * ( radius - layerSize ),
							y: height/2 + Math.cos( i / quality * 2 * Math.PI ) * ( radius - layerSize ),
							r: ( i / quality ) * Math.PI
						});
					}

					resize();
					//update();

				}



				function draw() {

					//requestAnimationFrame( update );

					step();
					clear();
					paint();

				}

				// Takes a step in the simulation
				function step () {

					for( var i = 0, len = layers.length; i < len; i++ ) {

						layers[i].r += 0.01;

					}

				}

				// Clears the painting
				function clear() {
					
					ctx.clearRect( 0, 0, canvas.width, canvas.height );

				}

				// Paints the current state
				function paint() {

					// Number of layers in total
					var layersLength = layers.length;

					// Draw the overlap layers
					for( var i = layersLength - layerOverlap, len = layersLength; i < len; i++ ) {

						ctx.save();
						ctx.globalCompositeOperation = 'destination-over';
						paintLayer( layers[i], 0 );
						ctx.restore();

					}

					// Cut out the overflow layers using the first layer as a mask
					ctx.save();
					ctx.globalCompositeOperation = 'destination-in';
					paintLayer( layers[0], 0, true );
					ctx.restore();

					// // Draw the normal layers underneath the overlap
					for( var i = 0, len = layersLength; i < len; i++ ) {

						ctx.save();
						ctx.globalCompositeOperation = 'destination-over';
						paintLayer( layers[i], i );
						ctx.restore();

					}

				}

				// Pains one layer
				function paintLayer( layer, i, mask ) {
					size = layerSize + ( mask ? 10 : 0 );
					size = 15 + tween(size,findMapping(Math.abs(mic.getSprectrum(i*3)),100),2);
					size2 = size / 2;
					
					ctx.translate( layer.x, layer.y );
					ctx.rotate( layer.r );

					// No stroke if this is a mask
					if( !mask ) {
						ctx.strokeStyle = '#009900';
						ctx.lineWidth = 3;
						ctx.strokeRect( -size2, -size2, size, size );
					}

					 ctx.fillStyle = '#001100';
					//ctx.fillStyle = rgb(10+i,0,0);
					ctx.fillRect( -size2, -size2, size, size );

				}



				initialize();

	