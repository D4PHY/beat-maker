class DrumKit {
  constructor() {
    this.pads = document.querySelectorAll(".pad");
    this.btnPlay = document.querySelector(".btn-play");
    this.index = 0;
    this.bpm = 60;
    this.soundLoop;
  }

  repeat() {
    let step = this.index % 8;
    const activePads = document.querySelectorAll(`.b${step}`);
    console.log(activePads);
    this.index++;
  }

  start() {
    this.btnPlay.textContent = "Stop";
    const interval = (60 / this.bpm) * 1000;
    this.soundLoop = setInterval(() => {
      this.repeat();
    }, interval);
  }

  stop() {
    clearInterval(this.soundLoop);
    this.btnPlay.textContent = "Play";
  }
}

const drumKit = new DrumKit();
drumKit.btnPlay.addEventListener("click", () => {
  if (drumKit.btnPlay.textContent === "Play") {
    drumKit.start();
  } else {
    drumKit.stop();
  }
});
// drumKit.start();
