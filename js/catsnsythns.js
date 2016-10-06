
function setup(){
  //size (800,600);
  //size (800,600);
  // size(window.innerWidth,window.innerHeight);
  //createCanvas(640, 480);
  createCanvas(window.innerWidth,window.innerHeight);
  smooth();
  noStroke();
  background(0);
addUniverse();
}


function draw(){

}

function universe( _c,  _num){
  for (i = 0; i< _num*30; i++){

    //float n = noise(random(width)) * width;
    n = random(width);
    //float m = noise(random(height)) * height;
    m = random(height);
    s = random(20)/10;
    c = color(random(250), random(80));
    stroke(c);
    console.log(_c);
    strokeWeight(s);
    if (random(500) > 495) strokeWeight(random(50)/10);
    point(n, m);
    if (random(10000)>9996) {
      noStroke();
      fill(255,random(20,200));
      sz = random(1,5);
        ellipse(n+random(-2,2), m+random(-4,2),sz,sz);
        fill(255,random(20,120));
         sz = random(2,6);
        ellipse(n+random(-2,2), m+random(-2,2),sz,sz); 
        //}
      noFill();
    }
    noStroke();
  }

  for ( i = 0; i< _num; i++){
    addStar();
    fill(_c);
     n = noise(random(100,250)) * width;
     m = noise(random(100,250)) * height;
    n+= random(-300,300);
    m+= random(-300,300);
     w = width/random(20, 150);
    w+= random(50,150);
    ellipse(n, m, 80+w,80+w);
    //stroke(255, random(100));
    //point(n, m);
    noStroke();
  } 
}


function resize(){
  size(window.innerWidth,window.innerHeight);
  addUniverse();
}

function keyPressed(){
  background(0,0, random(30));
  addUniverse();
}

function mousePressed(){
  background(0,0, random(30));
  addUniverse();
}

function addUniverse(){
  console.log("addUniverse");
  universe(color(random(250),150,0, 5), 800);
  universe(color(random(50,220),random(200),0, 5), 400); 
  universe(color(random(220),0,0, 5), 300); 
  if (random(500) > 355) universe(color(random(150),20,0, 5), 400);
  if (random(1500) > 1000) universe(color(0,random(50),random(50,250), 5), 600);
  if (random(500) < 85) universe(color(random(150),random(220),0, 5), 200);
  if (random(100) < 10) universe(color(0,0,random(250), 5), 800);
}


function addStar(){
  push();
  translate(random(width), random(height));
  rotate(radians(random(360)));
  star(0, 0, 1, 20, 5); 
  pop();
}

function star( x,  y,  radius1,  radius2,  npoints) {
   angle = TWO_PI / npoints;
   halfAngle = angle/2.0;
  noStroke();
  fill(255,11);
  beginShape();
  for ( a = 0; a < TWO_PI; a += angle) {
     sx = x + cos(a) * radius2;
     sy = y + sin(a) * radius2;

    vertex(sx, sy);
    sx = x + cos(a+halfAngle) * radius1;
    sy = y + sin(a+halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}
