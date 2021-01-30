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
  }

  render() {
    // Create Track
    this.container = document.createElement("DIV");
    this.container.classList.add("track", this.name);

    // Create Select inside Track
    this.select = new Select();
    this.select.parentTrack = this;
    this.select.render();

    // Create Pads inside Track
    this.padsContainer = document.createElement("DIV");
    this.padsContainer.classList.add("pads");
    for (let i = 0; i < this.padNum; i++) {
      const pad = new Pad();
      pad.parentTrack = this;
      pad.render();
      this.pads.push(pad);
    }
    this.container.appendChild(this.padsContainer);

    // Create Mute Buttons inside Track
    this.muteBtnContainer = document.createElement("DIV");
    this.muteBtnContainer.classList.add("mute-btn", `${this.name}-mute-btn`);
    this.muteBtnContainer.innerHTML = `<button class="volume-off-btn"></button>`;
    this.container.appendChild(this.muteBtnContainer);

    this.parentBeatMaker.container.appendChild(this.container);
    console.log("blah", this.parentBeatMaker);

    // Add Event Listeners
    ////
    ///
    // Adding Event Listeners to the future DOM Elements using Event Bubbling (Event Delegation):
    this.addCustomEventListener(`option.opt-${this.name}`, "click", (e) => {
      this.changeSound(e);
    });
  }

  addCustomEventListener(selector, event, handler) {
    const domElement = document.querySelector(".beatmaker");
    domElement.addEventListener(
      event,
      function (e) {
        let targetElement = e.target;
        while (targetElement != null) {
          if (targetElement.matches(selector)) {
            handler(e);
            return;
          }
          targetElement = targetElement.parentElement;
        }
      },
      true
    );
  }

  changeSound(e) {
    console.log(this.currentSound);
    this.currentSound = `./sounds-library/${e.target.value}`;
    console.log(this.currentSound);
  }
}
