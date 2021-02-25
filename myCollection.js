class MyCollection {
  constructor() {
    this.myBeatIndex = 1;
    this.myBeatCollection = [];
  }

  saveToCollection() {
    const myBeat = new MyBeat();
    myBeat.parent = this;
    myBeat.render();

    this.myBeatCollection.push(myBeat);
  }

  render() {
    this.saveToCollection();

    this.myBeatCollection.forEach((song) => {});
  }
}
