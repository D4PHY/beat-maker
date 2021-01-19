class Select {
  constructor(soundName) {
    // CREATE CUSTOM SELECT
    this.soundName = soundName;
    this.customSelectWrapper = document.createElement("div");
    this.customSelectWrapper.classList.add("custom-select-wrapper");
    this.customSelectWrapper.innerHTML = `<div class="custom-select-input">
          <div class="actual-select-input">
            <label for="${this.soundName}-select">${this.soundName}</label>
            <input type="text" class="custom-select" id="${this.soundName}-select" />
          </div>
          <i class="custom-select-arrow fas fa-chevron-down"></i>
          </div>
        </div>`;
    // GENERATE DATA FOR SELECTS
    this.ul = document.createElement("ul");
    this.ul.classList.add("custom-select-options");
    this.ul.setAttribute("data-simplebar", "");
    lib.forEach((sound) => {
      if (sound.label === this.soundName) {
        const li = document.createElement("li");
        const soundNameClean = sound.name.split(".")[0];
        li.innerHTML = `${soundNameClean}<i class="custom-select-arrow fas fa-angle-down"></i>`;
        this.ul.appendChild(li);
      }
    });
    this.customSelectWrapper.appendChild(this.ul);
  }
}
