import createElement from '../helpers/create-element';

export default class Track {
  element!: HTMLElement
  constructor() {
    this.element;
  }

  render(vertical: boolean) {
    this.element = createElement('div');
    if (vertical) {
      this.element.classList.add('track-vertical');
    } else {
      this.element.classList.add('track');
    }
  }
}