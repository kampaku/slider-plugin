import createElement from '../helpers/create-element';

export default class Thumb {
  element!: HTMLElement;
  constructor() {
    this.element;
  }

  render(vertical: boolean) {
    this.element = createElement('div', ['thumb']);
    if (vertical) {
      this.element.classList.add('thumb-vertical');
    } else {
      this.element.classList.add('thumb-horizontal');
    }
  }

  addListener(func: (event: PointerEvent, thumb: Thumb) => void) {
    this.element.addEventListener('pointerdown', (event) => func(event, this));
  }

  move(orientation: string, value: string) {
    this.element.setAttribute('style', `${orientation}: ${value}`);
  }
}