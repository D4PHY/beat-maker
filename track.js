// TRACK - A GROUP OF PADS WITH THE SAME SOUND
class Track {
  constructor(name) {
    this.name = name;
    this.tag = document.createElement("div");
    this.tag.classList.add("track", this.name);

    // GENERATE SELECT
    this.select = new Select(this.name);
    this.tag.appendChild(this.select.customSelectWrapper);

    // GENERATE PADS
    this.pads = document.createElement("div");
    this.pads.classList.add("pads");
    this.padInit();
    this.tag.appendChild(this.pads);

    // GENERATE MUTE BTN
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
