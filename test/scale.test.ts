import Scale from '../src/slider/view/Scale';

describe('test scale', () => {
  let scale: Scale;
  const settings = {
    min: 1,
    max: 5,
    step: 1,
    from: 2,
    to: 5,
    tip: true,
    connect: true,
    scale: true,
    vertical: false,
    range: false,
    valueArray: [1, 2, 3, 4, 5],
  };
  const div = document.createElement('div');
  let callback = jest.fn();
  beforeEach(() => {
    scale = new Scale(callback, settings);
  });

  test('scale should to be defined', () => {
    expect(scale).toBeDefined();
  })

  test('scale should render', () => {
    scale.render(false, div);
    expect(scale.element).toBeTruthy();
  })

  test('scale should click', () => {
    scale.render(false, div);
    if(!scale.element) return;
    const marker = scale.element.querySelector('.slider__scale-marker') as HTMLElement;
    if (!marker) return;
    const event = new MouseEvent('pointerdown', { bubbles: true });
    marker.dispatchEvent(event);
    expect(scale.notify).toHaveBeenCalled();
  })
})
