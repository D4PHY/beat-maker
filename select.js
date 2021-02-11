class Select {
  constructor() {
    this.container = null;
    this.parentTrack = null;
  }

  onChange(callback) {
    this.container.addEventListener("change", callback);
  }

  render() {
    this.container = document.createElement("SELECT");
    this.container.classList.add(`${this.parentTrack.name}-select`);

    // Generate data for selects

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
