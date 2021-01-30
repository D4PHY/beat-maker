//CODE FROM INSIDE BEATMAKER CONTRUCTOR
// SELECT BEATMAKER COMPONENTS (DATA AVAILABLE AFTER FETCHING IS DONE)
const allPads = document.querySelectorAll(".pad");
const audios = document.querySelectorAll("audio");
const selects = document.querySelectorAll("select");

// BEATMAKER FUNCTS.
const repeater = (actualStep) => {
  this.step = actualStep % this.padNum;
  this.repeat = setInterval(() => {
    activeBar(this.step);
    playSound();
    if (!this.isPaused) {
      console.log(this.step);
      this.step++;
      if (this.step === this.padNum) {
        this.step = 0;
      }
    } else {
      activeBar(this.currentStep);
      console.log(this.currentStep);
      this.currentStep++;
      if (this.currentStep === this.padNum) {
        this.currentStep = 0;
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

const addSounds = () => {
  audios.forEach((audio) => {
    const track = audio.closest(".track");
    const select = track.getElementsByTagName("SELECT");
    this.currentSound = select[0].options[select[0].options.selectedIndex];
    audio.src = `./sounds-library/${this.currentSound.value}`;
    audio.type = "audio/wav";
  });
};

const changeSound = (e) => {
  const selection = e.target.value;
  this.currentSound = `./sounds-library/${selection}`;
  const pads = e.target.nextElementSibling.children;
  // pads.forEach((pad) => {
  //   console.log(pad.audio);
  // });
  console.log(pads);
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
  select.addEventListener("change", (e) => {
    changeSound(e);
  });
});

document.addEventListener("DOMContentLoaded", addSounds());

////////////
///
// Animate Tracks

gsap.to(".track", {
  duration: 0.08,
  opacity: 1,
  delay: 1.5,
  stagger: 0.04,
});

// // ANIMATE PAGE UI
// const timeline = gsap.timeline({ defaults: { duration: 1 } });
// timeline
//   .from("header", { y: "-100%", ease: "bounce" })
//   .fromTo(".beatmaker-tools, .media-controls", { opacity: 0 }, { opacity: 1 })
//   .from("footer", { y: "100", ease: "elastic" });
