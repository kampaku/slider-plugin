import createElement from '../helpers/create-element'; 

export default class Thumb {
  element: HTMLElement;
  constructor() {
    this.element = createElement('div', 'thumb');
  }
}