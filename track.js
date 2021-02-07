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

  changeSound(e) {
    this.currentSound = `./sounds-library/${e.target.value}`;
    this.pads.forEach((pad) => {
      pad.updateSound(this.currentSound);
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

    this.addCustomEventListener(`.${this.name}-select`, "change", (e) => {
      this.changeSound(e);
    });

    // Animate Track with GSAP

    this.animateTrack();
  }
}
