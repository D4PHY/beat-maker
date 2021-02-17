class MyBeat {
  constructor() {
    this.container = null;
    this.parent = document.querySelector(".navigation ul");
    this.padsSequence = [];
    this.name = null;
  }

  render(myBeatsName) {
    this.container = document.createElement("LI");
    this.container.innerHTML = `<button>${this.name}</button>`;
    this.container.addEventListener("click", (e) => {
      beatMaker.deleteSelection();
      beatMaker.repaintBeatMaker(this.padsSequence);
    });
    this.parent.appendChild(this.container);
  }
}
