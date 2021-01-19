// PAD - SMALLEST BEATMAKER UNIT
class Pad {
  constructor() {
    this.tag = document.createElement("div");
    this.tag.classList.add("pad");
    this.sound = document.createElement("audio");
    // this.sound.classList.add(`clap-sound`);
    // this.sound.src = "./sounds-library/clap-808.wav";
    // MOVE THE ABOVES IN THE TRACKS
    this.tag.appendChild(this.sound);
  }
}
