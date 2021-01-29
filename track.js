// TRACK - A GROUP OF PADS WITH THE SAME SOUND
class Track {
  constructor(name) {
    this.name = name;
    this.pads = [];
    this.container = null;
    this.parentBeatMaker = null;
    this.select = null;
    this.currentSound = null;
  }

  render() {
    this.container = document.createElement("div");
    this.container.classList.add("track", this.name);

    // GENERATE SELECT
    this.select = new Select(this.name);
    this.container.appendChild(this.select.tag);

    // GENERATE PADS
    this.padsContainer = document.createElement("div");
    this.padsContainer.classList.add("pads");
    this.padInit();
    this.container.appendChild(this.padsContainer);

    // GENERATE MUTE BTN
    this.muteBtnContainer = document.createElement("div");
    this.muteBtnContainer.classList.add("mute-btn", `${this.name}-mute-btn`);
    this.muteBtnContainer.innerHTML = `<button class="volume-off-btn"></button>`;
    this.container.appendChild(this.muteBtnContainer);
    console.log(this.parentBeatMaker);
    this.parentBeatMaker.appendChild(this.container);
  }

  padInit() {
    for (let i = 0; i < padNum; i++) {
      const pad = new Pad();
      pad.parentTrack = this;
      pad.render();
      this.pads.push(pad);
    }
  }

  activatePad(pad) {
    pad.classList.toggle("pad-active");
  }
}
