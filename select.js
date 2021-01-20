class Select {
  constructor(soundName) {
    // CREATE CUSTOM SELECT
    this.soundName = soundName;
    this.tag = document.createElement("SELECT");
    this.tag.classList.add(`${this.soundName}-sound-select`);
    this.tag.name = `${this.soundName}-sound`;

    // GENERATE DATA FOR SELECTS
    lib.forEach((item) => {
      if (item.label === this.soundName) {
        const option = document.createElement("OPTION");
        option.value = item.name;
        const optionContent = item.name.split(".")[0];
        option.textContent = optionContent;
        this.tag.appendChild(option);
      }
    });
  }
}
