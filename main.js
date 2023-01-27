const game = new Game();

let mySound;
let mySoundPlays = false;

function preload() {
  mySound = loadSound("game-assets/Pixelland.mp3");
  game.preload();
}

function setup() {
  let canvas = createCanvas(windowWidth - 50, windowHeight - 30);
  canvas.parent("canvas");
}

function draw() {
  game.draw();
}

function keyPressed() {
  if (keyCode === 32) {
    game.player.jump();
    if (mySoundPlays === false) {
      mySound.play();
      mySoundPlays = true;
    }
  }
}
