
    // variables used in init()
        var scene, camera, renderer, clock;
        var container = document.getElementById( 'cover' );
        // Used in initParticles()
    var emitter, particleGroup;

    // Setup the scene
        function init() {
            scene = new THREE.Scene();
            camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 10000);
            camera.position.z = 50;
            camera.lookAt( scene.position );

            renderer = new THREE.WebGLRenderer();
            renderer.setSize( window.innerWidth, window.innerHeight );
            renderer.setClearColor(0x000000);

           
            clock = new THREE.Clock();

          

            container.appendChild( renderer.domElement );
            
        }

        // Create particle group and emitter
        function initParticles() {
          particleGroup = new SPE.Group({
            texture: THREE.ImageUtils.loadTexture('./images/star.png'),
            maxAge: 2,
                blending: THREE.AdditiveBlending
          });

          emitter = new SPE.Emitter({
            positionSpread: new THREE.Vector3(100, 100, 100),

                acceleration: new THREE.Vector3(0, 0, 1),

            velocity: new THREE.Vector3(0, 0, 1),

            colorStart: new THREE.Color(randomColor({ hue: 'orange', luminosity: 'dark', format: 'rgb' })),
            colorEnd: new THREE.Color(randomColor({ hue: 'purple',luminosity: 'dark', format: 'rgb' })),
            sizeStart: 1,
            sizeEnd: 1.5,
                opacityStart: 0,
                opacityMiddle: 1,
                opacityEnd: 0,

            particleCount: 10000
          });

          particleGroup.addEmitter( emitter );
          scene.add( particleGroup.mesh );

        }



        function draw() {
        

            // Using a fixed time-step here to avoid pauses
      
             particleGroup.tick( 0.016 );
            renderer.render( scene, camera );
            scene.rotation.x += 0.001;
            
        }




        window.addEventListener( 'resize', function() {
          var w = window.innerWidth,
            h = window.innerHeight;

          camera.aspect = w / h;
          camera.updateProjectionMatrix();

          renderer.setSize( w, h );
        }, false );

        init();
        initParticles();

       // setTimeout(animate, 0);

