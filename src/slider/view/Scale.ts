import createElement from '../../helpers/create-element';
import type { SettingsInterface } from '../../helpers/SettingsInterface';
import { Events } from '../../helpers/Events';

class Scale {
  element: HTMLElement | undefined;
  settings: SettingsInterface;
  notify: (eventName: Events, settings: SettingsInterface) => void;
  constructor(
    notify: (eventName: Events, settings: SettingsInterface) => void,
    settings: SettingsInterface,
  ) {
    this.settings = settings;
    this.notify = notify;
    this.onScaleClick = this.onScaleClick.bind(this);
  }

  render(vertical: boolean, parent: HTMLElement) {
    this.element = createElement('div', ['slider__scale']);
    if (vertical) {
      this.element.classList.add('slider__scale_vertical');
    }
    this.displayScale();
    this.element.addEventListener('pointerdown', this.onScaleClick);
    parent.append(this.element);
  }

  displayScale() {
    if (!this.element) return;
    const arr = this.settings.valueArray;
    let markerCount = Math.round(arr.length / 6);
    if (markerCount < 1) markerCount = 1;

    const start = this.settings.vertical ? 'top' : 'left';
    for (let i = 0; i < arr.length; i += markerCount) {
      let marker = createElement('div', ['slider__scale-marker']);
      marker.dataset.value = String(arr[i]);
      const y = (i * 100) / (arr.length - 1);
      marker.style[start] = y + '%';

      marker.textContent = String(arr[i]);
      this.element.append(marker);
    }
  }

  updateSettings(settings: SettingsInterface) {
    this.settings = settings;
  }

  onScaleClick(event: PointerEvent) {
    const target = event.target as HTMLElement;
    if (!target || !target.matches('.slider__scale-marker')) return;
    const value = Number(target.dataset.value);
    const { from, to, range } = this.settings;
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

export default Scale;