// BEATMAKER - A GROUP OF DIFFERENT TRACKS

class BeatMaker {
  constructor() {
    // BEATMAKER VARIABLES

    this.container = document.querySelector(".beatmaker");
    this.lib = [];
    this.tracks = [];

    // PLAYER VARIABLES

    this.bpmInput = 150;
    this.index = 0;
    this.step = null;
    this.currentStep = null;
    this.repeat = null;
    this.isPlaying = false;
    this.isPaused = false;
    this.isStopped = true;
    this.tempoUpdated = false;

    // SELECT BEATMAKER CONTROLS

    this.deleteBtn = document.querySelector(".delete-btn");
    this.saveBtn = document.querySelector(".save-btn");
    this.tempoSlider = document.querySelector(".tempo-slider");
    this.bpmText = document.querySelector(".bpm-text");
    this.pauseBtn = document.querySelector(".pause-btn");
    this.playBtn = document.querySelector(".play-btn");
    this.stopBtn = document.querySelector(".stop-btn");

    // ADD EVENT LISTENERS

    document.addEventListener("DOMContentLoaded", () => {
      this.importLib();
    });

    this.playBtn.addEventListener("click", () => {
      this.play();
    });

    this.stopBtn.addEventListener("click", () => {
      this.stop();
    });

    this.pauseBtn.addEventListener("click", () => {
      this.pause();
    });

    this.tempoSlider.addEventListener("change", (e) => {
      this.updateTempo(e);
    });

    this.tempoSlider.addEventListener("input", (e) => {
      this.changeTempo(e);
    });

    this.deleteBtn.addEventListener("click", () => {
      this.deleteSelection();
    });
  }

  async importLib() {
    // DATA FECTH FROM LOCAL URL: './sounds-lib.json'

    const dataFetch = await fetch("./sounds-lib.json");
    const data = await dataFetch.json();
    data.forEach((data) => {
      let label = data.split("-")[0];
      this.lib.push({
        name: data,
        source: `./sounds-library/${data}`,
        label: label,
      });
    });
    this.render();
  }

  play() {
    if (this.isPlaying) {
      return;
    }

    if (this.isPaused) {
      this.repeater(this.currentStep);
    }

    if (this.isStopped) {
      this.repeater(this.index);
    }

    if (this.tempoUpdated) {
      this.repeater(this.currentStep);
    }

    this.isPlaying = true;
    this.isStopped = false;
    this.isPaused = false;
    this.tempoUpdated = false;
  }

  repeater(actualStep) {
    // Access Track property padNum to create a repeater function that counts from 0 to padNum value

    const padNum = this.tracks[0].padNum;

    this.step = actualStep % padNum;

    this.repeat = setInterval(() => {
      this.activeBar(this.step);
      if (!this.isPaused) {
        console.log(this.step);
        this.step++;
        if (this.step === padNum) {
          this.step = 0;
        }
      } else {
        this.activeBar(this.currentStep);
        console.log(this.currentStep);
        this.currentStep++;
        if (this.currentStep === padNum) {
          this.currentStep = 0;
        }
      }
    }, (60 / this.bpmInput) * 1000);
  }

  activeBar(step) {
    console.log("active bar step");
    this.tracks.forEach((track) => {
      track.pads.forEach((pad) => {
        if (pad.container.classList.contains(`p${step}`)) {
          pad.container.classList.add("bar");
          if (pad.container.classList.contains("active-pad")) {
            pad.audioPlayer.play();
          }
        } else {
          pad.container.classList.remove("bar");
        }
      });
    });
  }

  stop() {
    this.isStopped = true;
    this.isPlaying = false;
    clearInterval(this.repeat);
    console.log("stop");
  }

  pause() {
    this.isPaused = true;
    this.isPlaying = false;
    clearInterval(this.repeat);

    // Record current step to be passed to play() [with pause, we don't want to start at the begining]

    this.currentStep = this.step;
    console.log("pause", this.isPaused);
  }

  changeTempo(e) {
    this.bpmText.textContent = e.target.value;
  }

  updateTempo(e) {
    this.bpmInput = e.target.value;

    if (this.isPlaying) {
      this.tempoUpdated = true;

      this.isPlaying = false;
      clearInterval(this.repeat);

      this.currentStep = this.step;
      this.play();
    }
  }

  deleteSelection() {
    this.tracks.forEach((track) => {
      track.pads.forEach((pad) => {
        if (pad.container.classList.contains("muted-pad")) {
          pad.container.classList.remove("muted-pad");
        }
        if (pad.container.classList.contains("active-pad")) {
          pad.container.classList.remove("active-pad");
        }
      });
    });
  }

  render() {
    let trackList = [];

    this.lib.forEach((item) => {
      trackList.push(item.label);
    });

    trackList = new Set(trackList);

    trackList.forEach((trackItem) => {
      const track = new Track();
      track.parentBeatMaker = this;
      track.name = trackItem;
      track.currentSound = this.lib.find((sound) =>
        sound.name.includes(trackItem)
      ).source;
      track.render();
      this.tracks.push(track);
    });
  }
}

// CREATE AND INITIALIZE THE BEATMAKER

const beatMaker = new BeatMaker();

// ANIMATE PAGE UI

const timeline = gsap.timeline({ defaults: { duration: 1 } });
timeline
  .from("header", { y: "-100%", ease: "bounce" })
  .fromTo(".beatmaker-tools, .media-controls", { opacity: 0 }, { opacity: 1 })
  .from("footer", { y: "100", ease: "elastic" });
