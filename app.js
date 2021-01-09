const lib = [];

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

importLib();

console.log(lib);

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

class Track {
  constructor(name) {
    this.name = name;
    this.tag = document.createElement("div");
    this.tag.classList.add("track", this.name);

    this.select = document.createElement("ul");
    this.select.classList.add("custom-select");
    this.select.innerHTML = `<li>${this.name}<i class="fas fa-angle-down"></i><li>`;
    this.tag.appendChild(this.select);

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
    const padNum = 16;
    for (let i = 0; i < padNum; i++) {
      const pad = new Pad();
      this.pads.appendChild(pad.tag);
    }
  }
}

class BeatMaker {
  constructor() {
    this.container = document.querySelector(".beatmaker");
    this.trackList = [];
    importLib().then((data) => {
      data.forEach((track) => {
        this.trackList.push(track.label);
      });
      this.trackList = new Set(this.trackList);
      this.beatMakerInit();
    });

    // BEATMAKER EVENT HANDLERS
  }

  beatMakerInit() {
    this.trackList.forEach((trackName) => {
      const track = new Track(trackName);
      this.container.appendChild(track.tag);
    });
    // importLib().then((tracks) => {
    //   tracks.forEach((track) => {
    //     console.log(track);
    //     const trackObj = new Track(track.name);
    //     // console.log(trackObj);
    //     trackObj.name = track.name;
    //     this.container.appendChild(trackObj.tag);
    //   });
    // });
  }

  selectPads() {}
}

const beatMaker = new BeatMaker();
beatMaker.beatMakerInit();

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
