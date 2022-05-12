import createElement from '../../helpers/create-element';
import type { ViewEvents } from '../../helpers/Events';

class Thumb {
  element: HTMLElement;
  notify: (arg: ViewEvents) => void;
  settings: SettingsInterface;

  constructor(
    notify: (arg: ViewEvents) => void,
    settings: SettingsInterface,
  ) {
    this.notify = notify;
    this.settings = settings;
  }

  render(type: 'from' | 'to', parent: HTMLElement) {
    this.element = createElement('div', ['slider__thumb']);
    this.element.dataset.thumb = type;
    if (this.settings.vertical) {
      this.element.classList.add('slider__thumb_type_vertical');
    } else {
      this.element.classList.add('slider__thumb_type_horizontal');
    }
    parent.append(this.element);
    this.thumbHandle(parent);
  }

  move(value: number) {
    const position = this.calculatePosition(value);
    const start = this.settings.vertical ? 'top' : 'left';
    this.element.style[start] = `${position?.toFixed(4)}%`;
  }

  changeZIndex(num: number) {
    this.element.style.zIndex = String(num);
  }

  private thumbHandle(parentElement: HTMLElement) {
    const client = this.settings.vertical ? 'clientY' : 'clientX';
    const start = this.settings.vertical ? 'top' : 'left';
    const offset = this.settings.vertical ? 'offsetHeight' : 'offsetWidth';

    const onPointerDown = (event: PointerEvent) => {
      const shiftThumb =
        event[client] - this.element.getBoundingClientRect()[start];

      this.element.setPointerCapture(event.pointerId);
      const onPointerMove = (e: PointerEvent) => {
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
        this.element.removeEventListener('pointerup', onPointerUp);
        this.element.removeEventListener('pointermove', onPointerMove);
      };
      this.element.addEventListener('pointermove', onPointerMove);
      this.element.addEventListener('pointerup', onPointerUp);
    };
    this.element.addEventListener('pointerdown', onPointerDown);
  }

  private calculatePosition(value: number) {
    if (!this.element.parentElement) return;
    const arr = this.settings.valueArray;
    const index = arr.indexOf(value);
    const offset = this.settings.vertical ? 'height' : 'width';
    const elemWidth = this.element.getBoundingClientRect()[offset];
    const parentWidth =
      this.element.parentElement.getBoundingClientRect()[offset];
    const maxWidthWithoutThumb = 100 - (elemWidth / parentWidth) * 100;
    return (maxWidthWithoutThumb / (arr.length - 1)) * index;
  }

  private convertToValue(coords: { newPosition: number; sliderEnd: number }) {
    const { newPosition, sliderEnd } = coords;
    const arr = this.settings.valueArray;
    const index = Math.floor((newPosition / sliderEnd) * (arr.length - 1));
    if (this.element.dataset.thumb === 'from') {
      this.notify({ kind: 'moveFrom', value: arr[index] });
    } else {
      this.notify({ kind: 'moveTo', value: arr[index] });
    }
  }
}

export default Thumb;
