class Game {
  constructor() {
    this.player = new Player();
    this.backgroundImage;
    this.frisbee = new Frisbee();
    this.frisbees = [];
    this.frisbeeImage;
    this.frisbeeDuration = 150;
    this.cloud1Image;
    this.cloud2Image;
    this.cloud3Image;
    this.lives = 10;
    this.livesString = "$\u2665\u2665\u2665\u2665\u2665";
    this.loose1Gif;
    this.loose2Gif;
    this.loose3Gif;
    this.loose4Gif;
    // looseGifs = array, wo jedes element ein geladenes Bild von looseNGif ist (loadImage)
    this.looseGifs = [];
    this.looseSentence = "You can do better!";

    this.endGif;

    this.win1Gif;
    this.win2Gif;
    this.win3Gif;
    this.win4Gif;
    this.winGifs = [];
    this.winSentence = "Congratulations, you won!";
  }

  preload() {
    this.backgroundImage = loadImage("game-assets/background.png");

    this.player.image = loadImage("game-assets/player-dog.gif");
    this.player.imageRight = loadImage("game-assets/player-dog.gif");
    this.player.imageLeft = loadImage("game-assets/player-dog-left.gif");

    this.frisbeeImage = loadImage("game-assets/frisbee.gif");

    this.cloud1Image = loadImage("game-assets/clouds/cloud1.gif");
    this.cloud1copyImage = loadImage("game-assets/clouds/cloud1 copy.gif");
    this.cloud2Image = loadImage("game-assets/clouds/cloud2.gif");
    this.cloud2copyImage = loadImage("game-assets/clouds/cloud2 copy.gif");
    this.cloud3Image = loadImage("game-assets/clouds/cloud3no.gif");
    this.cloud3copyImage = loadImage("game-assets/clouds/cloud3 copy.gif");

    this.loose1Gif = loadImage("game-assets/loose/ashamed-dog.gif");
    this.loose2Gif = loadImage("game-assets/loose/dog-doesnt-catch.gif");
    this.loose3Gif = loadImage("game-assets/loose/not-your-day.gif");
    this.loose4Gif = loadImage("game-assets/loose/technical-difficulties.gif");

    // nach dem laden der looseNGifs (loadImage), dem looseGifs array hinzufügen
    this.looseGifs.push(
      this.loose1Gif,
      this.loose2Gif,
      this.loose3Gif,
      this.loose4Gif
    );

    this.win1Gif = loadImage("game-assets/win/dog-ball-catch.gif");
    this.win2Gif = loadImage("game-assets/win/fast-catch.gif");
    this.win3Gif = loadImage("game-assets/win/nice-catch.gif");
    this.win4Gif = loadImage("game-assets/win/stadium-dog.gif");

    this.winGifs.push(this.win1Gif, this.win2Gif, this.win3Gif, this.win4Gif);
  }

  draw() {
    image(this.backgroundImage, 0, 0, width, height);
    image(this.cloud1Image, 80, 350, 100, 50);
    image(this.cloud2Image, 960, 420, 100, 70);
    image(this.cloud1copyImage, 850, 350, 150, 80);
    image(this.cloud3Image, 750, 330, 90, 50);
    image(this.cloud3copyImage, 300, 400, 100, 50);
    this.player.draw();

    // spieler hat verloren
    if (!document.querySelector("#life").innerText) {
      // image(random(this.looseGifs))

      if (!this.endGif) {
        // ein random loose gif aus der liste der fertig geladenen loosegif bilder holen
        this.endGif = random(this.looseGifs);
      }

      image(this.endGif, 1050 / 2.9, 800 / 2.5, 500, 400);
      document.querySelector(".title").innerText = this.looseSentence;
      return;
    }

    // spieler hat gewonnen
    if (document.querySelector("#score span").innerText === "5") {
      if (!this.endGif) {
        this.endGif = random(this.winGifs);
      }

      image(this.endGif, 1050 / 2.9, 800 / 2.2, 500, 400);
      document.querySelector(".title").innerText = this.winSentence;
      return;
    }

    this.frisbee.draw();

    // frisbee wurde nicht rechtzeitig gefangen
    if (!this.frisbee.isAlive()) {
      this.livesString = this.livesString.slice(1);
      //   console.log(this.livesString);
      document.querySelector("#life").innerText = this.livesString.slice(1);

      this.frisbee = null;
      this.frisbee = new Frisbee();
    }

    // frisbee wurde gefangen
    if (this.frisbee.collision(this.player)) {
      // Increment the score
      this.player.score += 1;

      // Update score in dem DOM
      document.querySelector("#score span").innerText = this.player.score;

      this.frisbee = null;
      this.frisbee = new Frisbee();
    }

    // frisbee verlässt das spielfeld
    if (
      (!this.frisbee.collision(this.player) && this.frisbee.y > height) ||
      this.frisbee.x < 0
    ) {
      this.livesString = this.livesString.slice(1);
      //   console.log(this.livesString);
      document.querySelector("#life").innerText = this.livesString.slice(1);

      this.frisbee = null;
      this.frisbee = new Frisbee();
    }
  }
}
