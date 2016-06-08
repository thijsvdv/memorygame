import config from './config'

export default class Tile {
  constructor (data, context) {
    this.x = data.x
    this.y = data.y
    this.face = data.face
    this.isFaceUp = false
    this.isMatch = false
    this.width = config.tile_width
    this.context = data.context
  }
  
  // clearCanvas() {
  //   console.log("CLEAR CANVAS");
  //   this.context.clearRect(0, 0, 800, 800);
  // }

  drawFaceDown() {
    // console.log('FACEDOWN :(');
    let imageObj = new Image()

    imageObj.src = "../img/tiles/tile6.jpg"
    imageObj.width = this.width

    imageObj.onload = () => {
            // this.context.globalCompositeOperation = "destination-out";
            // this.context.drawImage(imageObj, 0, 0, 4*this.width, 4*this.width)
      this.context.clearRect(this.x, this.y, this.width, this.height);
      this.context.globalCompositeOperation = "source-atop";
      this.context.drawImage(imageObj, this.x, this.y, this.width, this.width)
    }

    this.isFaceUp = false
  }

  drawFaceUp() {
    // console.log('FACEUP!');
    this.context.fillStyle = 'white';
    // timeout is necessary, or bugs occur (drawing facedown on all
    // is slower than faceup on one single => command to reset would
    // still be busy when we've turned a new one up...
    setTimeout(() => {
      this.context.drawImage(this.face, this.x, this.y, this.width, this.width)
      this.isFaceUp = true
    }, 100);
  }

  isUnderMouse(x, y) {
    // console.log('isundermouse');
    return x >= this.x && x <= this.x + this.width  &&
           y >= this.y && y <= this.y + this.width
  }
}