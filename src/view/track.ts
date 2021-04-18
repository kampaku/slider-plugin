import createElement from '../helpers/create-element';

export default class Track {
  element: HTMLElement
  constructor() {
    this.element = createElement('div');
  }
}