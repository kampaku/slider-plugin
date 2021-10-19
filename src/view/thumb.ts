import createElement from '../helpers/create-element';
import type { SettingsInterface } from '../helpers/SettingsInterface';

export default class Thumb {
  element!: HTMLElement;
  notify: (eventName: string, settings: SettingsInterface) => void;
  settings: SettingsInterface;

  constructor(notify: (eventName: string, settings: SettingsInterface) => void,
              settings: SettingsInterface) {
    this.notify = notify;
    this.element;
    this.settings = settings;
    // this.slide()
  }

  render(vertical: boolean) {
    this.element = createElement('div', ['thumb']);
    if (vertical) {
      this.element.classList.add('thumb-vertical');
    } else {
      this.element.classList.add('thumb-horizontal');
    }
    return this.element;
  }

  addListener(func: (event: PointerEvent, thumb: Thumb) => void) {
    this.element.addEventListener('pointerdown', (event) => func(event, this));
  }

  move(orientation: string, value: string) {
    this.element.setAttribute('style', `${orientation}: ${value}`);
  }

  calculatePosition(value: number) {
    if (!this.element.parentElement) return;
    const arr = this.settings.valueArray;
    const index = arr.indexOf(value);
    const offset = this.settings.vertical ?
      'offsetHeight' :
      'offsetWidth';
    const maxWidthWithoutThumb =
      100 -
      (this.element[offset] /
        this.element.parentElement[offset]) *
      100;
    const position = (maxWidthWithoutThumb / (arr.length - 1)) * index;
    this.move('left', Math.round(position) + '%')
  }

  convertToValue(coord: { newPosition: number, sliderEnd: number }) {
    const {newPosition, sliderEnd} = coord;
    const arr = this.settings.valueArray;
    const index = Math.floor((newPosition / sliderEnd) * (arr.length - 1));
    if (this.element.dataset.thumb === 'from') {
      this.notify('move from', {...this.settings, from: arr[index]})
    } else {
      this.notify('move to', {...this.settings, to: arr[index]})
    }
    return arr[index];
  }

  slide(elementX: HTMLElement) {
    // let elementX = this.element.closest('.track') as HTMLElement;

    this.element.addEventListener('pointerdown', (event: PointerEvent) => {
      const shiftThumb =
        event.clientX - this.element.getBoundingClientRect().left;

      this.element.setPointerCapture(event.pointerId);
      const onPointerMove = (event: PointerEvent) => {
        event.preventDefault();

        let newPosition =
          event.clientX -
          shiftThumb -
          elementX.getBoundingClientRect().left;

        if (newPosition < 0) {
          newPosition = 0;
        }

        const sliderEnd =
          elementX.offsetWidth - this.element.offsetWidth;

        if (newPosition > sliderEnd) {
          newPosition = sliderEnd;
        }
        // this.element.style.left = newPosition + 'px';
        this.convertToValue( { newPosition, sliderEnd });
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