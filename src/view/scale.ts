import createElement from '../helpers/create-element';

export default class Scale {
  element: HTMLElement;
  constructor() {
    this.element = createElement('div', ['slider-scale']);
  }

  displayScale(arr: number[]) {
    const x = Math.round(arr.length / 10);
    
    for (let i = 0; i < arr.length; i+= x) {
      let pip = createElement('div', ['scale-pip']);
      const y = Math.ceil(i * 100 / arr.length - 1);
      pip.style.left = y + '%';
      pip.style.transform = `translateX(-${y + '%'})`;
      pip.textContent = String(arr[i]);
      this.element.append(pip)
    }
  }
}