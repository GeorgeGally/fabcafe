
var scene, camera, renderer;  
var cameraAndLight;
var counter = 0;
var geometry; 
var material;   
var colorType = 1; // The type of colors used on the sphere, controlled by a popup menu:
                   //    0 = No colors: color of every face is white (Three.NoColors)
                   //    1 = One color per face:  A single color per face, stored in geometry  (Three.FaceColors)
                   //    2 = Three colors per face:  Three colors per face, stored in geometry (Three.VertexColors)
                   //    3 = One color per vertex:  Three colors per face, but color copied from vertexColor array

var faceColorVelocities;   // Array of speeds, one for each face, at which the face
                           // the face colors change.  Used for "One color per face".
var faceVertexColorVelocities;  // A 2D array.  Each element is an array of three speeds,
                                // used for "Three colors per face".
var vertexColors;  // An array of one color for each vertex, for use for "One color per vertex"
var vertexColorVelocities; // Array of speeds at which hues of vetex colors changed,
                           // used for "One color per vertex".
var saveFaceVertexColors; // save the arrays of vertex color from the geometry while doing One color per vertex

var vertexAnimData = [];  // Array of objects, one for each vertex that
                           // is currently being animated.  Items are added
                           // to this array in function updateForFrame()
                        
var wireSphere;  // The wireframe sphere, which can be turned on and off.

var colorAnimation = true;  // For saving state of colorAnimationCheckbox when it is disabled
var container;
init();


function doKey(evt) {
    var moved = true;
  switch (evt.keyCode) {
      case 37: cameraAndLight.rotateY(0.05); break;       // left
      case 39: cameraAndLight.rotateY(-0.05); break;      // right
      case 38: cameraAndLight.rotateX(0.05); break;       // up
      case 40: cameraAndLight.rotateX(-0.05); break;      // down
      case 13: cameraAndLight.rotation.set(0,0,0); break; // return
      case 36: cameraAndLight.rotation.set(0,0,0); break; // home
      default: moved = false;
  }
  if (moved) {
      evt.preventDefault();
        if (!animating) {
            render();
        }
    }
}



function draw() {

        clock.frameNumber++;
      updateForFrame();



    renderer.render(scene, camera);
}



function updateForFrame() {
    counter+=0.004;
    var i,j,c;
    cameraAndLight.rotateY(Math.cos(counter/100)*0.002);
    cameraAndLight.rotateX(Math.sin(counter/100)*0.02);
        for (i = 0; i < geometry.vertices.length; i++) {
            var f = 1;
            if (listening == true) {
                f = findMapping(mic.getSprectrum(i), 10);
            }
            f = clamp(f, 0,10);
            var ad = {}; // The data for an animating vertex.
            ad.vertexNum = i;
            var used = false;
                for (j = 0; j < vertexAnimData.length; j++) {
                    if (ad.vertexNum == vertexAnimData.vertexNum) {
                        used = true;
                        break;
                    }
                }
            if (!used) {
                if (f>1) {
                    ad.length = 8;   // This is the initial length of the vector of vertex coords.
                    ad.direction = 0;  // 0 says vertex is moving away from the center; 1 says it's moving back.
                    ad.maxLength = f;  // The length at which it will start moving back.
                    ad.velocity = 0.2 + 0.39*Math.random();  // Amount added to length in each frame.
                    vertexAnimData.push(ad);  // Add item to the array of vertex animation data.
                }
        }
        }
        // }

        for (i = vertexAnimData.length-1; i >= 0; i--) {
                // Update the i-th animating vertex.
            var ad = vertexAnimData[i];  // Animation data for this vertex.
            var vertex = geometry.vertices[ ad.vertexNum ];
            if (ad.direction == 0) { // increase length; reverse direction if maxLength is reached
                ad.length += ad.velocity;
                if (ad.length > ad.maxLength)
                   ad.direction = 1;
            }
            else {  // decrease length; if length is less than 10, stop animating this vertex
                ad.length -= ad.velocity;
                if (ad.length < 10) {
                    ad.length = 10;
                    vertexAnimData.splice(i,1); // removes item i from the array
                }
            }
            vertex.setLength( ad.length );
        }
        geometry.verticesNeedUpdate = true;  // Needed to tell the renderer to use the new vertex coordinates!! 
    // }
}



/**
 *  This is called when the user clicks "Reset Vertices".  It resets the length of all vertices
 *  are being animated to 10 and removes all vertices from the list of animating vertices.
 *  (If a vertex animation is in progress, new vertices will quickly be added to the array.)
 */
function resetVertices() {
    for (var i = 0; i < vertexAnimData.length; i++) {
        geometry.vertices[ vertexAnimData[i].vertexNum ].setLength(10);
        geometry.verticesNeedUpdate = true;
    }
    vertexAnimData = [];
    // if (!animating) {
    //    render();
    // }
}



/**
 *  Called when the user changes the color type.
 */
