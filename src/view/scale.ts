import createElement from '../helpers/create-element';

export default class Scale {
  element: HTMLElement;
  constructor() {
    this.element = createElement('div', ['slider-scale']);
  }

  displayScale(arr: number[], start: string) {
    const x = Math.round(arr.length / 4);

    for (let i = 0; i < arr.length; i += x) {
      let pip = createElement('div', ['scale-pip']);
      const y = Math.round((i * 100) / arr.length);
      pip.style[start] = y + '%';

      pip.textContent = String(arr[i]);
      this.element.append(pip);
    }
  }

  addListener(func: (event: MouseEvent) => void) {
    this.element.addEventListener('click', (event) => func(event));
  }
}
