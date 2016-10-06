
			var camera, scene, renderer;
			var rgbParams, rgbPass;
			var kaleidoParams, kaleidoPass;
			var composer;
			var cubeHolder;
			var cubes = [];
			var materials = [];
			var container = document.getElementById( 'cover' );
			init();
			draw();

			function init() {

				camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 20, 3000);
				camera.position.z = 1200;

				scene = new THREE.Scene();

				//init object to hold cubes and rotate
				cubeHolder = new THREE.Object3D();
				scene.add(cubeHolder);

				//add light
				var light = new THREE.PointLight(0xFFFFFF, 1);
				light.position = new THREE.Vector3(100, 100, 100);
				scene.add(light);

				//use lambert material to get greyscale shadows
				

				//create cubes
				var geometry = new THREE.CubeGeometry(10, 100, 100);

				var spread = 900;
				for(var j = 0; j < 150; j++) {
					materials[j] = new THREE.MeshBasicMaterial({
						shading: 'THREE.FlatShading', 
						transparent: true, opacity: 0.4});
					var c = new THREE.Color(randomColor({ 
						//hue: 'purple',
						luminosity: 'bright', format: 'rgb' }));
					materials[j].color = c;
					var cube = new THREE.Mesh(geometry, materials[j]);
					//randomize size, posn + rotation
					cube.scale.x = cube.scale.y = cube.scale.z = Math.random() * 3 + .05;
					cubeHolder.add(cube);
					cube.position.x = Math.random() * spread - spread / 2;
					cube.position.y = Math.random() * spread - spread / 2;
					cube.position.z = Math.random() * spread - spread / 2;
					cube.rotation.x = Math.random() * 2 * Math.PI - Math.PI;
					cube.rotation.y = Math.random() * 2 * Math.PI - Math.PI;
					cube.rotation.z = Math.random() * 2 * Math.PI - Math.PI;
					cubes[j] = cube;
				}

				//init renderer
				renderer = new THREE.WebGLRenderer({
				});
				renderer.setSize( window.innerWidth, window.innerHeight );

				

				container.appendChild( renderer.domElement );

				//POST PROCESSING
				//Create Shader Passes
				//render pass renders scene into effects composer
				var renderPass = new THREE.RenderPass( scene, camera );
				//rgbPass = new THREE.ShaderPass( THREE.RGBShiftShader );
				kaleidoPass = new THREE.ShaderPass( THREE.KaleidoShader );
				kaleidoPass.uniforms[ "sides" ].value = 12;
				kaleidoPass.uniforms[ "angle" ].value = 0.1*3.1416
				//Add Shader Passes to Composer
				//order is important
				composer = new THREE.EffectComposer( renderer);
				composer.addPass( renderPass );
				composer.addPass( kaleidoPass );
				// composer.addPass( rgbPass );

				//set last pass in composer chain to renderToScreen
				kaleidoPass.renderToScreen = true;

				//Init DAT GUI control panel
				// rgbParams = {
				// 	amount: 0.005,
				// 	angle: 0.0,
				// }

				// kaleidoParams = {
				// 	sides: 12,
				// 	angle: 0.1
				// }

				// var gui = new dat.GUI();
				
				// var f1 = gui.addFolder('Kaleidoscope');
				// f1.add(kaleidoParams, 'sides', 0, 24).step(1).onChange(onParamsChange);
				// f1.add(kaleidoParams, 'angle', 0.0,2.0).step(0.1).onChange(onParamsChange);

				// var f2 = gui.addFolder('RGB Shift');
				// f2.add(rgbParams, 'amount', 0.0, 0.1).onChange(onParamsChange);
				// f2.add(rgbParams, 'angle', 0.0, 2.0).onChange(onParamsChange);

				//f1.open();
				//f2.open();

				//onParamsChange();

			}

			// function onParamsChange() {
			// 	//copy gui params into shader uniforms
			// 	//rgbPass.uniforms[ "angle" ].value = rgbParams.angle*3.1416;
			// 	//rgbPass.uniforms[ "amount" ].value = rgbParams.amount;
			// 	kaleidoPass.uniforms[ "sides" ].value = kaleidoParams.sides;
			// 	kaleidoPass.uniforms[ "angle" ].value = kaleidoParams.angle*3.1416;
			// }

			function draw() {
				//requestAnimationFrame( animate );
				if(v > 60) { kaleidoPass.uniforms[ "sides" ].value = randomInt(2,20) }
				cubeHolder.rotation.y -= 0.002;
				cubeHolder.rotation.x += 0.005;
				composer.render( 0.1);
				
			}

