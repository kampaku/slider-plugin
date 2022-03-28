import Thumb from '../src/slider/view/Thumb';
import Model from '../src/slider/model/Model';
describe('test thumb', () => {
  let thumb: Thumb;
  const settings = {
    min: 1,
    max: 5,
    step: 1,
    from: 1,
    to: 5,
    range: true,
    tip: true,
    connect: true,
    scale: true,
    vertical: false,
    valueArray: [1, 2, 3, 4, 5],
  };
  const model = new Model(settings);
  const div = document.createElement('div');
  let callback = jest.fn();
  beforeEach(() => {
    thumb = new Thumb(callback, settings);
  });

  test('thumb to be defined', () => {
    expect(thumb).toBeDefined();
  });

  test('test render', () => {
    thumb.render(false, 'from', div);
    expect(thumb.element).toBeTruthy();
  });

  test('thumb has horizontal class', () => {
    thumb.render(false, 'from', div);
    expect(
      thumb.element?.classList.contains('slider__thumb_type_horizontal'),
    ).toBeTruthy();
  });

  test('thumb has vertical class', () => {
    thumb.render(true, 'from', div);
    expect(
      thumb.element?.classList.contains('slider__thumb_type_vertical'),
    ).toBeTruthy();
  });

  test('thumb move', () => {
    thumb.render(false, 'from', div);
    if (!thumb.element) return;
    const divRect: DOMRect = {
      ...div.getBoundingClientRect(),
      left: 0,
      width: 100,
      height: 40,
    };
    const thumbRect: DOMRect = {
      ...thumb.element.getBoundingClientRect(),
      left: 0,
      width: 20,
      height: 40,
    };

    thumb.element.setPointerCapture = jest.fn();
    div.getBoundingClientRect = jest.fn(() => divRect);
    thumb.element.getBoundingClientRect = jest.fn(() => thumbRect);
    const event = new MouseEvent('pointerdown');
    const moveEvent = new MouseEvent('pointermove');
    const upEvent = new MouseEvent('pointerup');
    thumb.element.dispatchEvent(event);
    thumb.element.dispatchEvent(moveEvent);
    thumb.element.dispatchEvent(upEvent);
    expect(thumb.notify).toHaveBeenCalled();
  });
});
