import createElement from '../../helpers/create-element';
import { Events } from '../../helpers/Events';

class Track {
  element: HTMLElement | undefined;
  notify: (eventName: Events, settings: SettingsInterface) => void;
  settings: SettingsInterface;

  constructor(
    notify: (eventName: Events, settings: SettingsInterface) => void,
    settings: SettingsInterface,
  ) {
    this.notify = notify;
    this.settings = settings;
    this.onTrackClick = this.onTrackClick.bind(this);
  }

  render(vertical: boolean, parent: HTMLElement) {
    this.element = createElement('div', ['slider__track']);
    if (vertical) {
      this.element.classList.add('slider__track_type_vertical');
    } else {
      this.element.classList.add('slider__track_type_horizontal');
    }
    this.element.addEventListener('pointerdown', this.onTrackClick);
    parent.append(this.element);
  }

  updateSettings(settings: SettingsInterface) {
    this.settings = settings;
  }

  private onTrackClick(e: PointerEvent) {
    if (!this.element) return;
    const client = this.settings.vertical ? 'clientY' : 'clientX';
    const start = this.settings.vertical ? 'top' : 'left';
    const offset = this.settings.vertical ? 'offsetHeight' : 'offsetWidth';

    const { from, to, range, valueArray } = this.settings;

    const index = Math.floor(((e[client] - this.element.getBoundingClientRect()[start])
                  / this.element[offset]) * (valueArray.length));
    const value = valueArray[index];
    const left = Math.abs(value - from);
    const right = Math.abs(value - to);

    if (!range) {
      this.notify(Events.moveFrom, { ...this.settings, from: value });
      return;
    }
    if (left === right) {
      if (value > from) {
        this.notify(Events.moveTo, { ...this.settings, to: value });
      } else {
        this.notify(Events.moveFrom, { ...this.settings, from: value });
      }
      return;
    }
    if (left < right) {
      this.notify(Events.moveFrom, { ...this.settings, from: value });
    } else {
      this.notify(Events.moveTo, { ...this.settings, to: value });
    }
  }
}

export default Track;
