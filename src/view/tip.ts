import createElement from '../helpers/create-element';

export default class Tip {
  element!: HTMLElement;
  constructor() {
    this.element;
  }

  render(vertical: boolean) {
    this.element = createElement('span', ['slider-tip']);
    if (vertical) {
      this.element.classList.add('slider-tip--vertical');
    } else {
      this.element.classList.add('slider-tip--horizontal');
    }
  }

  displayValue(value: number) {
    this.element.textContent = String(value);
  }
}
