import Tip from '../src/view/tip';

describe('test Tip', () => {
  let tip: Tip;

  beforeEach(() => {
    tip = new Tip();
  });

  test('tip to be defined', () => {
    expect(tip).toBeDefined();
  });

  test('tip element to be defined', () => {
    tip.render(false);
    expect(tip.element).toBeDefined();
  });

  test('tip has vertical class', () => {
    tip.render(true);
    expect(tip.element.classList.contains('slider-tip--vertical')).toBeTruthy();
  });

  test('tip has horizontal class', () => {
    tip.render(false);
    expect(
      tip.element.classList.contains('slider-tip--horizontal'),
    ).toBeTruthy();
  });

  test('tip display value', () => {
    tip.render(false);
    tip.displayValue(40);
    expect(tip.element.textContent).toBe('40');
  });
});
