import createElement from '../../helpers/create-element';

class Track {
  element: HTMLElement | undefined;

  render(vertical: boolean, parent: HTMLElement) {
    this.element = createElement('div', ['slider__track']);
    if (vertical) {
      this.element.classList.add('slider__track_type_vertical');
    } else {
      this.element.classList.add('slider__track_type_horizontal');
    }
    parent.append(this.element);
  }
}

export default Track;
