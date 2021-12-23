import createElement from '../helpers/create-element';
import type { SettingsInterface } from '../helpers/SettingsInterface';
import { Events } from '../helpers/Events';

class Thumb {
  element: HTMLElement | undefined;
  notify: (eventName: Events, settings: SettingsInterface) => void;
  settings: SettingsInterface;

  constructor(
    notify: (eventName: Events, settings: SettingsInterface) => void,
    settings: SettingsInterface,
  ) {
    this.notify = notify;
    this.settings = settings;
  }

  create(vertical: boolean, type: 'from' | 'to') {
    this.element = createElement('div', ['thumb']);
    this.element.dataset.thumb = type;
    if (vertical) {
      this.element.classList.add('thumb-vertical');
    } else {
      this.element.classList.add('thumb-horizontal');
    }
    return this.element;
  }

  move(value: number) {
    if (!this.element) return;
    const position = this.calculatePosition(value);
    const start = this.settings.vertical ? 'top' : 'left';
    this.element.style[start] = `${position?.toFixed(4)}%`;
  }

  changeZindex(num: number) {
    if (!this.element) return;
    this.element.style.zIndex = String(num);
  }

  thumbHandle(parentElement: HTMLElement) {
    if (!this.element) return;
    const client = this.settings.vertical ? 'clientY' : 'clientX';
    const start = this.settings.vertical ? 'top' : 'left';
    const offset = this.settings.vertical ? 'offsetHeight' : 'offsetWidth';

    this.element.addEventListener('pointerdown', (event: PointerEvent) => {
      if (!this.element) return;
      const shiftThumb =
        event[client] - this.element.getBoundingClientRect()[start];

      this.element.setPointerCapture(event.pointerId);
      const onPointerMove = (e: PointerEvent) => {
        if (!this.element) return;
        e.preventDefault();

        let newPosition =
          e[client] - shiftThumb - parentElement.getBoundingClientRect()[start];

        if (newPosition < 0) {
          newPosition = 0;
        }

        const sliderEnd = parentElement[offset] - this.element[offset];

        if (newPosition > sliderEnd) {
          newPosition = sliderEnd;
        }
        this.convertToValue({ newPosition, sliderEnd });
      };

      const onPointerUp = () => {
        if (!this.element) return;
        this.element.removeEventListener('pointerup', onPointerUp);
        this.element.removeEventListener('pointermove', onPointerMove);
      };
      this.element.addEventListener('pointermove', onPointerMove);
      this.element.addEventListener('pointerup', onPointerUp);
    });
  }

  private calculatePosition(value: number) {
    if (!this.element) return;
    if (!this.element.parentElement) return;
    const arr = this.settings.valueArray;
    const index = arr.indexOf(value);
    const offset = this.settings.vertical ? 'offsetHeight' : 'offsetWidth';
    const maxWidthWithoutThumb =
      100 - (this.element[offset] / this.element.parentElement[offset]) * 100;
    return (maxWidthWithoutThumb / (arr.length - 1)) * index;
  }

  private convertToValue(coords: { newPosition: number; sliderEnd: number }) {
    if (!this.element) return;
    const { newPosition, sliderEnd } = coords;
    const arr = this.settings.valueArray;
    const index = Math.floor((newPosition / sliderEnd) * (arr.length - 1));
    if (this.element.dataset.thumb === 'from') {
      this.notify(Events.moveFrom, { ...this.settings, from: arr[index] });
    } else {
      this.notify(Events.moveTo, { ...this.settings, to: arr[index] });
    }
  }

  
}

export default Thumb;