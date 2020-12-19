class BeatMaker {
  constructor() {
    this.pads = document.querySelectorAll(".pad");
    this.index = 0;
  }
  soundLoop() {
    let speed = 300;
    this.pads.forEach((pad) => {
      this.pads.forEach((pad) => {
        if (pad.classList.contains(`b${this.index}`)) {
          setInterval(() => {
            setTimeout(() => {
              console.log(pad, this.index);
              if (pad.style.transform === "scale(1)") {
                pad.style.transform = "scale(1.2)";
              } else {
                pad.style.transform = "scale(1)";
              }
            }, this.index * speed);
          }, speed * 8);
        }
      });
      this.index++;
    });
  }
}

const beatMaker = new BeatMaker();
beatMaker.soundLoop();
