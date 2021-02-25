class MyBeat {
  constructor() {
    this.name = null;
    this.url = "";

    this.parent = document.querySelector(".my-collection");
  }

  render() {
    const container = document.createElement("LI");
    container.innerHTML = `<button>${this.name}</button>`;
    container.addEventListener("click", (e) => {
      beatMaker.deleteSelection();
      beatMaker.loadSelection(this);
    });
    this.parent.appendChild(container);
  }
}
