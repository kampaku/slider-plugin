import createElement from '../helpers/create-element';


export default class Connect {
  element: HTMLElement;
  constructor() {
    this.element = createElement('div', ['slider-connect']);
  }

  setPosition(startConnect: string, endConnect: string, startPosition: string, endPosition: string) {
    this.element.style[startConnect] = startPosition;
    this.element.style[endConnect] = endPosition;
  }
}