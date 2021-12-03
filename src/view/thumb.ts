import createElement from '../helpers/create-element';
import type { SettingsInterface } from '../helpers/SettingsInterface';
import { Events } from '../helpers/Events';
export default class Thumb {
  element!: HTMLElement;
  notify: (eventName: Events, settings: SettingsInterface) => void;
  settings: SettingsInterface;

  constructor(
    notify: (eventName: Events, settings: SettingsInterface) => void,
    settings: SettingsInterface,
  ) {
    this.notify = notify;
    this.settings = settings;
  }

  create(vertical: boolean) {
    this.element = createElement('div', ['thumb']);
    if (vertical) {
      this.element.classList.add('thumb-vertical');
    } else {
      this.element.classList.add('thumb-horizontal');
    }
    return this.element;
  }

  move(value: number) {
    const position = this.calculatePosition(value);
    const start = this.settings.vertical ? 'top' : 'left';
    this.element.setAttribute('style', `${start}: ${position?.toFixed(4)}%`);
  }

  private calculatePosition(value: number) {
    if (!this.element.parentElement) return;
    const arr = this.settings.valueArray;
    const index = arr.indexOf(value);
    const offset = this.settings.vertical ? 'offsetHeight' : 'offsetWidth';
    const maxWidthWithoutThumb =
      100 - (this.element[offset] / this.element.parentElement[offset]) * 100;
    return (maxWidthWithoutThumb / (arr.length - 1)) * index;
  }

  private convertToValue(coord: { newPosition: number; sliderEnd: number }) {
    const { newPosition, sliderEnd } = coord;
    const arr = this.settings.valueArray;
    const index = Math.floor((newPosition / sliderEnd) * (arr.length - 1));
    if (this.element.dataset.thumb === 'from') {
      this.notify(Events.moveFrom, { ...this.settings, from: arr[index] });
    } else {
      this.notify(Events.moveTo, { ...this.settings, to: arr[index] });
    }
  }

  thumbHandle(elementX: HTMLElement) {
    // let elementX = this.element.closest('.track') as HTMLElement;

    const client = this.settings.vertical ? 'clientY' : 'clientX';
    const start = this.settings.vertical ? 'top' : 'left';
    const offset = this.settings.vertical ? 'offsetHeight' : 'offsetWidth';

    this.element.addEventListener('pointerdown', (event: PointerEvent) => {
      const shiftThumb =
        event[client] - this.element.getBoundingClientRect()[start];

      this.element.setPointerCapture(event.pointerId);
      const onPointerMove = (event: PointerEvent) => {
        event.preventDefault();

        let newPosition =
          event[client] - shiftThumb - elementX.getBoundingClientRect()[start];

        if (newPosition < 0) {
          newPosition = 0;
        }

        const sliderEnd = elementX[offset] - this.element[offset];

        if (newPosition > sliderEnd) {
          newPosition = sliderEnd;
        }
        this.convertToValue({ newPosition, sliderEnd });
      };

      const onPointerUp = () => {
        this.element.removeEventListener('pointerup', onPointerUp);
        this.element.removeEventListener('pointermove', onPointerMove);
      };
      this.element.addEventListener('pointermove', onPointerMove);
      this.element.addEventListener('pointerup', onPointerUp);
    });
  }
}
