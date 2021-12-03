import createElement from '../helpers/create-element';
import type { SettingsInterface } from '../helpers/SettingsInterface';

export default class Connect {
  element: HTMLElement | undefined;
  settings: SettingsInterface;

  constructor(settings: SettingsInterface) {
    this.settings = settings;
  }

  create(vertical: boolean) {
    this.element = createElement('div', ['slider-connect']);
    if (vertical) {
      this.element.classList.add('slider-connect--vertical');
    } else {
      this.element.classList.add('slider-connect--horizontal');
    }

    return this.element;
  }

  private calculatePosition(value: number) {
    const arr = this.settings.valueArray;
    const index = arr.indexOf(value);

    return (100 / (arr.length - 1)) * index;
  }

  setPosition(from: number, to: number) {
    if (!this.element) return;
    const startConnect = this.settings.vertical ? 'top' : 'left';
    const endConnect = this.settings.vertical ? 'bottom' : 'right';
    const startPosition = this.calculatePosition(from);
    if (this.settings.range) {
      const endPosition = this.calculatePosition(to);
      this.element.style[startConnect] = `${startPosition}%`;
      this.element.style[endConnect] = `${100 - endPosition}%`;
    } else {
      this.element.style[startConnect] = '0%';
      this.element.style[endConnect] = `${100 - startPosition}%`;
    }
  }
}
