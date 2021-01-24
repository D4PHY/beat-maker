// TRACK - A GROUP OF PADS WITH THE SAME SOUND
class Track {
  constructor(name) {
    this.name = name;
    this.pads = [];
    this.tag = document.createElement("div");
    this.tag.classList.add("track", this.name);

    // GENERATE SELECT
    this.select = new Select(this.name);
    this.tag.appendChild(this.select.tag);

    // GENERATE PADS
    this.container = document.createElement("div");
    this.container.classList.add("pads");
    this.padInit();
    this.tag.appendChild(this.container);

    // GENERATE MUTE BTN
    this.muteBtnContainer = document.createElement("div");
    this.muteBtnContainer.classList.add("mute-btn", `${this.name}-mute-btn`);
    this.muteBtnContainer.innerHTML = `<button class="volume-off-btn"></button>`;
    this.tag.appendChild(this.muteBtnContainer);
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
