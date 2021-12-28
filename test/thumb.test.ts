import Thumb from '../src/view/thumb';
import Model from '../src/model/model';
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
  const model = new Model(settings)
  let func = jest.fn()
  beforeEach(() => {
    thumb = new Thumb(func, settings);
  });

  test('thumb to be defined', () => {
    expect(thumb).toBeDefined();
  })

  test('test render', () => {
    const thumbEl = thumb.render(false, 'from');
    expect(thumbEl).toBeTruthy();
  });

  test('thumb has horizontal class', () => {
    const thumbEl = thumb.render(false, 'from');
    expect(thumbEl.classList.contains('thumb-horizontal')).toBeTruthy();
  });

  test('thumb has vertical class', () => {
    const thumbEl = thumb.render(true, 'from');
    expect(thumbEl.classList.contains('thumb-vertical')).toBeTruthy();
  });
});
