const CLEAR_DELAY = 10 * 1000;

export class TextDisplay {
  constructor(container) {
    this.container = container;
    this.timeout = null;
  }

  addLine(text) {
    clearTimeout(this.timeout);

    this.container.innerText = text;
    this.timeout = setTimeout(() => this.container.innerText = '', CLEAR_DELAY);
  }
}
