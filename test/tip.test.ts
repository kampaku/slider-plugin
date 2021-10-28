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
    const tipEl = tip.create(false);
    expect(tipEl).toBeDefined();
  });

  test('tip has vertical class', () => {
    const tipEl = tip.create(true);
    expect(tipEl.classList.contains('slider-tip--vertical')).toBeTruthy();
  });

  test('tip has horizontal class', () => {
    const tipEl = tip.create(false);
    expect(
      tipEl.classList.contains('slider-tip--horizontal'),
    ).toBeTruthy();
  });

  test('tip display value', () => {
    const tipEl = tip.create(false);
    tip.displayValue(40);
    expect(tipEl.textContent).toBe('40');
  });
});
