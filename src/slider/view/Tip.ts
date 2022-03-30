import createElement from '../../helpers/create-element';

class Tip {
  element: HTMLElement;

  render(vertical: boolean, parent: HTMLElement) {
    this.element = createElement('span', ['slider__tip']);
    if (vertical) {
      this.element.classList.add('slider__tip_type_vertical');
    } else {
      this.element.classList.add('slider__tip_type_horizontal');
    }
    parent.append(this.element);
  }

  displayValue(value: string) {
    this.element.textContent = String(value);
  }
}

export default Tip;
