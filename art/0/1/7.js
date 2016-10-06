resize();

var container, 
    renderer, 
    scene, 
    camera, 
    mesh, composer,
    start = Date.now(),
    fov = 30;
    var plane, plane_material;
    init();
    draw();

function init(){

    // grab the container from the DOM
    //container = document.getElementById( "container" );
    container = document.getElementById( 'cover' );
    // create a scene
    scene = new THREE.Scene();

    // create a camera the size of the browser window
    // and place it 100 units away, looking towards the center of the scene
    camera = new THREE.PerspectiveCamera( 
        fov, 
        window.innerWidth / window.innerHeight, 
        1, 
        10000 );
    camera.position.z = 100;
    camera.target = new THREE.Vector3( 0, 0, 0 );

    scene.add( camera );

    material = new THREE.ShaderMaterial( {
    uniforms: { 
    tExplosion: { 
    type: "t", 
    value: THREE.ImageUtils.loadTexture( 'images/explosion.png' )
    },
    time: { // float initialized to 0
    type: "f", 
    value: 0.0 
    }
    },
    vertexShader: document.getElementById( 'vertexShader' ).textContent,
    fragmentShader: document.getElementById( 'fragmentShader' ).textContent
    } );

    
    // create a sphere and assign the material
    mesh = new THREE.Mesh( 
        new THREE.IcosahedronGeometry( 24, 5 ),
        //new THREE.TetrahedronGeometry( 24, 6 ), 
        //new THREE.SphereGeometry( 24, 5 ), 
        material 
    );
    
    mesh.position.set( 0, 0, -240 );
    mesh.scale.set( 6.2, 6.2, 6.2 );
    scene.add( mesh );
    
    texture = THREE.ImageUtils.loadTexture( "images/haah_logo.png" );
    plane_material = new THREE.MeshBasicMaterial( {map : texture, transparent: true, opacity: 0.9} );
    plane = new THREE.Mesh( new THREE.PlaneBufferGeometry( 25, 20, 4, 4 ), plane_material );
    plane.position.set( 0, 0, 0 );
    plane.scale.set( 0.8, 0.8, 0.8 );
    //scene.add( plane );

    // create the renderer and attach it to the DOM
    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    
    // postprocessing
    composer = new THREE.EffectComposer( renderer );
        composer.addPass( new THREE.RenderPass( scene, camera ) );

    // var effect = new THREE.ShaderPass( THREE.DotScreenShader );
    // effect.uniforms[ 'scale' ].value = 2;
    // composer.addPass( effect );

        var effect = new THREE.ShaderPass( THREE.RGBShiftShader );
        effect.uniforms[ 'amount' ].value = 0.155;
        effect.renderToScreen = true;
        composer.addPass( effect );

        //kaleidoPass = new THREE.ShaderPass( THREE.KaleidoShader );
        //kaleidoPass.uniforms[ "sides" ].value = 12;
        //kaleidoPass.uniforms[ "angle" ].value = 0.1*3.1416
        // var effect = new THREE.KaleidoPass( THREE.RGBShiftShader );
        // effect.uniforms[ 'amount' ].value = 0.0015;
        // effect.renderToScreen = true;
        //composer.addPass( kaleidoPass );

    container.appendChild( renderer.domElement );

    draw();

};

function draw() {

    material.uniforms[ 'time' ].value = .00025 * ( Date.now() - start );
    renderer.render( scene, camera );
    //if (Math.random()*100>95) composer.render();
    //camera.rotateX(0.008);
    //plane.rotation.y += 0.01;
    //requestAnimationFrame( render );
    
}

