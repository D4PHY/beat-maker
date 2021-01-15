document.addEventListener("DOMContentLoaded", importLib);
const lib = [];
const padNum = 16;

// DATA FECTH FROM LOCAL URL: './sounds-lib.json'
async function importLib() {
  const dataFetch = await fetch("./sounds-lib.json");
  const data = await dataFetch.json();
  data.forEach((data) => {
    let label = data.split("-")[0];
    lib.push({
      name: data,
      source: `./sounds-library/${data}`,
      label: label,
    });
  });
  return lib;
}

// PAD - SMALLEST BEATMAKER UNIT
class Pad {
  constructor() {
    this.tag = document.createElement("div");
    this.tag.classList.add("pad");
    this.state = ["normal", "active", "hover"];
    this.sound = document.createElement("audio");
    // this.sound.classList.add(`clap-sound`);
    // this.sound.src = "./sounds-library/clap-808.wav";
    // MOVE THE ABOVES IN THE TRACKS
    this.tag.appendChild(this.sound);
  }
}

// TRACK - A GROUP OF PADS WITH THE SAME SOUND
class Track {
  constructor(name) {
    this.name = name;
    this.tag = document.createElement("div");
    this.tag.classList.add("track", this.name);

    // CREATE CUSTOM SELECT
    this.customSelectWrapper = document.createElement("div");
    this.customSelectWrapper.classList.add("custom-select-wrapper");
    this.customSelectWrapper.innerHTML = `<div class="custom-select-input">
    <div class="actual-select-input">
      <label for="custom-select">Clap</label>
      <input type="text" id="custom-select" />
    </div>
    <i class="custom-select-arrow fas fa-chevron-down"></i>
  </div>

  <ul class="custom-select-optios">
    <li>Clap 1<i class="custom-select-arrow fas fa-angle-down"></i></li>
    <li>Clap 2<i class="custom-select-arrow fas fa-angle-down"></i></li>
    <li>Clap 3<i class="custom-select-arrow fas fa-angle-down"></i></li>
    <li>Clap 4<i class="custom-select-arrow fas fa-angle-down"></i></li>
    <li>Clap 5<i class="custom-select-arrow fas fa-angle-down"></i></li>
  </ul>`;
    this.tag.appendChild(this.customSelectWrapper);
    // this.select = document.createElement("ul");
    // this.select.classList.add("custom-select");
    // this.select.innerHTML = `<li>${this.name}<i class="fas fa-angle-down"></i><li>`;
    // this.tag.appendChild(this.select);

    this.pads = document.createElement("div");
    this.pads.classList.add("pads");
    this.padInit();
    this.tag.appendChild(this.pads);

    this.muteBtn = document.createElement("div");
    this.muteBtn.classList.add("mute-btn", `${this.name}-mute-btn`);
    this.muteBtn.innerHTML = `<i class="fas fa-volume-mute"></i>`;
    this.tag.appendChild(this.muteBtn);
  }

  padInit() {
    for (let i = 0; i < padNum; i++) {
      const pad = new Pad();
      pad.tag.addEventListener("click", () => {
        this.activatePad(pad.tag);
      });
      pad.tag.classList.add(`p${i}`);
      this.pads.appendChild(pad.tag);
    }
  }

  activatePad(pad) {
    pad.classList.toggle("pad-active");
  }
}

