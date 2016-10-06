/* @pjs preload="images/bball.jpg,images/bball2.jpg,images/cats/2.png"; */


var tmp[][];
var src_blocks = [];
var dest_blocks = [];
var src_brights[][];
var dest_brights[][];
var sorted_blocks = [];
var blocksize = 20;
var img_force_width = 200;
var img, temp_img;
var source_img, dest_img;
int blockCount, passedTime;
int adjustbrightness=0;
var source = "images/bball.jpg";
var dest = "images/cats/2.png";
int savedTime;
var set_sizes = [5,8,10,16,20,25,40,50,80,100,200];

void setup() {
  size(window.innerWidth,window.innerHeight);
  colorMode(HSB, 255);
  background(255);
  savedTime = millis();
  source_img = loadImage(source);
  dest_img = loadImage(dest);
  setUpSourceImage(source_img, dest_img);
    //setUpDestImage();
    
  // noStroke();
  // source_img.filter(DILATE);
  // tint(0, 153, 204);  // Tint blue
  image(source_img, 0, 0);
  // image(source_img, source_img.width,0);
  
  showBlocks();
  doMozaic();
  
  

 }

void draw() {

}

void changeBlockSize(int sz){
  
  blocksize = set_sizes[sz-1];
  console.log("blocksize: "+blocksize);
  setUpSourceImage(source_img, dest_img);

  // // console.log(sz);
  image(source_img, 0,0);
  showBlocks();
  doMozaic();
}



void changeBrightness(int brt){
  loadPixels();
  console.log(brt);
  for (int x = 0; x < source_img.width; x++) {
    for (int y = 0; y < source_img.height; y++ ) {
  int loc = x + y*source_img.width;
  r = red (source_img.pixels[loc]);

  adjustbrightness = brt;
  r += adjustbrightness;
  r = constrain(r, 0, 255);
  color c = color(r);
  source_img.pixels[y*width + x] = c;
     }
  }
  updatePixels();
  image(source_img, 0, 0);
  setUpSourceImage(source_img, dest_img);
}

function setUpSourceImage(_src_img, _dest_img){
  blockCount = source_img.width/blocksize*source_img.height/blocksize;
  //console.log("blockCount: " + blockCount);
  src_brights = new int [blockCount][];
  dest_brights = new int [blockCount][];
  //dest_img.filter(GRAY);
  tmp = getBlocks(_src_img, _dest_img);
  src_blocks = tmp['src_blocks'];
  src_brights = tmp['src__brights'];
  dest_blocks = tmp['dest_blocks'];
  dest_brights = tmp['dest__brights'];
  //console.log(dest_brights);
  //src_brights.sort(compareSecondColumn);
  // src_brights.reverse();
}

function getBlocks(PImage _source, PImage _dest){
  //console.log(blockCount);
  PImage _src_blocks = new Array(blockCount);
  PImage _dest_blocks = new Array(blockCount);
  int _src__brights[] = new int [blockCount][];
  int _dest__brights[] = new int [blockCount][];


  int i = 0;
  for (var y = 0; y < _source.height; y+=blocksize) {
    for (var x = 0; x < _source.width; x+=blocksize) {
      //_blocks[i] = createImage(blocksize, blocksize);
        _src_blocks[i] = _source.get(x, y, blocksize, blocksize);
        _src__brights[i] = {i, getAverageBrightness(_src_blocks[i])};
        _dest_blocks[i] = _dest.get(x, y, blocksize, blocksize);
        _dest__brights[i] = {i, getAverageBrightness(_dest_blocks[i])};
        //console.log(_src__brights[i] + " : " + _dest__brights[i]);
      i++;
    }
  }
  int fin[][] = new int [blockCount][];
  fin['src_blocks'] = _src_blocks;
  fin['src__brights'] = _src__brights;
  fin['dest_blocks'] = _dest_blocks;
  fin['dest__brights'] = _dest__brights;

  background(255);
  return fin;

}

function showBlocks(){
  int i = 0;
  noStroke();
  for (var y = 0; y < source_img.height; y+=blocksize) {
    for (var x = 0; x < source_img.width; x+=blocksize) {
      fill(dest_brights[i][1]);
      rect(x+source_img.width,y,blocksize,blocksize )    
      i++;
    }
  }
}


function doMozaic(){
  
  int i = 0;
  for (var y = 0; y < dest_img.height; y+=blocksize) {
    for (var x = 0; x < dest_img.width; x+=blocksize) {
      //console.log(dest_brights[i][1]);
      var c = closestBrightness(dest_brights[i][1]);
      //console.log("-----"+ c);
      image(src_blocks[c],x+dest_img.width*2, y, blocksize,blocksize);
      i++;
    }
  }
  passedTime = millis() - savedTime;
  console.log("setup time:" + passedTime);
  savedTime = millis();
}

function closestBrightness(dest_bright){
  boolean found;
  var closest = 0;
  while (found == false && closest <= 255) {
      // for (var i = src_brights.length-1; i > 0 ; i--) {
      for (var i = 0; i < src_brights.length; i++) {
      //console.log(src_brights[i][1]);
      if (dest_bright >=src_brights[i][1]-closest && dest_bright < src_brights[i][1] + closest) {
      found = true;
      //console.log(src_brights[i][1]+ " : " + dest_bright);
      //src_brights.splice(i, 1);
      return i;
      }
    }
    closest+=2;
  }
  console.log("no match found: " + dest_bright);
  // if(src_brights.length > 0) src_brights.splice(src_brights.length, 1);
}





function getAverageBrightness(img) {
  img.loadPixels();
  int r = 0, g = 0, b = 0;
    for (int i=0; i<img.pixels.length; i++) {
      //c = hue(img.pixels[i]);
      //c = saturation(img.pixels[i]);
      c = brightness(img.pixels[i]);
      //b+= brightness(c);
      b+= c;
    }

  b = int(b/img.pixels.length);
  if (b > 255) b = 255;
  //console.log(b);
  return b;
}





int[][] getBrights(_source, _blocks[]){
  int i = 0;
  int _brights[][] = new int [blockCount][];
  //console.log(blockCount);
  for (var y = 0; y < _source.height; y+=blocksize) {
    for (var x = 0; x < _source.width; x+=blocksize) {
      _brights[i] = {i, getAverageBrightness(_blocks[i])};
      i++;
    }
  }
  return _brights;
}





function showBrightness(){
    console.log(brights);
  int i = 0;
  for (var y = 0; y < source_img.height; y+=blocksize) {
    for (var x = 0; x < source_img.width; x+=blocksize) {
      image(dest_blocks[i],x+source_img.width*2, y, blocksize,blocksize);
      //fill(brights[i][1]);
      //rect(x+source_img.width*2,y,blocksize,blocksize )
      i++;
    }
  }
}






function compareSecondColumn(a, b) {
    if (a[1] === b[1]) {
        return 0;
    }
    else {
        return (a[1] < b[1]) ? -1 : 1;
    }
}
