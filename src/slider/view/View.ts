import createElement from '../../helpers/create-element';
import Observable from '../../helpers/Observable';
import isCollide from '../../helpers/isCollide';
import Track from './Track';
import Thumb from './Thumb';
import Tip from './Tip';
import Connect from './Connect';
import Scale from './Scale';

class View extends Observable {
  sliderContainer: HTMLElement;
  private root: JQuery<HTMLElement>;
  private thumbFrom: Thumb;
  private thumbTo: Thumb;
  private tipFrom: Tip;
  private tipTo: Tip;
  private track: Track;
  private connect: Connect;
  private scale: Scale;

  constructor(root: JQuery) {
    super();
    this.root = root;
  }

  render(settings: SettingsInterface) {
    const { vertical, tip, connect, scale } = settings;
    this.sliderContainer = createElement('div', ['slider']);
    this.root.append(this.sliderContainer);
    if (vertical) {
      this.sliderContainer.classList.add('slider_type_vertical');
    }

    this.renderTrack(settings);
    this.renderThumb(settings);

    if (tip) this.renderTip(settings);

    if (connect) this.renderConnect(settings);

    if (scale) this.renderScale(settings);
  }


  destroy() {
    this.sliderContainer.remove();
  }

  moveThumb(thumb: 'from' | 'to', value: number) {
    if (thumb === 'from') {
      this.thumbFrom.changeZIndex(6);
      this.thumbTo?.changeZIndex(5);
      this.thumbFrom.move(value);
    } else if (thumb === 'to') {
      this.thumbFrom.changeZIndex(5);
      this.thumbTo.changeZIndex(6);
      this.thumbTo.move(value);
    }
  }

  updateTip(from:number, to:number, range: boolean) {
    if (!range) {
      this.tipFrom.displayValue(String(from));
      return;
    }
    if (this.tipFrom.element && this.tipTo.element) {
      const cross = isCollide(this.tipFrom.element, this.tipTo.element);
      if (cross) {
        this.tipFrom.displayValue(`${from} − ${to}`);
        this.tipTo.element.style.visibility = 'hidden';
      } else {
        this.tipTo.element.style.visibility = 'visible';
        this.tipFrom.displayValue(String(from));
        this.tipTo.displayValue(String(to));
      }
    }
  }

  updateConnect(from: number, to: number) {
    this.connect.setPosition(from, to);
  }

  updateScale(settings: SettingsInterface) {
    this.scale.updateSettings(settings);
  }

  updateTrack(settings: SettingsInterface) {
    this.track.updateSettings(settings);
  }

  private renderTrack(settings: SettingsInterface) {
    this.track = new Track(this.notify.bind(this), settings);
    this.track.render(this.sliderContainer);
  }

  private renderThumb(settings: SettingsInterface) {
    this.thumbFrom = new Thumb(this.notify.bind(this), settings);
    this.thumbFrom.render('from', this.track.element);

    if (settings.range) {
      this.thumbTo = new Thumb(this.notify.bind(this), settings);
      this.thumbTo.render('to', this.track.element);
    }
  }

  private renderTip(settings: SettingsInterface) {
    const { vertical, range, from, to } = settings;
    this.tipFrom = new Tip();
    this.tipFrom.render(vertical, this.thumbFrom.element);
    this.tipFrom.displayValue(String(from));

    if (range && this.thumbTo.element) {
      this.tipTo = new Tip();
      this.tipTo.render(vertical, this.thumbTo.element);
      this.tipTo.displayValue(String(to));
    }
  }

  private renderConnect(settings: SettingsInterface) {
    this.connect = new Connect(settings);
    this.connect.render(this.track.element);
  }

  private renderScale(settings: SettingsInterface) {
    this.scale = new Scale(this.notify.bind(this), settings);
    this.scale.render(this.sliderContainer);
  }
}

export default View;