function doColorTypeSelect() {
    var i;
    var animCheck = document.getElementById("colorAnimationCheckbox");
    if (colorType == 0) {
        // animCheck.checked = colorAnimation;  // restore animationCheckbox state
        animCheck.disabled = false;
    }
    if (colorType == 3) {  // restore saved vertex colors to geometry
        for (i = 0; i < geometry.faces.length; i++) {
            geometry.faces[i].vertexColors = saveFaceVertexColors[i];
        }
        saveFaceVertexColors = null;
    }
    colorType = Number( document.getElementById("colorTypeSelect").value );  
    if (colorType == 0) {
        //colorAnimation = animCheck.checked;  // save current animationCheckbox state
        animCheck.disabled = true;
        //animCheck.checked = false;
    }
    if (colorType == 3) {  // save vertexColors from geometry, and substitue per-vertex colors
        saveFaceVertexColors = [];
        for (i = 0; i < geometry.faces.length; i++) {
           saveFaceVertexColors.push(geometry.faces[i].vertexColors);
           geometry.faces[i].vertexColors = [ new THREE.Color(), new THREE.Color(), new THREE.Color() ];
        }
        for (i = 0; i < geometry.faces.length; i++) {
            var f = geometry.faces[i];
            f.vertexColors[0] = vertexColors[ f.a ];  // color for first vertex (f.a) of this face 
            f.vertexColors[1] = vertexColors[ f.b ];  // color for second vertex (f.b) of this face 
            f.vertexColors[2] = vertexColors[ f.c ];  // color for third vertex (f.c) of this face 
        }
    }
    if (colorType == 0)
        material.vertexColors = THREE.NoColors;
    else if (colorType == 1)
        material.vertexColors = THREE.FaceColors;
    else
        material.vertexColors = THREE.VertexColors; 
    material.needsUpdate = true;
    geometry.colorsNeedUpdate = true;
    //doAnimationCheckbox();  // In case setting of colorAnimationCheckbox has changed
    // if (!animating) {
    //     render();
    // }
    //document.getElementById("resetVertices").focus();  // so key presses stop going to the select element!
}

//--------------------------- animation support -----------------------------------

var clock;  // Keeps track of elapsed time of animation.

var animating = true;




function init() {
    
        container = document.getElementById( 'cover' );
        scene = new THREE.Scene();
        renderer = new THREE.WebGLRenderer(); 
        camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 0.1, 100 );

        var light = new THREE.DirectionalLight();
        light.position.set(0,0,1);
        camera.position.set(0,0,15)
        cameraAndLight = new THREE.Object3D();
        cameraAndLight.add(camera);
        cameraAndLight.add(light);
        scene.add(cameraAndLight);
        
    /* Create the icosphere geomtry, with random face colors and color velocities */
    geometry = new THREE.IcosahedronGeometry(10,1);
    faceColorVelocities = [];
    for (i = 0; i < geometry.faces.length; i++) {
        var c = new THREE.Color(randomColor({ 
            hue: 'pink', 
            luminosity: 'dark', format: 'rgb' }));
        geometry.faces[i].color = c;  // used for per face color
        //geometry.faces[i].color.setRGB( 0.6,0,0.6 );  // used for per face color
        // geometry.faces[i].color.setRGB( cc,cc,cc );  // used for per face color
        // geometry.faces[i].color.setHSL( Math.random(), 0.7, 0.4 );  // used for per face color
        faceColorVelocities.push(0.001 + 0.001*Math.random()); 
    }
    
    /* Create the individual colors and velocities for each vertex of each face */
    faceVertexColorVelocities = [];
    for (i = 0; i < geometry.faces.length; i++) {
        var v = [];  // color velocities for vertices of this face
        geometry.faces[i].vertexColors = [];  // array of colors used for per-vertex coloring
        for (var j = 0; j < 3; j++) {
            var c = new THREE.Color();
            // c.setHSL( Math.random(), 0.7, 0.5 );
            var cc = Math.random()*2;
            c.setRGB( cc,cc,cc );
            geometry.faces[i].vertexColors.push(c);
            v.push(0.001 + 0.002*Math.random());
        }
        faceVertexColorVelocities.push(v);
    }
    
    /* Create an array of one vertex per color, to be used for "One color per vertex" color mode */
     /* Create an array of one vertex per color, to be used for "One color per vertex" color mode */
    vertexColors = [];
    vertexColorVelocities = [];
    for (i = 0; i < geometry.vertices.length; i++) {
        var c = new THREE.Color();
        c.setHSL( Math.random(), 0.7, 0.4 );
        vertexColors.push(c);
        vertexColorVelocities.push(0.001 + 0.002*Math.random());
    }

    material = new THREE.MeshBasicMaterial({
        polygonOffset: true,
        transparent: true, opacity: 0.5,
        //side:THREE.BackSide,
        doubleSided: true,
        depthWrite: true, depthTest: true,
        polygonOffsetUnits: 1,
        polygonOffsetFactor: 1,
        color: "white", // will only be used when vertexColors is set to THREE.NoColors
        vertexColors: THREE.FaceColors  // face colors come from geometry, one color per face
    });
    material.shading = THREE.FlatShading;


    var sphere = new THREE.Mesh( geometry, material );
    sphere.frustumCulled = false;
    sphere.flipSided = false
    sphere.doubleSided = true

    wireSphere = new THREE.Mesh(
         geometry,
         new THREE.MeshBasicMaterial({ color: 0, wireframe: true })
    );
    try {
    scene.add(sphere);
    //sphere.add(wireSphere);
    container.appendChild( renderer.domElement );
    //console.log("init");
        //document.addEventListener("keydown", doKey, false);
        
     }
     catch (e) {
        //document.getElementById("message").innerHTML = "Sorry, an error occurred: " + e;
        alert("e: "+ e);
     }
     window.addEventListener( 'resize', onWindowResize, false );
     onWindowResize();
      if (!clock) {
      clock = new THREE.Clock(false);
      clock.frameNumber = 0;
      clock.getFrameNumber = function() { return this.frameNumber }
     }
     clock.start();

     draw();
}

function onWindowResize() {
                
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize( window.innerWidth, window.innerHeight );
            }

        function map(value, min1, max1, min2, max2, clampResult) { 
            var returnvalue = ((value-min1) / (max1 - min1) * (max2-min2)) + min2; 
            if(clampResult) return clamp(returnvalue, min2, max2); 
            else return returnvalue; 
        };

        function clamp(value, min, max) { 
            if(max<min) { 
                var temp = min; 
                min = max; 
                max = temp; 
                
            }
            return Math.max(min, Math.min(value, max)); 
        };

