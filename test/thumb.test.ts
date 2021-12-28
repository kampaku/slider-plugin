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
    valueArray: [1, 2, 3, 4, 5]
  }
  const model = new Model(settings);
  const div = document.createElement('div');
  let func = jest.fn()
  beforeEach(() => {
    thumb = new Thumb(func, settings);
  });

  test('thumb to be defined', () => {
    expect(thumb).toBeDefined();
  })

  test('test render', () => {
    thumb.render(false, 'from', div);
    expect(thumb.element).toBeTruthy();
  });

  test('thumb has horizontal class', () => {
    thumb.render(false, 'from', div);
    expect(thumb.element?.classList.contains('slider__thumb_horizontal')).toBeTruthy();
  });

  test('thumb has vertical class', () => {
    thumb.render(true, 'from', div);
    expect(thumb.element?.classList.contains('slider__thumb_vertical')).toBeTruthy();
  });
});
