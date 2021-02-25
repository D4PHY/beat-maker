// TRACK - A GROUP OF PADS WITH THE SAME SOUND

class Track {
  constructor() {
    this.name = null;
    this.parentBeatMaker = null;
    this.padNum = 32;
    this.pads = [];
    this.container = null;
    this.select = null;
    this.currentSound = null;
    this.currentSoundIndex = 0;
  }

  changeSound(e) {
    this.currentSound = `./sounds-library/${e.target.value}`;
    this.pads.forEach((pad) => {
      pad.updateSound(this.currentSound);
    });

    // Update currentSoundIndex

    this.updateCurrentSoundIndex(e.target.value);
  }

  updateCurrentSoundIndex(newVal) {
    this.select.selectOptions.forEach((option, optionIndex) => {
      if (option.value === newVal) {
        this.currentSoundIndex = optionIndex;
      }
    });
  }

  muteTrack(e) {
    this.pads.forEach((pad) => {
      if (!pad.container.classList.contains("muted-pad")) {
        e.target.classList.add("mute-btn-active");
        pad.container.classList.add("muted-pad");
        pad.audioPlayer.volume = 0;
      } else {
        e.target.classList.remove("mute-btn-active");
        pad.container.classList.remove("muted-pad");
        pad.audioPlayer.volume = 1;
      }
    });
  }

  animateTrack() {
    gsap.to(".track", {
      duration: 0.08,
      opacity: 1,
      delay: 1.5,
      stagger: 0.04,
    });
  }

  render() {
    // Create Track

    this.container = document.createElement("DIV");
    this.container.classList.add("track", this.name);

    // Create Select inside Track

    this.select = new Select();
    this.select.parentTrack = this;
    this.select.render();
    this.select.onChange((e) => {
      this.changeSound(e);
    });

    // Create Pads inside Track

    this.padsContainer = document.createElement("DIV");
    this.padsContainer.classList.add("pads");
    for (let i = 0; i < this.padNum; i++) {
      const pad = new Pad();
      pad.parentTrack = this;
      pad.render();
      pad.container.classList.add(`p${i}`);
      this.pads.push(pad);
    }

    this.container.appendChild(this.padsContainer);

    // Create Mute Buttons inside Track

    this.muteBtnContainer = document.createElement("DIV");
    this.muteBtnContainer.classList.add("mute-btn", `${this.name}-mute-btn`);
    this.muteBtnContainer.innerHTML = `<button class="volume-off-btn"></button>`;
    this.container.appendChild(this.muteBtnContainer);

    this.parentBeatMaker.container.appendChild(this.container);

    // Adding Event Listeners to a future DOM Element using Event Bubbling (Event Delegation):

    // Mute Track

    addDelegatedEvent(`.${this.name}-mute-btn`, "click", (e) => {
      this.muteTrack(e);
    });

    // Animate Track with GSAP

    this.animateTrack();
  }
}
