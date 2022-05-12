import isCollide from '../../helpers/isCollide';
import createElement from '../../helpers/create-element';
import type { ViewEvents } from '../../helpers/Events';

class Scale {
  element: HTMLElement;
  settings: SettingsInterface;
  notify: (arg: ViewEvents) => void;
  constructor(
    notify: (arg: ViewEvents) => void,
    settings: SettingsInterface,
  ) {
    this.settings = settings;
    this.notify = notify;
    this.onScaleClick = this.onScaleClick.bind(this);
  }

  render(parent: HTMLElement) {
    this.element = createElement('div', ['slider__scale']);
    if (this.settings.vertical) {
      this.element.classList.add('slider__scale_type_vertical');
    } else {
      this.element.classList.add('slider__scale_type_horizontal');
    }
    this.element.addEventListener('pointerdown', this.onScaleClick);
    parent.append(this.element);
    this.makeMarks();
  }

  updateSettings(settings: SettingsInterface) {
    this.settings = settings;
  }

  private makeMarks() {
    const arr = this.settings.valueArray;
    const lastElement = arr[arr.length - 1];
    let marksCount = Math.floor(arr.length / 6);
    if (marksCount < 1) marksCount = 1;
    const marks = [];

    const start = this.settings.vertical ? 'top' : 'left';
    for (let i = 0; i < arr.length; i += marksCount) {
      let mark = createElement('div', ['slider__scale-marker']);
      mark.dataset.value = String(arr[i]);
      const y = (i * 100) / (arr.length - 1);
      mark.style[start] = y + '%';

      mark.textContent = String(arr[i]);
      marks.push(mark);

      if (i + marksCount >= arr.length) {
        let lastMark = createElement('div', ['slider__scale-marker']);
        lastMark.dataset.value = String(lastElement);
        lastMark.style[start] = '100%';

        lastMark.textContent = String(lastElement);
        marks.push(lastMark);
      }
    }
    this.element.append(...marks);
    if (isCollide(marks[marks.length - 2], marks[marks.length - 1])) {
      marks[marks.length - 2].remove();
    }
  }

  private onScaleClick(event: PointerEvent) {
    const target = event.target as HTMLElement;
    if (!target || !target.matches('.slider__scale-marker')) return;
    const value = Number(target.dataset.value);
    const { from, to, range } = this.settings;
    const left = Math.abs(value - from);
    const right = Math.abs(value - to);
    if (!range) {
      this.notify({ kind: 'moveFrom', value });
      return;
    }
    if (left === right) {
      if (value > from) {
        this.notify({ kind: 'moveTo', value });
      } else {
        this.notify({ kind: 'moveFrom', value });
      }
      return;
    }
    if (left < right) {
      this.notify({ kind: 'moveFrom', value });
    } else {
      this.notify({ kind: 'moveTo', value });
    }
  }
}

export default Scale;
