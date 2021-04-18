import createElement from '../helpers/create-element';
import type { ModelInterface } from '../model/modelInterface';
import Track from './track';
import Thumb from './thumb';

export default class View {
  app: HTMLElement | null;
  thumb: Thumb;
  track: Track;
  slider: HTMLElement;

  constructor() {
    this.app = document.querySelector('#root');
    this.slider = createElement('div');
    this.thumb = new Thumb();
    this.track = new Track();
  }

  render(props: ModelInterface) {
    const {
      min,
      max,
      step,
      from,
      to,
      vertical,
      tip,
      range,
      connect,
      scale,
    } = props;
    this.app?.append(this.slider);
    if (vertical) {
      this.slider.classList.add('slider-vertical');
      this.track.element.classList.add('track-vertical');
      this.thumb.element.classList.add('thumb-vertical');
    } else {
      this.slider.classList.add('slider');
      this.track.element.classList.add('track');
      this.thumb.element.classList.add('thumb-horizontal');
    }

    this.slider.append(this.track.element, this.thumb.element);
  }
}
