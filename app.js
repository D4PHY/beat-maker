class DrumKit {
  constructor() {
    this.pads = document.querySelectorAll(".pad");
    this.btnPlay = document.querySelector(".btn-play");
    this.kickSound = document.querySelector(".kick-sound");
    this.snareSound = document.querySelector(".snare-sound");
    this.hihatSound = document.querySelector(".hihat-sound");
    this.select = document.querySelectorAll("select");
    // // WRITE A SCRIPT IN NODE WHICH WILL READ SOUND-LIBRARY FOLDER AND WILL
    // // WRITE A JSON THAT WE CAN FETCH AT A LATER TIME!!!
    // // https://www.tutorialspoint.com/nodejs/nodejs_file_system.htm
    // // 'WRITE' AND 'READ A DIRECTORY'
    this.kickSelect = document.getElementById("kick-select");
    this.snareSelect = document.getElementById("snare-select");
    this.hihatSelect = document.getElementById("hihat-select");
    // this.kickLib = [
    //   "./sounds-library/kick-dry.wav",
    //   "./sounds-library/kick-big.wav",
    //   "./sounds-library/kick-808.wav",
    // ];
    // this.snareLib = [];
    // this.hihatLib = [];
    this.activeIndex = 0;
    this.prevIndex = -1;
    this.bpm = 420;
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
      // OF THE ACTIVE BARS TO GET THE PREVIOUS BAR AND ANIMATE THOSE???
    });

    activeBar.forEach((pad) => {
      if (pad.classList.contains("active")) {
        if (pad.classList.contains("kick-pad")) {
          this.kickSound.fastSeek(0);
          this.kickSound.play();
        } else if (pad.classList.contains("snare-pad")) {
          this.snareSound.fastSeek(0);
          this.snareSound.play();
        } else if (pad.classList.contains("hihat-pad")) {
          this.hihatSound.fastSeek(0);
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

  createSoundOption(soundName) {
    const option = document.createElement("option");
    option.value = `./sounds-library/${soundName}`;
    option.textContent = this.formatSoundName(soundName);
    return option;
  }

  formatSoundName(soundName) {
    const name = soundName.split("-").join(" ");
    console.log(name);
    const nameCap = name.charAt(0).toUpperCase() + name.slice(1);
    const nameCut = nameCap.replace(".wav", "");
    return nameCut;
  }

  async addSounds() {
    const dataFetch = await fetch("./sounds-lib.json");
    const data = await dataFetch.json();
    data.forEach((sound) => {
      if (sound.includes("kick")) {
        const option = this.createSoundOption(sound);
        this.kickSelect.appendChild(option);
      } else if (sound.includes("snare")) {
        const option = this.createSoundOption(sound);
        this.snareSelect.appendChild(option);
      } else if (sound.includes("hihat")) {
        const option = this.createSoundOption(sound);
        this.hihatSelect.appendChild(option);
      }
    });
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

drumKit.addSounds();
