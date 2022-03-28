import createElement from '../../helpers/create-element';
import Observable from '../../helpers/Observable';
import isCrossed from '../../helpers/isCrossed';

import Track from './Track';
import Thumb from './Thumb';
import Tip from './Tip';
import Connect from './Connect';
import Scale from './Scale';

class View extends Observable {
  root: JQuery<HTMLElement> | null;
  sliderContainer: HTMLElement | undefined;
  protected thumbFrom: Thumb | undefined;
  protected thumbTo: Thumb | undefined;
  protected tipFrom: Tip | undefined;
  protected tipTo: Tip | undefined;
  protected track: Track | undefined;
  protected connect: Connect | undefined;
  protected scale: Scale | undefined;

  constructor(root: JQuery) {
    super();
    this.root = root;
  }

  render(props: SettingsInterface) {
    const { vertical, tip, range, connect, scale } = props;
    this.sliderContainer = createElement('div', ['slider']);
    this.root?.append(this.sliderContainer);
    if (vertical) {
      this.sliderContainer.classList.add('slider_type_vertical');
    }

    this.renderTrack(props, vertical);
    this.renderThumb(props, range);

    if (tip) this.renderTip(props);

    if (connect) this.renderConnect(vertical, props);

    if (scale) this.renderScale(vertical, props);
  }


  destroy() {
    this.sliderContainer?.remove();
  }

  moveThumb(thumb: 'from' | 'to', value: number) {
    if (thumb === 'from') {
      this.thumbFrom?.changeZIndex(6);
      this.thumbTo?.changeZIndex(5);
      this.thumbFrom?.move(value);
    } else if (thumb === 'to') {
      this.thumbFrom?.changeZIndex(5);
      this.thumbTo?.changeZIndex(6);
      this.thumbTo?.move(value);
    }
  }

  updateTip(from:number, to:number, range: boolean) {
    if (!range) {
      this.tipFrom?.displayValue(String(from));
      return;
    }
    if (this.tipFrom?.element && this.tipTo?.element) {
      const cross = isCrossed(this.tipFrom.element, this.tipTo.element);
      if (cross) {
        this.tipFrom.displayValue(`${from} − ${to}`);
        this.tipTo.element.style.visibility = 'hidden';
      } else {
        this.tipTo.element.style.visibility = 'visible';
        this.tipFrom?.displayValue(String(from));
        this.tipTo?.displayValue(String(to));
      }
    }
  }

  updateConnect(from: number, to: number) {
    this.connect?.setPosition(from, to);
  }

  updateScale(settings: SettingsInterface) {
    this.scale?.updateSettings(settings);
  }

  updateTrack(settings: SettingsInterface) {
    this.track?.updateSettings(settings);
  }

  private renderTrack(props: SettingsInterface, vertical: boolean) {
    if (!this.sliderContainer) return;
    this.track = new Track(this.notify.bind(this), props);
    this.track.render(vertical, this.sliderContainer);
  }

  private renderThumb(props: SettingsInterface, range: boolean) {
    if (!this.track?.element || !this.sliderContainer) return;

    this.thumbFrom = new Thumb(this.notify.bind(this), props);
    this.thumbFrom.render(props.vertical, 'from', this.track.element);

    if (range) {
      this.thumbTo = new Thumb(this.notify.bind(this), props);
      this.thumbTo.render(props.vertical, 'to', this.track.element);
    }
  }

  private renderTip(props: SettingsInterface) {
    const { vertical, range, from, to } = props;
    if (!this.thumbFrom?.element) return;
    this.tipFrom = new Tip();
    this.tipFrom.render(vertical, this.thumbFrom.element);
    this.tipFrom.displayValue(String(from));

    if (range && this.thumbTo?.element) {
      this.tipTo = new Tip();
      this.tipTo.render(vertical, this.thumbTo.element);
      this.tipTo.displayValue(String(to));
    }
  }

  private renderConnect(vertical: boolean, props: SettingsInterface) {
    if (!this.track?.element) return;
    this.connect = new Connect(props);
    this.connect.render(vertical, this.track?.element);
  }

  private renderScale(vertical: boolean, props: SettingsInterface) {
    if (!this.sliderContainer) return;
    this.scale = new Scale(this.notify.bind(this), props);
    this.scale.render(vertical, this.sliderContainer);
  }
}

export default View;
