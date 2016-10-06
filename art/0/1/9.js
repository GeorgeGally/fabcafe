resize();

var container;
var camera, scene, renderer, particles, geometry, material, i, h, color, sprite, size;
var mouseX = 0, mouseY = 0;
var materials = [];
var particle_count = 50;

var windowHalfX = w / 2;
var windowHalfY = h / 2;

init();
draw();

function init() {
	container = document.getElementById( 'cover' );
	camera = new THREE.PerspectiveCamera( 55, w / h, 2, 2000 );
	camera.position.z = 1000;

	scene = new THREE.Scene();
	scene.fog = new THREE.FogExp2( 0x000000, 0.001 );

	geometry = new THREE.Geometry();
	sprite = THREE.ImageUtils.loadTexture( "images/disc.png" );

				for ( i = 0; i < particle_count; i ++ ) {

					var vertex = new THREE.Vector3();
					vertex.x = 2 * Math.random() - 1;
					vertex.y = 2 * Math.random() - 1;
					vertex.z = 2 * Math.random() - 1;
					var d = 1 / Math.sqrt(Math.pow(vertex.x, 2) + Math.pow(vertex.y, 2) + Math.pow(vertex.z, 2));
					vertex.x *= d;
					vertex.y *= d;
					vertex.z *= d;
					vertex.x *= 400;
					vertex.y *= 400;
					vertex.z *= 400;
					geometry.vertices.push( vertex );

				}

				for ( i = 0; i < particle_count; i ++ ) {

					//color = parameters[i][0];
					size  = 50 * Math.random();
					materials[i] = new THREE.PointCloudMaterial( { 
						size: 20 * Math.random(), sizeAttenuation: false, 
						map: sprite, alphaTest: 0.5, transparent: true } );
					materials[i].color.setHSL( 1.0, 0.3, 0.7 );
					//materials[i] = new THREE.PointCloudMaterial( { size: size } );
					//particles = new THREE.PointCloud( sphereGeometry, sphereMaterial );
					particles = new THREE.PointCloud( geometry, materials[i] );

					particles.rotation.x = Math.random() * 6;
					particles.rotation.y = Math.random() * 6;
					particles.rotation.z = Math.random() * 6;
					//var mesh = groupHolder.children[j];
					scene.add( particles );

				}

				// material = new THREE.PointCloudMaterial( { size: 50 * Math.random(), sizeAttenuation: false, map: sprite, alphaTest: 0.5, transparent: true } );
				// material.color.setHSL( 1.0, 0.3, 0.7 );

				// particles = new THREE.PointCloud( geometry, material );
				// scene.add( particles );

				//

				renderer = new THREE.WebGLRenderer();
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				container.appendChild( renderer.domElement );



				// document.addEventListener( 'mousemove', onDocumentMouseMove, false );
				// document.addEventListener( 'touchstart', onDocumentTouchStart, false );
				// document.addEventListener( 'touchmove', onDocumentTouchMove, false );

				//
				onWindowResize();
				window.addEventListener( 'resize', onWindowResize, false );

			}

			function onWindowResize() {

				windowHalfX = w / 2;
				windowHalfY = h / 2;

				camera.aspect = w / h;
				camera.updateProjectionMatrix();

				renderer.setSize( w, h );

			}

			// function onDocumentMouseMove( event ) {

			// 	mouseX = event.clientX - windowHalfX;
			// 	mouseY = event.clientY - windowHalfY;

			// }

			// function onDocumentTouchStart( event ) {

			// 	if ( event.touches.length == 1 ) {

			// 		event.preventDefault();

			// 		mouseX = event.touches[ 0 ].pageX - windowHalfX;
			// 		mouseY = event.touches[ 0 ].pageY - windowHalfY;

			// 	}
			// }

			// function onDocumentTouchMove( event ) {

			// 	if ( event.touches.length == 1 ) {

			// 		event.preventDefault();

			// 		mouseX = event.touches[ 0 ].pageX - windowHalfX;
			// 		mouseY = event.touches[ 0 ].pageY - windowHalfY;

			// 	}

			// }

	

			function draw() {

				var time = Date.now() * 0.00005;

				camera.position.x += ( mouseX - camera.position.x ) * 0.05;
				//camera.position.y += ( - mouseY - camera.position.y ) * 0.05;
				//camera.position.y += 2;
				camera.lookAt( scene.position );

				h = ( 360 * ( 1.0 + time ) % 360 ) / 360;
				for (var i = 0; i < particle_count; i++) {
					// materials[i].color.setHSL( h, 0.5, 0.5 );
					c = new THREE.Color(randomColor({ 
						//hue: 'orange', 
						luminosity: 'bright', format: 'rgb' }))
					materials[i].color= c ;
				};
				
				scene.scale.set(1+v/100,1+v/100,1+v/100);
				scene.rotation.x += radians(0.3); 
				renderer.render( scene, camera );

			}