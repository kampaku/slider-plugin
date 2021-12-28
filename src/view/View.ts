import createElement from '../helpers/create-element';
import Observable from '../helpers/Observable';
import Track from './Track';
import Thumb from './Thumb';
import Tip from './Tip';
import Connect from './Connect';
import Scale from './Scale';

class View extends Observable {
  root: JQuery<HTMLElement> | null;
  thumbFrom: Thumb | undefined;
  thumbTo: Thumb | undefined;
  tipFrom: Tip | undefined;
  tipTo: Tip | undefined;
  track: Track | undefined;
  connect: Connect | undefined;
  sliderContainer: HTMLElement | undefined;
  scale: Scale | undefined;

  constructor(root: JQuery) {
    super();
    this.root = root;
  }

  render(props: SettingsInterface) {
    const { vertical, tip, range, connect, scale } = props;
    this.sliderContainer = createElement('div');
    this.root?.append(this.sliderContainer);
    if (vertical) {
      this.sliderContainer.classList.add('slider-vertical');
    } else {
      this.sliderContainer.classList.add('slider');
    }

    this.renderTrack(vertical);
    this.renderThumb(props, range);

    if (tip) this.renderTip(props);

    if (connect) this.renderConnect(vertical, props);

    if (scale) this.renderScale(vertical, props);
  }


  destroy() {
    this.sliderContainer?.remove();
  }

  private renderTrack(vertical: boolean) {
    if (!this.sliderContainer) return;
    this.track = new Track();
    this.track.render(vertical, this.sliderContainer);
  }

  private renderThumb(props: SettingsInterface, range: boolean) {
    if (!this.track?.element || !this.sliderContainer) return;

    this.thumbFrom = new Thumb(this.notify.bind(this), props);
    this.thumbFrom.render(props.vertical, 'from', this.track.element);
    this.thumbFrom.thumbHandle(this.sliderContainer);

    if (range) {
      this.thumbTo = new Thumb(this.notify.bind(this), props);
      this.thumbTo.render(props.vertical, 'to', this.track.element);
      this.thumbTo.thumbHandle(this.sliderContainer);
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