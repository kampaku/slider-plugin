import createElement from '../helpers/create-element';

class Track {
  element: HTMLElement | undefined;

  render(vertical: boolean, parent: HTMLElement) {
    this.element = createElement('div');
    if (vertical) {
      this.element.classList.add('track-vertical');
    } else {
      this.element.classList.add('track');
    }
    parent.append(this.element);
  }
}

export default Track;