import createElement from '../helpers/create-element';
import Track from './track';
import Thumb from './thumb';

export default class View {
  app: HTMLElement | null;
  thumb: Thumb;
  track: Track;
  slider: HTMLElement;
  constructor() {
    this.app = document.querySelector('#root');
    this.slider = createElement('div', 'slider');
    this.thumb = new Thumb();
    this.track = new Track();
    this.app?.append(this.slider);
    this.slider.append(this.track.element, this.thumb.element);
  }
}
