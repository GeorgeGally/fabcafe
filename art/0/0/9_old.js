rbvj = function(){

var scene = new THREE.Scene();
var aspect = window.innerWidth / window.innerHeight;
var camera = new THREE.PerspectiveCamera( 80, aspect, 0.1, 1000 );
var num_particles = 390;
var plane = [];

var d=0, t=0;

var renderer = new THREE.WebGLRenderer({antialias: true, logarithmicDepthBuffer: true});
renderer.setSize( w, h );
container = document.getElementById( 'cover' );
container.appendChild( renderer.domElement );

var geometry = new THREE.SphereGeometry( random(2, 4), 8, 18, 2 );
geometry.dynamic = true;

var dMaterial = new THREE.MeshDepthMaterial();
dMaterial.shading = THREE.SmoothShading;
scene.fog = new THREE.FogExp2( 0x000000, 0.001 );


for (var i = 0; i < num_particles; i++) {
  plane[i] = new THREE.Mesh( geometry, dMaterial );
  scene.add( plane[i] );
  plane[i].rotation.z += (i * Math.PI);
  // plane[i].position.x = random(-15,15);
  plane[i].position.x = random(-0.6, 0.6);
  plane[i].position.y = randomInt(-182,182);
  plane[i].position.z = randomInt(-0.2, 0.2);
  plane[i].start = new Vector(plane[i].position.x, plane[i].position.y,plane[i].position.z);
  plane[i].position.normalize();
  plane[i].position.multiplyScalar( Math.random() * 20 + 10 );
  plane[i].s = 1;
  plane[i].s2 = 1;

var tt = [];
var start_z = [];
var start_y = [];
for (j=0;j<plane[i].geometry.vertices.length;j++) {
  start_z[j] = plane[i].geometry.vertices[j].z;
  start_y[j] = plane[i].geometry.vertices[j].y;
  tt[j] = 0;
}


}

renderer.setClearColor( 0x000000 );
camera.position.z = 100;
camera.near = 40;
camera.far  = 112;
var counter = 0;
draw = function() {
  
  //scene.rotation.y = 8;
  t+=.0001
  d+=.01
  for (var i = 0; i < num_particles; i++) {

    //plane[i].position.x = tween(plane[i].position.x,map(mapSound(i, num_particles), 0,100, -10, 10), 10);
    //plane[i].position.y = tween(plane[i].position.y, map(mapSound(i, num_particles), 0,100, -10, 10), 10);
  // for (j=0;j<plane[i].geometry.vertices.length;j++){
  //   tt[j] = tween(tt[j], map(audioChannelVolume[j%120],0,140, 0, 40), 50);
  //   plane[i].geometry.vertices[j].z=start_z[j]+Math.sin(tt[j]/1000*i+d)*Math.cos(i+d*tt[j]/1000)*5;
  plane[i].s = tween(plane[i].s, map(mapAudio(i, num_particles), 0, 100, 0, 2), 15);
  plane[i].s2 = tween(plane[i].s, map(mapAudio(i, num_particles), 0, 150, -10, 16), 5);


  plane[i].position.y -= 0.01 + plane[i].s/15;

  if (chance(200)) freqs[3] = randomInt(10)*4;


  if (plane[i].position.y < -80)  {
    plane[i].position.y = 140;
    freqs[2] = i
  }
  //console.log(plane[0].position.z)

  }
  counter++;
  scene.rotation.y = Math.sin(counter/1000) * 0.10;
  //scene.rotation.y = tween(scene.rotation.y, scene.rotation.y + map(audioChannelVolume[10],0,140, -0.4, 0.4), 90);

  renderer.render( scene, camera );

};



}

rbvj();