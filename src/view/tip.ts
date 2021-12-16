import createElement from '../helpers/create-element';

export default class Tip {
  element: HTMLElement | undefined;
  constructor() {
    this.element = undefined;
  }

  create(vertical: boolean) {
    this.element = createElement('span', ['slider-tip']);
    if (vertical) {
      this.element.classList.add('slider-tip--vertical');
    } else {
      this.element.classList.add('slider-tip--horizontal');
    }
    return this.element;
  }

  displayValue(value: string) {
    if (this.element) {
      this.element.textContent = String(value);
    }
  }
}
