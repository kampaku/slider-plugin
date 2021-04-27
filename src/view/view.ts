import createElement from '../helpers/create-element';
import type { ModelInterface } from '../model/modelInterface';
import Track from './track';
import Thumb from './thumb';

export default class View {
  app: HTMLElement | null;
  thumbFrom: Thumb;
  thumbTo: Thumb;
  track: Track;
  sliderContainer: HTMLElement;

  constructor() {
    this.app = document.querySelector('#root');
    this.sliderContainer = createElement('div');
    this.thumbFrom = new Thumb();
    this.thumbTo = new Thumb();
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
    this.app?.append(this.sliderContainer);
    if (vertical) {
      this.sliderContainer.classList.add('slider-vertical');
      this.track.element.classList.add('track-vertical');
      this.thumbFrom.element.classList.add('thumb-vertical');
      this.thumbTo.element.classList.add('thumb-vertical');
    } else {
      this.sliderContainer.classList.add('slider');
      this.track.element.classList.add('track');
      this.thumbFrom.element.classList.add('thumb-horizontal');
      this.thumbTo.element.classList.add('thumb-horizontal');
    }

    if (range) this.track.element.append(this.thumbTo.element)

    this.sliderContainer.append(this.track.element);
    this.track.element.append(this.thumbFrom.element);
  }
}
