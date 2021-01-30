// BEATMAKER - A GROUP OF DIFFERENT TRACKS
class BeatMaker {
  constructor() {
    // BEATMAKER VARIABLES
    this.container = document.querySelector(".beatmaker");
    this.lib = [];

    // PLAYER VARIABLES
    this.bpm = 300;
    this.index = 0;
    this.step = null;
    this.currentStep = null;
    this.repeat = null;
    this.isPlaying = null;
    this.isPaused = null;

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
