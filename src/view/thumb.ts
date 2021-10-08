import createElement from '../helpers/create-element';

export default class Thumb {
  element!: HTMLElement;
  constructor() {
    this.element;
  }

  render(vertical: boolean) {
    this.element = createElement('div', ['thumb']);
    if (vertical) {
      this.element.classList.add('thumb-vertical');
    } else {
      this.element.classList.add('thumb-horizontal');
    }
  }

  addListener(func: (event: PointerEvent, thumb: Thumb) => void) {
    this.element.addEventListener('pointerdown', (event) => func(event, this));
  }

  move(orientation: string, value: string) {
    this.element.setAttribute('style', `${orientation}: ${value}`);
  }

  width(element: HTMLElement) {
    this.element.addEventListener('click', () => {
      // console.log(element.offsetWidth)
    })
  }

  slide(elementX: HTMLElement) {
    this.element.addEventListener('pointerdown', (event: PointerEvent) => {
      const shiftThumb =
        event.clientX - this.element.getBoundingClientRect().left;

      this.element.setPointerCapture(event.pointerId)
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
        this.element.style.left = newPosition + 'px'
      };

      const onPointerUp = () => {
        this.element.removeEventListener('pointerup', onPointerUp);
        this.element.removeEventListener('pointermove', onPointerMove);
      }
      this.element.addEventListener('pointermove', onPointerMove)
      this.element.addEventListener('pointerup', onPointerUp)
    })
  }
}