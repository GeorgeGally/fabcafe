rbvj = function(){

  console.log("======== denial ");

  var counter = 0;
  var flicker2_counter = 0;
   var flicker3_counter = 0;
  var w = 0;
  var camera, scene, renderer;
  numTriangles = 8;
  var period = 200; var amplitude = numTriangles/2;
  
  var c =0; var d =0; var dir = -1;
      var group;
      var sphere;
      var targetRotation = 0;
      var targetRotationOnMouseDown = 0;

      var targetRotationY = 0;
      var targetRotationOnMouseDownY = 0;

      var mouseX = 0;
      var mouseXOnMouseDown = 0;

      var mouseY = 0;
      var mouseYOnMouseDown = 0;

      var windowHalfX = window.innerWidth / 2;
      var windowHalfY = window.innerHeight / 2;

      var triangles = [];
      init();
     

      function init() {

container = document.getElementById( 'cover' );

renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild( renderer.domElement );
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 800);
    camera.position.set(0, 0, 100);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    scene = new THREE.Scene();

//addSphere()

var s = 1;
for (var i = 0; i <= numTriangles; i++) {
  triangles[i] = addTriangle(25-i*10);
  scene.add(triangles[i]);
  triangles[i].scale.set(s,s,s); 
  s-=0.03;
};
  //scene.fog = new THREE.FogExp2( 0xffffff, 0.0055 );
  renderer.render(scene, camera);
  window.addEventListener( 'resize', onWindowResize, false );

}

function addTriangle(z){
   var material = new THREE.LineBasicMaterial({
        color: 0xffffff,linewidth: 8
 });
  

   var triangleGeometry = new THREE.Geometry(); 
    triangleGeometry.vertices.push(new THREE.Vector3( 0.0,  20.0, 0.0)); 
    triangleGeometry.vertices.push(new THREE.Vector3(-20.0, -20.0, 0.0)); 
    triangleGeometry.vertices.push(new THREE.Vector3( 20.0, -20.0, 0.0));
    triangleGeometry.vertices.push(new THREE.Vector3( 0.0,  20.0, 0.0)); 
    triangleGeometry.faces.push(new THREE.Face3(0, 1, 2)); 
    
    var triangleMesh = new THREE.Line(triangleGeometry, material); 
    triangleMesh.position.set(0, 0.0, z); 
    triangleMesh.material.transparent = true;
    return triangleMesh;
}

    function onWindowResize() {

        windowHalfX = window.innerWidth / 2;
        windowHalfY = window.innerHeight / 2;

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize( window.innerWidth, window.innerHeight );

      }


function addSphere(){

  var radius = 6,
    segments = 32,
    rings = 32;

  var sphereMaterial = new THREE.MeshBasicMaterial({ color: 0x110000 });
  sphere = new THREE.Mesh( new THREE.SphereGeometry( radius, segments,rings), sphereMaterial);
  sphere.geometry.dynamic = true;
  sphere.material.dynamic = true;
  scene.add(sphere);
      
}
  

draw = function() {
  
  counter+=0.00001;
  scene.rotation.y += ( targetRotation - scene.rotation.y ) * 0.0005;
  scene.rotation.x = Math.sin(counter)*90;
  freqs[0] = scene.rotation.x;
  if (chance(1000) || flicker2_counter >= frameCount){           

    if (flicker2_counter < frameCount ) {
        console.log("flicker2");
        freqs[0] = randomInt(5, 45);
        freqs[1] = 2;
        flicker2_counter = frameCount + 300;
    }

    flicker2();

  } else if (chance(1000) || flicker3_counter >= frameCount){           

    if (flicker3_counter < frameCount ) {
        console.log("flicker3");
        freqs[0] = randomInt(5, 45);
        freqs[1] = 50;
        freqs[2] = 5;
        flicker3_counter = frameCount + 300;
    }

  } else {

    changeColor();

  }
  
  //
  renderer.render( scene, camera );

}


function flicker2(){
  
  if (w==triangles.length) w = 0;
  triangles[w].material.opacity = Math.sin(new Date().getTime() * .025);
  w += 1;

}

      
function flicker3(){
        
  xx = Math.floor(numTriangles/2 + amplitude * Math.cos(Math.PI * Math.PI * d / period));
  
  if (w != xx) {
    
    w = xx;
    
    if (triangles[w].material.opacity == 1) {
      
      triangles[w].material.opacity = 0;
    
    } else {
      
      triangles[w].material.opacity = 1;    
    
    }
  
  }

    d++;
          
}

      
var change = false;

function fadeOut(){
        if (w==triangles.length && triangles[w].material.opacity==0) { 
          //w = 0;
          backwards = true;
          for (var i = 0; i < triangles.length; i++) {
            triangles[i].material.opacity = 1;
          };
        }
         if (w==0 && triangles[w].material.opacity==0) { 
        //  w = triangles.length;
          backwards = false;
          for (var i = 0; i < triangles.length; i++) {
            triangles[i].material.opacity = 1;
          };
         }
         triangles[w].material.opacity -= 0.1;
        if (backwards == false && triangles[w].material.opacity==0) w += 1; 
        if (backwards == true && triangles[w].material.opacity==0) w -= 1; 
        
        //if (triangles[w].material.opacity<0.1) w += 1;
      }

  function fadeIn(){
        if (w==triangles.length) { 
          w = 0;
          backwards = !backwards;
          // for (var i = 0; i < triangles.length; i++) {
          //  triangles[i].material.opacity = 1;
          // };
        }
        if (backwards == false && triangles[w].material.opacity<0.1) w -= 1; 
        if (backwards == true && triangles[w].material.opacity<0.1) w += 1; 
        triangles[w].material.opacity += 0.1;
        //if (triangles[w].material.opacity<0.1) w += 1;
      }

  function changeColor(){
        if (w==triangles.length) w = 0;
        triangles[w].material.color.setHSL( Math.sin(new Date().getTime() * .005), 0.9, 0.7 );
        //triangles[w].material.color = THREE.setHSL(Math.sin(new Date().getTime() * .025),1,1);
        w += 1;
      }

  
  function changeSphereColor(){
        //sphere.material.color.setHex(0xff0000);
        sphere.material.color.setHSL( Math.sin(new Date().getTime() * .005), 0.9, 0.7 );
  
      }

  function move(){
        if (w==triangles.length) w = 0;
        triangles[w].position.set(0, 0.0, -60+(8*w)*(1+Math.sin(new Date().getTime() * .0025)));
        w += 1;
      }
  
  function sphereMove(){
        
    sphere.position.set(0, 0.0, -25+24*(1+Math.sin(new Date().getTime() * .0025)));

  }

 


}

rbvj();