// BEATMAKER - A GROUP OF DIFFERENT TRACKS
class BeatMaker {
  constructor() {
    this.container = document.querySelector(".beatmaker");
    this.trackList = [];

    // PLAYER VARIABLES
    this.bpi = 300;
    this.index = 0;
    this.step = null;
    this.currentStep = null;
    this.repeat = null;
    this.isPlaying = null;
    this.isPaused = null;

    // CONSUME THE PROMISE
    importLib().then((data) => {
      data.forEach((track) => {
        this.trackList.push(track.label);
      });
      this.trackList = new Set(this.trackList);
      this.beatMakerInit();

      // BEATMAKER INTRO ANIMATION
      gsap.to(".track", {
        duration: 0.08,
        opacity: 1,
        delay: 1.5,
        stagger: 0.04,
      });

      // SELECT BEATMAKER COMPONENTS (DATA AVAILABLE AFTER FETCHING IS DONE)
      const allPads = document.querySelectorAll(".pad");
      const audios = document.querySelectorAll("audio");

      // BEATMAKER FUNCTS.
      const repeater = (actualStep) => {
        this.step = actualStep % padNum;
        this.repeat = setInterval(() => {
          activeBar(this.step);
          playSound();
          if (!this.isPaused) {
            console.log(this.step);
            this.step++;
            if (this.step === padNum) {
              this.step = 0;
            }
          } else {
            activeBar(this.currentStep);
            console.log(this.currentStep);
            this.currentStep++;
            if (this.currentStep === padNum) {
              this.curentStep = 0;
            }
          }
        }, this.bpi);
      };

      const play = () => {
        if (!this.isPaused) {
          repeater(this.index);
        } else if (this.isPaused) {
          repeater(this.currentStep);
          this.isPaused = null;
        }
      };

      const stop = () => {
        clearInterval(this.repeat);
        console.log("stop");
      };

      const pause = () => {
        this.isPaused = true;
        clearInterval(this.repeat);
        // RECORD CURRENT STEP TO BE PASSED TO THE PLAY() [WE DON'T WANT TO START FROM BEGINING]
        this.currentStep = this.step;
        console.log("pause", this.isPaused);
      };

      const activeBar = (step) => {
        allPads.forEach((pad) => {
          if (pad.classList.contains(`p${step}`)) {
            pad.classList.add("bar");
          } else {
            pad.classList.remove("bar");
          }
        });
      };

      const addSound = () => {
        audios.forEach((audio) => {
          audio.src = "./sounds-library/clap-808.wav";
          audio.type = "audio/wav";
        });
      };

      const playSound = () => {
        audios.forEach((audio) => {
          if (audio.closest(".pad-active") && audio.closest(".bar")) {
            audio.play();
            console.log("hello", audio);
          }
        });
      };

      // BEATMAKER EVENT HANDLERS
      this.playBtn.addEventListener("click", () => {
        play();
      });

      this.stopBtn.addEventListener("click", () => {
        stop();
      });

      this.pauseBtn.addEventListener("click", () => {
        pause();
      });

      document.addEventListener("DOMContentLoaded", addSound());
    });

    // SELECT INTERACTIVE UI
    this.deleteBtn = document.querySelector(".delete-btn");
    this.saveBtn = document.querySelector(".save-btn");
    this.tempoSlider = document.querySelector(".tempo-slider");
    this.bpiText = document.querySelector(".bpi-text");
    this.pauseBtn = document.querySelector(".pause-btn");
    this.playBtn = document.querySelector(".play-btn");
    this.stopBtn = document.querySelector(".stop-btn");
  }

  beatMakerInit() {
    this.trackList.forEach((trackName) => {
      const track = new Track(trackName);
      this.container.appendChild(track.tag);
    });
  }
}

// CREATE AND INITIALIZE THE  BEATMAKER
const beatMaker = new BeatMaker();
beatMaker.beatMakerInit();

// ANIMATE PAGE UI
const timeline = gsap.timeline({ defaults: { duration: 1 } });
timeline
  .from("header", { y: "-100%", ease: "bounce" })
  .fromTo(".beatmaker-tools, .media-controls", { opacity: 0 }, { opacity: 1 })
  .from("footer", { y: "100", ease: "elastic" });

// class DrumKit {
//   constructor() {
//     this.pads = document.querySelectorAll(".pad");
//     this.btnPlay = document.querySelector(".btn-play");
//     this.kickSound = document.querySelector(".kick-sound");
//     this.snareSound = document.querySelector(".snare-sound");
//     this.hihatSound = document.querySelector(".hihat-sound");
//     this.select = document.querySelectorAll("select");
//     this.kickSelect = document.getElementById("kick-select");
//     this.snareSelect = document.getElementById("snare-select");
//     this.hihatSelect = document.getElementById("hihat-select");
//     this.muteBtn = document.querySelectorAll(".mute");
//     this.tempoSlider = document.querySelector("#tempo-slider");
//     this.activeIndex = 0;
//     this.bpm = 120;
//     this.isPlaying = null;

//     // EVENT LISTENERS
//     this.pads.forEach((pad) => {
//       pad.addEventListener("click", () => {
//         if (!pad.classList.contains("active")) {
//           pad.classList.add("active");
//         } else {
//           pad.classList.remove("active");
//         }
//       });
//     });

//     this.btnPlay.addEventListener("click", () => {
//       if (this.btnPlay.textContent === "Play") {
//         this.start();
//       } else {
//         this.stop();
//       }
//     });

//     this.select.forEach((select) => {
//       select.addEventListener("click", (event) => {
//         this.changeSound(event);
//       });
//     });

