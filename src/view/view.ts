import createElement from '../helpers/create-element';
import type { SettingsInterface } from '../helpers/SettingsInterface';
import type Model from '../model/model';
import Track from './track';
import Thumb from './thumb';
import Tip from './tip';
import Connect from './connect';
import Scale from './scale';
import Observable from '../helpers/Observable';

interface Option {
  vertical: boolean,
  tip: boolean,
  range: boolean,
  connect: boolean,
  scale: boolean,
}

export default class View extends Observable {
  app: JQuery<HTMLElement> | null;
  thumbFrom: Thumb | undefined;
  thumbTo: Thumb | undefined;
  tipFrom: Tip;
  tipTo: Tip;
  track: Track;
  connect: Connect;
  sliderContainer!: HTMLElement;
  scale: Scale;

  constructor(root: JQuery) {
    super()
    this.app = root;
    // this.sliderContainer;

    this.track = new Track();
    this.tipFrom = new Tip();
    this.tipTo = new Tip();
    this.connect = new Connect();
    this.scale = new Scale();
  }

  render(props: SettingsInterface) {
    const {
      vertical,
      tip,
      range,
      connect,
      scale,
    } = props;

    this.thumbFrom = new Thumb(this.notify.bind(this), props);


    this.sliderContainer = createElement('div');
    this.app?.append(this.sliderContainer);
    this.track.render(vertical);
    this.thumbFrom.render(vertical);
    this.thumbFrom.element.dataset.thumb = 'from';
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
      this.tipFrom.displayValue(props.from)
      this.thumbFrom.element.append(tipFromElement);
    }
    if (range) {
      this.thumbTo = new Thumb(this.notify.bind(this), props);
      this.thumbTo.render(vertical);
      this.thumbTo.element.dataset.thumb = 'to';
      // this.thumbTo.slide(this.sliderContainer)
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
    console.log(this.thumbFrom.element);
  }

  destroy() {
    this.sliderContainer.remove();
  }
}
