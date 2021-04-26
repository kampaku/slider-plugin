import createElement from '../helpers/create-element';

export default class Thumb {
  element: HTMLElement;
  constructor() {
    this.element = createElement('div', ['thumb']);
  }

  addListener(func: (event: MouseEvent, thumb: Thumb) => void) {
    this.element.addEventListener('mousedown', (event) => func(event, this));
  }
}
