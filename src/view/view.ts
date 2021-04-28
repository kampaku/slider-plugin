import createElement from '../helpers/create-element';
import type { ModelInterface } from '../model/modelInterface';
import Track from './track';
import Thumb from './thumb';
import Tip from './tip';
import Connect from './connect';

export default class View {
  app: HTMLElement | null;
  thumbFrom: Thumb;
  thumbTo: Thumb;
  tipFrom: Tip;
  tipTo: Tip;
  track: Track;
  connect: Connect;
  sliderContainer: HTMLElement;

  constructor() {
    this.app = document.querySelector('#root');
    this.sliderContainer = createElement('div');
    this.thumbFrom = new Thumb();
    this.thumbTo = new Thumb();
    this.tipFrom = new Tip();
    this.tipTo = new Tip();
    this.track = new Track();
    this.connect = new Connect();
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
      this.tipFrom.element.classList.add('slider-tip--vertical')
      this.tipTo.element.classList.add('slider-tip--vertical')
      this.connect.element.classList.add('slider-connect--vertical')
    } else {
      this.sliderContainer.classList.add('slider');
      this.track.element.classList.add('track');
      this.thumbFrom.element.classList.add('thumb-horizontal');
      this.thumbTo.element.classList.add('thumb-horizontal');
      this.tipFrom.element.classList.add('slider-tip--horizontal')
      this.tipTo.element.classList.add('slider-tip--horizontal')
      this.connect.element.classList.add('slider-connect--horizontal')
    }

    this.sliderContainer.append(this.track.element);
    this.track.element.append(this.thumbFrom.element);

    if (range) {
      this.track.element.append(this.thumbTo.element);
      if (tip) this.thumbTo.element.append(this.tipTo.element);
    }

    if (tip) {
      this.thumbFrom.element.append(this.tipFrom.element);
    }

    if (connect) {
      this.track.element.append(this.connect.element)
    }
  }
}
