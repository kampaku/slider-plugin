import createElement from '../helpers/create-element';

class Track {
  element: HTMLElement | undefined;

  create(vertical: boolean) {
    this.element = createElement('div');
    if (vertical) {
      this.element.classList.add('track-vertical');
    } else {
      this.element.classList.add('track');
    }
    return this.element;
  }
}

export default Track;