import createElement from '../helpers/create-element';
import type { ModelInterface } from '../model/modelInterface';
import type Model from '../model/model';
import Track from './track';
import Thumb from './thumb';
import Tip from './tip';
import Connect from './connect';
import Scale from './scale';

interface Option {
  vertical: boolean,
  tip: boolean,
  range: boolean,
  connect: boolean,
  scale: boolean,
}

export default class View {
  app: JQuery<HTMLElement> | null;
  thumbFrom: Thumb;
  thumbTo: Thumb;
  tipFrom: Tip;
  tipTo: Tip;
  track: Track;
  connect: Connect;
  sliderContainer!: HTMLElement;
  scale: Scale;

  constructor(root: JQuery) {
    this.app = root;
    // this.sliderContainer;
    this.thumbFrom = new Thumb();
    this.track = new Track();
    this.thumbTo = new Thumb();
    this.tipFrom = new Tip();
    this.tipTo = new Tip();
    this.connect = new Connect();
    this.scale = new Scale();
  }

  render(props: Option) {
    const {
      vertical,
      tip,
      range,
      connect,
      scale,
    } = props;
    this.sliderContainer = createElement('div');
    this.app?.append(this.sliderContainer);
    this.track.render(vertical);
    this.thumbFrom.render(vertical);
    this.thumbFrom.slide(this.sliderContainer)
    if (vertical) {
      this.sliderContainer.classList.add('slider-vertical');
    } else {
      this.sliderContainer.classList.add('slider');
    }
    this.sliderContainer.append(this.track.element);

    this.track.element.append(this.thumbFrom.element);
    if (tip) {
      const tipFromElement = this.tipFrom.render(vertical);
      this.thumbFrom.element.append(tipFromElement);
    }
    if (range) {

      this.thumbTo.render(vertical);
      this.thumbTo.slide(this.sliderContainer)
      this.track.element.append(this.thumbTo.element);
      if (tip) {
        const tipToElement = this.tipTo.render(vertical);
        this.thumbTo.element.append(tipToElement);
      }
    }
    if (connect) {
      let connectEl = this.connect.create(vertical);
      this.track.element.append(connectEl);
    }

    if (scale) {
      this.scale.render(vertical);
      this.sliderContainer.append(this.scale.element);
    }
    this.thumbFrom.width(this.sliderContainer)
  }

  destroy() {
    this.sliderContainer.remove();
  }
}
