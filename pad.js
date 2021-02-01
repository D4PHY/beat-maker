// PAD - SMALLEST BEATMAKER UNIT

class Pad {
  constructor() {
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
      this.activated = true;
    }
  }

  updateSound(newSound) {
    this.audioPlayer.src = newSound;
    console.log("update sound funct");
  }

  render() {
    this.container = document.createElement("DIV");
    this.container.classList.add("pad");
    this.audioPlayer = document.createElement("AUDIO");
    this.audioPlayer.src = this.parentTrack.currentSound;
    this.container.appendChild(this.audioPlayer);
    this.container.addEventListener("click", () => {
      this.toggleActivated();
    });
    this.parentTrack.padsContainer.appendChild(this.container);
  }
}
