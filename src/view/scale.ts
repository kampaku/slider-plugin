import createElement from '../helpers/create-element';
import type { SettingsInterface } from '../helpers/SettingsInterface';
import { Events } from '../helpers/Events';

export default class Scale {
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

  create(vertical: boolean) {
    this.element = createElement('div', ['slider-scale']);
    if (vertical) {
      this.element.classList.add('slider-scale-vertical');
    }
    this.displayScale();
    this.element.addEventListener('pointerdown', this.onScaleClick);
    return this.element;
  }

  displayScale() {
    if (!this.element) return;
    const arr = this.settings.valueArray;
    const x = Math.round(arr.length / 6);

    const start = this.settings.vertical ? 'top' : 'left';
    for (let i = 0; i < arr.length; i += x) {
      let pip = createElement('div', ['scale-pip']);
      pip.dataset.value = String(arr[i]);
      const y = (i * 100) / (arr.length - 1);
      pip.style[start] = y + '%';

      pip.textContent = String(arr[i]);
      this.element.append(pip);
    }
  }

  updateSettings(settings: SettingsInterface) {
    this.settings = settings;
  }

  onScaleClick(event: PointerEvent) {
    const target = event.target as HTMLElement;
    if (!target || !target.classList.contains('scale-pip')) return;
    const val = Number(target.dataset.value);
    const { from, to } = this.settings;
    const left = Math.abs(val - from);
    const right = Math.abs(val - to);
    if (left <= right) {
      this.notify(Events.moveFrom, { ...this.settings, from: val });
    } else {
      this.notify(Events.moveTo, { ...this.settings, to: val });
    }
  }
}
