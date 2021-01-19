// BEATMAKER - A GROUP OF DIFFERENT TRACKS
class BeatMaker {
  constructor() {
    this.container = document.querySelector(".beatmaker");
    this.trackList = [];

    // PLAYER VARIABLES
    this.bpm = 300;
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
      const selects = document.querySelectorAll(".custom-select-wrapper");

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
        }, this.bpm);
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

      const toggleSelect = (e) => {
        const options = e.target.lastElementChild;
        options.classList.toggle("toggle-select");
        console.log(options, "hello");
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

      selects.forEach((select) => {
        select.addEventListener("click", (e) => {
          toggleSelect(e);
        });
      });

      document.addEventListener("DOMContentLoaded", addSound());
    });

    // SELECT INTERACTIVE UI
    this.deleteBtn = document.querySelector(".delete-btn");
    this.saveBtn = document.querySelector(".save-btn");
    this.tempoSlider = document.querySelector(".tempo-slider");
    this.bpmText = document.querySelector(".bpm-text");
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

// CREATE AND INITIALIZE THE BEATMAKER
const beatMaker = new BeatMaker();
beatMaker.beatMakerInit();
