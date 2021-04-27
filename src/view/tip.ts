import createElement from '../helpers/create-element';

export default class Tip {
  element: HTMLElement;
  constructor() {
    this.element = createElement('span', ['slider-tip']);
  }

  displayValue(value: number) {
    this.element.textContent = String(value);
  }
}