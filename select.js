class Select {
  constructor() {
    this.container = null;
    this.parentTrack = null;
  }

  render() {
    this.container = document.createElement("SELECT");

    // GENERATE DATA FOR SELECTS

    this.parentTrack.parentBeatMaker.lib.forEach((sound) => {
      if (sound.label === this.parentTrack.name) {
        const option = document.createElement("OPTION");
        option.classList.add(`opt-${this.parentTrack.name}`);
        option.value = sound.name;
        const optionContent = sound.name.split(".")[0];
        option.textContent = optionContent;
        this.container.appendChild(option);
      }
    });
    this.parentTrack.container.appendChild(this.container);
  }
}
