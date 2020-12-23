class DrumKit {
  constructor() {
    this.pads = document.querySelectorAll(".pad");
    this.btnPlay = document.querySelector(".btn-play");
    this.kickSound = document.querySelector(".kick-sound");
    this.snareSound = document.querySelector(".snare-sound");
    this.hihatSound = document.querySelector(".hihat-sound");
    this.activeIndex = 0;
    this.prevIndex = -1;
    this.bpm = 240;
    this.soundLoop;
  }

  repeat() {
    let step = this.activeIndex % 8;
    let prevStep = this.prevIndex % 8;

    const activeBar = document.querySelectorAll(`.b${step}`);
    const prevBar = document.querySelectorAll(`.b${prevStep}`);

    activeBar.forEach((bar) => {
      bar.classList.add("animated-pad");
      prevBar.forEach((bar) => {
        bar.classList.remove("animated-pad");
      });
    });

    activeBar.forEach((pad) => {
      if (pad.classList.contains("active")) {
        if (pad.classList.contains("kick-pad")) {
          this.kickSound.play();
        } else if (pad.classList.contains("snare-pad")) {
          this.snareSound.play();
        } else if (pad.classList.contains("hihat-pad")) {
          this.hihatSound.play();
        }
      }
    });

    this.activeIndex++;
    this.prevIndex++;
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

  animatePad() {}
}

const drumKit = new DrumKit();

drumKit.pads.forEach((pad) => {
  pad.addEventListener("click", () => {
    if (!pad.classList.contains("active")) {
      pad.classList.add("active");
    } else {
      pad.classList.remove("active");
    }
  });
});

drumKit.btnPlay.addEventListener("click", () => {
  if (drumKit.btnPlay.textContent === "Play") {
    drumKit.start();
  } else {
    drumKit.stop();
  }
});
