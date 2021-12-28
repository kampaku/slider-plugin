import createElement from '../helpers/create-element';

class Tip {
  element: HTMLElement | undefined;
  constructor() {
    this.element = undefined;
  }

  render(vertical: boolean, parent: HTMLElement) {
    this.element = createElement('span', ['slider-tip']);
    if (vertical) {
      this.element.classList.add('slider-tip--vertical');
    } else {
      this.element.classList.add('slider-tip--horizontal');
    }
    parent.append(this.element);
  }

  displayValue(value: string) {
    if (this.element) {
      this.element.textContent = String(value);
    }
  }
}

export default Tip;
