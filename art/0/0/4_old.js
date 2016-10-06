
rbvj = function(){

console.log("======== depression ");
  ctx.background(0);

var scene = new THREE.Scene();
var aspect = window.innerWidth / window.innerHeight;
var camera = new THREE.PerspectiveCamera( 70, aspect, 0.1, 1000 );

var d=0, t=0;

var renderer = new THREE.WebGLRenderer({antialias: true, logarithmicDepthBuffer: true});
renderer.setSize( w, h );
container = document.getElementById( 'cover' );
container.appendChild( renderer.domElement );

var geometry = new THREE.PlaneGeometry( 85, 120, 98, 18 );
geometry.dynamic = true;

var dMaterial = new THREE.MeshDepthMaterial();
dMaterial.shading = THREE.SmoothShading;
var plane = new THREE.Mesh( geometry, dMaterial );
scene.add( plane );
camera.position.z = 150;
camera.near = 60;
camera.far  = 185;
plane.rotation.z += Math.PI;

var tt = [];
var start_z = [];
var start_y = [];
for (i=0;i<plane.geometry.vertices.length;i++) {
  start_z[i] = plane.geometry.vertices[i].z;
  start_y[i] = plane.geometry.vertices[i].y;
  tt[i] = 0;
}

draw = function() {
  
  scene.rotation.y = 8;
  t+=.0001
  d+=.01
  for (i=0;i<plane.geometry.vertices.length;i++){
    
    //tt[i] = tween(tt[i], map(mapAudio(i, plane.geometry.vertices.length), 0,100, 0, 220), 30);
    //console.log(tt[i])
    tt[i] = tween(tt[i], map(random(100),0,100, 0, 140), 50);

    // if (plane.geometry.vertices[i].y != 25 && plane.geometry.vertices[i].y != -25) {
    // plane.geometry.vertices[i].z = tween(plane.geometry.vertices[i].z, start_z[i] + Math.sin(tt[i])*Math.cos(i*d)*96, 10);
    plane.geometry.vertices[i].z=start_z[i]+Math.sin(tt[i]/1000*i+d)*Math.cos(i+d*tt[i]/1000)*5;

     // plane.geometry.vertices[i].z = start_z + Math.sin(d+tt[i])*Math.cos(i*d)*22.6;
    //plane.geometry.vertices[i].z = 10 + Math.abs(Math.sin(t*i+d)*Math.cos(i+d*t)*10);
    //}
    //console.log(plane.geometry.vertices[i].y)
    //plane.geometry.vertices[i].y = tween(plane.geometry.vertices[i].y, plane.geometry.vertices[i].y + Math.sin(t)*Math.cos(i)*1.2, 2);
    //plane.geometry.vertices[i].y = -20 + Math.sin(tt[i])*40;
    //plane.geometry.vertices[i].x = -20 + Math.cos(tt[i])*10;
  }
  //plane.geometry.vertices[0].y = tween(plane.geometry.vertices[0].y, start_y[0] + map(audioChannelVolume[10],0,140, 0, 40), 10);
  scene.rotation.y+=0.01;
  //scene.rotation.y = tween(scene.rotation.y, scene.rotation.y + map(audioChannelVolume[10],0,140, -0.4, 0.4), 90);
  plane.geometry.verticesNeedUpdate=true
  renderer.render( scene, camera );
};


}


rbvj();


