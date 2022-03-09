import createElement from '../../helpers/create-element';
import type { SettingsInterface } from '../../helpers/SettingsInterface';

class Connect {
  element: HTMLElement | undefined;
  settings: SettingsInterface;

  constructor(settings: SettingsInterface) {
    this.settings = settings;
  }

  render(vertical: boolean, parent: HTMLElement) {
    this.element = createElement('div', ['slider__connect']);
    if (vertical) {
      this.element.classList.add('slider__connect_type_vertical');
    } else {
      this.element.classList.add('slider__connect_type_horizontal');
    }
    parent.append(this.element);
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

  private calculatePosition(value: number) {
    const arr = this.settings.valueArray;
    const index = arr.indexOf(value);

    return (100 / (arr.length - 1)) * index;
  }
}

export default Connect;
