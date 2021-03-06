/* @pjs preload="images/ozzie.jpg,images/cats/2.png"; */

/*import toxi.geom.*;
import toxi.color.*;*/

float a = 10/2;
float b = 20/2;
float c = 30/2;
float d = 40/2;

PImage img;
float ratioWidth;
float ratioHeight;
 
void setup() 
{
  size(1280, 800);
  smooth();
  colorMode(HSB, 1, 1, 1);
  ctx = externals.context;
  // load image

}

void draw(){
  
  getBlocks();
}

void getBlocks(){
  ctx.drawImage(video, 0, 0, width, height); //video is defined outside processing code
  //bruce = loadImage("images/ozzie.jpg");
  //bruce.loadPixels();
  img=get();
  // how much smaller in percent is the image?
  ratioWidth = (float) img.width / (float) width;
  ratioHeight = (float) img.height / (float) height;

  for (int y = 0; y <= height + c; y += c) 
  {
    for (int x = 0; x <= width + d; x += d)
    {
      pushMatrix();

      int index = 0;
      TColor pixelColor;
      
      if((y/c) % 2 == 0)
      {
        pixelColor = getColorAtPixel(x, y);
        translate(x, y);
      }
      else 
      {
        pixelColor = getColorAtPixel(int(x - b), y);
        translate(x - b, y);
      }
    
      stroke(pixelColor.toARGB());
      fill(pixelColor.toARGB());
      quad(0, -c, b, -b, 0, -a, -b, -b);

      pixelColor.darken(0.3);
      stroke(pixelColor.toARGB());
      fill(pixelColor.toARGB());
      quad(-b, -b, 0, -a, 0, a, -b, 0);
      
      pixelColor.lighten(0.5);
      pixelColor.desaturate(0.8);
      stroke(pixelColor.toARGB());
      fill(pixelColor.toARGB());
      quad(b, -b, b, 0, 0, a, 0, -a);
      popMatrix();
    }
  }
}


toxi.color.TColor getColorAtPixel(int x, int y)
{
    int index = int(x * ratioWidth) + int(y * ratioHeight) * img.width;
    
    // if this index is out of bounds in the image
    if(index < 0)                 index = 0;
    else if(index > img.pixels.length - 1)    index = img.pixels.length - 1;

    return toxi.color.TColor.newARGB(img.pixels[index]);
}