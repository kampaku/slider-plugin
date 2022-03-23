import View from '../src/slider/view/View';
import * as $ from 'jquery';
describe('test view', () => {
  const settings = {
    min: 1,
    max: 5,
    step: 1,
    from: 0,
    to: 8,
    tip: true,
    connect: true,
    scale: true,
    vertical: false,
    range: true,
    valueArray: [1, 2, 3, 4, 5],
  };
  let slider: View;
  let container = document.createElement('div');
  document.body.append(container);
  beforeEach(() => {
    slider ? slider.destroy() : null;
    slider = new View($(container));
  });

  test('slider to be defined', () => {
    slider.render(settings);
    expect(slider.sliderContainer).toBeDefined();
  });

  test('horizontal class', () => {
    slider.render(settings)
    expect(slider.sliderContainer?.classList.contains('slider')).toBe(true)
  })

  test('vertical class', () => {
    slider.render({...settings, vertical: true})
    expect(slider.sliderContainer?.classList.contains('slider_type_vertical')).toBe(true)
  })

  test('destroy', () => {
    slider.render(settings)
    slider.destroy()
    expect(container.childElementCount).toBe(0)
  })
});
