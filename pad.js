// PAD - SMALLEST BEATMAKER UNIT
class Pad {
  constructor() {
    this.selectedSound = null;
    this.container = null;
    this.parentTrack = null;
    this.audioPlayer = null;
    this.activated = false;
  }

  toggleActivated() {
    if (this.activated) {
      this.container.classList.remove("active-pad");
    } else {
      this.container.classList.add("active-pad");
    }
  }

  updateSound(soundName) {
    this.audioPlayer.src = soundName;
  }

  render() {
    this.container = document.createElement("div");
    this.container.classList.add("pad");
    this.audioPlayer = document.createElement("audio");
    this.container.appendChild(this.audioPlayer);
    this.container.addEventListener("click", () => {
      this.toggleActivated();
    });
    this.parentTrack.container.appendChild(this.container);
  }
}
