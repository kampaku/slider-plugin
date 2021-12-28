import Tip from '../src/slider/view/Tip';

describe('test Tip', () => {
  let tip: Tip;
  const div = document.createElement('div');

  beforeEach(() => {
    tip = new Tip();
  });

  test('tip to be defined', () => {
    expect(tip).toBeDefined();
  });

  test('tip element to be defined', () => {
    tip.render(false, div);
    expect(tip.element).toBeDefined();
  });

  test('tip has vertical class', () => {
    tip.render(true, div);
    expect(tip.element?.classList.contains('slider__tip_vertical')).toBeTruthy();
  });

  test('tip has horizontal class', () => {
    tip.render(false, div);
    expect(
      tip.element?.classList.contains('slider__tip_horizontal'),
    ).toBeTruthy();
  });

  test('tip display value', () => {
    tip.render(false, div);
    tip.displayValue(String(40));
    expect(tip.element?.textContent).toBe('40');
  });
});