//     this.muteBtn.forEach((btn) => {
//       btn.addEventListener("click", (event) => {
//         this.muteTrack(event);
//       });
//     });

//     this.tempoSlider.addEventListener("input", (event) => {
//       this.changeTempoText(event);
//     });

//     this.tempoSlider.addEventListener("change", (event) => {
//       this.adjustTempo(event);
//     });

//     this.addSounds();
//   }

//   // DRUMKIT METHODS

//   repeat() {
//     let step = this.activeIndex % 8;

//     const activeBar = document.querySelectorAll(`.b${step}`);
//     const allBars = document.querySelectorAll(`.pad`);

//     allBars.forEach((bar) => {
//       bar.classList.remove("animated-pad");
//     });

//     activeBar.forEach((pad) => {
//       pad.classList.add("animated-pad");
//       if (pad.classList.contains("active")) {
//         if (pad.classList.contains("kick-pad")) {
//           this.kickSound.fastSeek(0);
//           this.kickSound.play();
//         } else if (pad.classList.contains("snare-pad")) {
//           this.snareSound.fastSeek(0);
//           this.snareSound.play();
//         } else if (pad.classList.contains("hihat-pad")) {
//           this.hihatSound.fastSeek(0);
//           this.hihatSound.play();
//         }
//       }
//     });

//     this.activeIndex++;
//   }

//   start() {
//     this.btnPlay.textContent = "Stop";
//     const interval = (60 / this.bpm) * 1000;
//     this.isPlaying = setInterval(() => {
//       this.repeat();
//     }, interval);
//   }

//   stop() {
//     clearInterval(this.isPlaying);
//     this.pads.forEach((pad) => {
//       pad.classList.remove("animated-pad");
//     });
//     this.btnPlay.textContent = "Play";
//   }

//   createSoundOption(soundName) {
//     const option = document.createElement("option");
//     option.value = `./sounds-library/${soundName}`;
//     option.textContent = this.formatSoundName(soundName);
//     return option;
//   }

//   formatSoundName(soundName) {
//     const name = soundName.split("-").join(" ");
//     console.log(name);
//     const nameCap = name.charAt(0).toUpperCase() + name.slice(1);
//     const nameCut = nameCap.replace(".wav", "");
//     return nameCut;
//   }

//   async addSounds() {
//     const dataFetch = await fetch("./sounds-lib.json");
//     const data = await dataFetch.json();
//     data.forEach((sound) => {
//       if (sound.includes("kick")) {
//         const option = this.createSoundOption(sound);
//         this.kickSelect.appendChild(option);
//       } else if (sound.includes("snare")) {
//         const option = this.createSoundOption(sound);
//         this.snareSelect.appendChild(option);
//       } else if (sound.includes("hihat")) {
//         const option = this.createSoundOption(sound);
//         this.hihatSelect.appendChild(option);
//       }
//     });
//   }

//   changeSound(event) {
//     if (event.target.closest("#kick-select")) {
//       this.kickSound.src = event.target.value;
//     } else if (event.target.closest("#snare-select")) {
//       this.snareSound.src = event.target.value;
//     } else if (event.target.closest("#hihat-select")) {
//       this.hihatSound.src = event.target.value;
//     }
//   }

//   muteTrack(event) {
//     console.log(event.target);
//     const mutedIndex = event.target.getAttribute("data-track");
//     event.target.classList.toggle("active");
//     if (event.target.classList.contains("active")) {
//       switch (mutedIndex) {
//         case "0":
//           this.kickSound.volume = 0;
//           break;
//         case "1":
//           this.snareSound.volume = 0;
//           break;
//         case "2":
//           this.hihatSound.volume = 0;
//           break;
//       }
//     } else {
//       switch (mutedIndex) {
//         case "0":
//           this.kickSound.volume = 1;
//           break;
//         case "1":
//           this.snareSound.volume = 1;
//           break;
//         case "2":
//           this.hihatSound.volume = 1;
//           break;
//       }
//     }
//   }

//   adjustTempo(event) {
//     clearInterval(this.isPlaying);
//     this.isPlaying = null;
//     if (this.btnPlay.textContent === "Stop") {
//       this.start();
//     }
//   }

//   changeTempoText(event) {
//     this.bpm = event.target.value;
//     const tempoNr = document.querySelector(".tempo-nr");
//     tempoNr.textContent = event.target.value;
//   }
// }

// const drumKit = new DrumKit();
