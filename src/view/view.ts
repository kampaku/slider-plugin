import createElement from '../helpers/create-element';
import Track from './Track';
import Thumb from './Thumb';
import Tip from './Tip';
import Connect from './Connect';
import Scale from './Scale';
import Observable from '../helpers/Observable';

class View extends Observable {
  root: JQuery<HTMLElement> | null;
  thumbFrom: Thumb | undefined;
  thumbTo: Thumb | undefined;
  tipFrom: Tip | undefined;
  tipTo: Tip | undefined;
  track: Track;
  connect: Connect | undefined;
  sliderContainer!: HTMLElement;
  scale: Scale | undefined;

  constructor(root: JQuery) {
    super();
    this.root = root;
    this.track = new Track();
  }

  render(props: SettingsInterface) {
    const { vertical, tip, range, connect, scale } = props;

    this.sliderContainer = createElement('div');

    this.thumbFrom = new Thumb(this.notify.bind(this), props);

    this.root?.append(this.sliderContainer);
    const track = this.track.create(vertical);
    this.sliderContainer.append(track);
    const thumbFrom = this.thumbFrom.create(vertical, 'from');
    track.append(thumbFrom);
    this.thumbFrom.thumbHandle(this.sliderContainer);
    if (vertical) {
      this.sliderContainer.classList.add('slider-vertical');
    } else {
      this.sliderContainer.classList.add('slider');
    }

    if (tip) {
      this.tipFrom = new Tip();
      const tipFromElement = this.tipFrom.create(vertical);
      this.tipFrom.displayValue(String(props.from));
      thumbFrom.append(tipFromElement);
    }
    if (range) {
      this.thumbTo = new Thumb(this.notify.bind(this), props);
      const thumbTo = this.thumbTo.create(vertical, 'to');
      this.thumbTo.thumbHandle(this.sliderContainer);
      track.append(thumbTo);
      if (tip) {
        this.tipTo = new Tip();
        const tipToElement = this.tipTo.create(vertical);
        this.tipTo.displayValue(String(props.to));
        thumbTo.append(tipToElement);
      }
    }
    if (connect) {
      this.connect = new Connect(props);
      let connectEl = this.connect.create(vertical);
      track.append(connectEl);
    }

    if (scale) {
      this.scale = new Scale(this.notify.bind(this), props);
      const scaleEl = this.scale.create(vertical);
      this.sliderContainer.append(scaleEl);
    }
  }

  destroy() {
    this.sliderContainer.remove();
  }
}

export default View;