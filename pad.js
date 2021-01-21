// PAD - SMALLEST BEATMAKER UNIT
class Pad {
  constructor(selectedSound) {
    this.selectedSound = selectedSound;
    this.tag = document.createElement("div");
    this.tag.classList.add("pad");
    this.sound = document.createElement("audio");
    // this.sound.classList.add(`clap-sound`);
    // this.sound.src = selectedSound;
    // MOVE THE ABOVES IN THE TRACKS
    this.tag.appendChild(this.sound);
  }
}
