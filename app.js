class DrumKit {
  constructor() {
    this.pads = document.querySelectorAll(".pad");
    this.btnPlay = document.querySelector(".btn-play");
    this.kickSound = document.querySelector(".kick-sound");
    this.snareSound = document.querySelector(".snare-sound");
    this.hihatSound = document.querySelector(".hihat-sound");
    this.select = document.querySelectorAll("select");
    // this.kickSelect = document.getElementById("kick-select");
    // this.snareSelect = document.getElementById("snare-select");
    // this.hihatSelect = document.getElementById("hihat-select");
    // this.kickLib = [
    //   "./sounds-library/kick-dry.wav",
    //   "./sounds-library/kick-big.wav",
    //   "./sounds-library/kick-808.wav",
    // ];
    // this.snareLib = [];
    // this.hihatLib = [];
    this.activeIndex = 0;
    this.prevIndex = -1;
    this.bpm = 240;
    this.isPlaying = null;
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
      // THINK HOW TO REFACTOR THIS FEATURE: YOU MIGHT USE THE INDEX
      // OF THE ACTIVE BAR TO GET THE PREVIOUS BAR AND ANIMATE THAT???
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
    this.isPlaying = setInterval(() => {
      this.repeat();
    }, interval);
  }

  stop() {
    clearInterval(this.isPlaying);
    this.btnPlay.textContent = "Play";
  }

  changeSound(event) {
    if (event.target.closest("#kick-select")) {
      this.kickSound.src = event.target.value;
    } else if (event.target.closest("#snare-select")) {
      this.snareSound.src = event.target.value;
    } else if (event.target.closest("#hihat-select")) {
      this.hihatSound.src = event.target.value;
    }
  }
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

drumKit.select.forEach((select) => {
  select.addEventListener("click", (event) => {
    drumKit.changeSound(event);
  });
});
