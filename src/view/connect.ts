import createElement from '../helpers/create-element';

export default class Connect {
  element!: HTMLElement;
  constructor() {
    this.element;
  }

  render(vertical: boolean) {
    this.element = createElement('div', ['slider-connect']);
    if (vertical) {
      this.element.classList.add('slider-connect--vertical');
    } else {
      this.element.classList.add('slider-connect--horizontal');
    }
  }

  setPosition(
    startConnect: string,
    endConnect: string,
    startPosition: string,
    endPosition: string,
  ) {
    if (this.element) {
      this.element.style[startConnect as 'top' | 'left' ] = startPosition;
      this.element.style[endConnect as 'bottom' | 'right' ] = endPosition;
    }
  }
}
