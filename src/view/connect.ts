import createElement from '../helpers/create-element';

export default class Connect {
  element!: HTMLElement | null;
  constructor() {
    this.element = null;
  }

  create(vertical: boolean) {
    this.element = createElement('div', ['slider-connect']);
    if (vertical) {
      this.element.classList.add('slider-connect--vertical');
    } else {
      this.element.classList.add('slider-connect--horizontal');
    }

    return this.element
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
