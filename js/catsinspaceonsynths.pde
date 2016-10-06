
PImage[] cats = new PImage[11];
PImage[] synths = new PImage[11];
PImage bg;
int c, s, p, r, rr, cc, cp;
boolean rot; 
boolean u = false;

void setup(){
  //size (800,600);
  //size (800,600);
  size(window.innerWidth,window.innerHeight);
  smooth();
  noStroke();
  background(0);
  rectMode(CENTER);
  r= 0;

  for (int i =1; i<14; i++){
    String c = "images/cats/"+i+".png";
    cats[i-1] = loadImage(c);
  }

  for (int i =1; i<12; i++){
    String s = "images/synths/"+i+".png";
    synths[i-1] = loadImage(s);
  }

  bg = createImage(window.innerWidth,window.innerHeight);

  addUniverse();

}


void draw(){
  background(0);
  image(bg, 0,0);
  
  if (random(10)>8) {r = int(random(-50,50)); cc = int(random(-20,20))};
  if (random(100)>98) {rot = true; };
  if (random(800)>799) {newCat();};
  p -= (p-r)/40;
  cp -= (cp-cc)/10;
  if (rot && rr < 360 && rr > 0) {
    rr +=2;
  } else {
    rot = false;
  }
  if (random(8000)>7999) { u = true; r2 = 0; };
  // if (u) drawTrianle();
  if (u == true)  drawrect();
  pushMatrix();
  translate(width/2+200, height/2);
  rotate(radians(p*0.5+rr));
  image(synths[s], 2*p-400, 2*p-200, 400,400);
  image(cats[c], 2*p-300, 2*p-200+cp, 200,200);
  popMatrix();
}


int r2 = 0;

void drawrect(){
  r2+=1.1;
  if (r2<600) {
  pushMatrix();
    strokeWeight(8);
    stroke(255);
    translate(width/2, height/2);
    rotate(radians(r2));
    
    rect(0, 0, r2/2,r2/2);
    rect(0, 0, r2,r2);
    rect(0, 0, r2*2,r2*2);
    rect(0, 0, r2+150,r2+150);  
    popMatrix();
  } else {
    u = false;
  }
}



void drawTrianle(){
  strokeWeight(10);
  stroke(255);
  noFill();
  pushMatrix();
  int tw = 120;
  int th = 250;
  translate(width/2, height/2-th/2);
r2++;
  rotateY(radians(r2));
  //rotateY(map(mouseX, 0, width/2, 0, 0.4*PI));
 //rotateX(map(mouseY, 0, height, 0, 0.4*PI));
// fill(255,200,200);
  beginShape();
  vertex(0, 0,0);//top
  vertex(tw, th, tw);
  vertex(-tw, th, tw);
  endShape();
   
// fill(200,255,200);
  beginShape();
  vertex(0, 0, 0);
  vertex(tw, th, tw);
  vertex(tw, th, -tw);
  endShape();
 
// fill(200,200,255);
  beginShape();
  vertex(0, 0,0);
  vertex(-tw, th, tw);
  vertex(-tw, th, -tw);
  endShape();
 
   beginShape();
  vertex(0, 0,0);
  vertex(-tw, th, -tw);
  vertex(-tw, th, tw);
  endShape();

 
   beginShape();
  vertex(0, 0,0);
  vertex(tw, th, -tw);
  vertex(-tw, th, -tw);
  endShape();

  popMatrix();
  noStroke();
}


void universe(color _c, int _num){
  for (int i = 0; i< _num*30; i++){

    //float n = noise(random(width)) * width;
    float n = random(width);
    //float m = noise(random(height)) * height;
    float m = random(height);
    float s = random(20)/10;
    color c = color(random(250), random(80));
    stroke(c);
    
    strokeWeight(s);
    if (random(500) > 495) strokeWeight(random(50)/10);
    point(n, m);
    if (random(10000)>9996) {
      noStroke();
      
      int c = random(2,5);
       //for (int i = 0; i < c; ++i) {
        fill(255,random(20,200));
        int sz = random(1,5);
        ellipse(n+random(-2,2), m+random(-4,2),sz,sz);
        fill(255,random(20,120));
        int sz = random(2,6);
        ellipse(n+random(-2,2), m+random(-2,2),sz,sz); 
        //}
      noFill();
    }
//    strokeWeight(s/2);
//    c = color(random(250), random(250));
  //  stroke(c);
   // point(n, m);
    noStroke();
  }

  for (int i = 0; i< _num/2; i++){
    addStar();
    fill(_c);
    float n = noise(random(100,250)) * width;
    float m = noise(random(100,250)) * height;
    n+= random(-200,200);
    m+= random(-200,200);
    float w = width/random(20, 150);
    w+= random(50,150);
    ellipse(n, m, 80+w,80+w);
    //stroke(255, random(100));
    //point(n, m);
    noStroke();
  } 
}


void resize(){
  size(window.innerWidth,window.innerHeight);
  addUniverse();
}

void keyPressed(){
  background(0,0, random(30));
  addUniverse();
}

void mousePressed(){
  background(0,0, random(30));
  addUniverse();
}

void addUniverse(){
  u = false;
  universe(color(random(250),150,0, 0.5), 800);
  universe(color(random(50,220),random(200),0, 0.5), 400); 
  //universe(color(random(220),0,0, 0.5), 300); 
  if (random(500) > 355) universe(color(random(150),20,0, 0.5), 400);
  if (random(1500) > 1000) universe(color(0,random(50),random(50,250), 0.5), 600);
  if (random(500) < 85) universe(color(random(150),random(220),0, 0.5), 200);
  if (random(100) < 10) universe(color(0,0,random(250), 0.5), 800);
  //bg.loadPixels(); 
  //bg = loadPixels();
  bg = get();
  //bg.updatePixels();
  //image(bg, 0,0,window.innerWidth,window.innerHeight);
  newCat();
  //u = true;
}


void newCat(){
     c = int(random(0,13));
   s = int(random(0,11));
  console.log("synth"+ (s+1));
  console.log("cat"+ (c+1));
}
void addStar(){
  pushMatrix();
  translate(random(width), random(height));
  rotate(radians(random(360)));
  star(0, 0, 1, 20, 5); 
  popMatrix();
}

void star(float x, float y, float radius1, float radius2, int npoints) {
  float angle = TWO_PI / npoints;
  float halfAngle = angle/2.0;
  noStroke();
  fill(255,11);
  beginShape();
  for (float a = 0; a < TWO_PI; a += angle) {
    float sx = x + cos(a) * radius2;
    float sy = y + sin(a) * radius2;

    vertex(sx, sy);
    sx = x + cos(a+halfAngle) * radius1;
    sy = y + sin(a+halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}
