import Connect from '../src/slider/view/connect';

describe('test connect', () => {
  const settings = {
    min: 1,
    max: 5,
    step: 1,
    from: 0,
    to: 8,
    range: true,
    tip: true,
    connect: true,
    scale: true,
    vertical: false,
    valueArray: [1, 2, 3, 4, 5]
  }
  let connect: Connect;
  beforeEach(() => {
    connect = new Connect(settings);
  });

  test('connect should be defined', () => {
    expect(connect).toBeDefined();
  })

  test('connect', () => {
    let connectEl = connect.render(false);
    expect(connectEl).toBeDefined();
  });

  test('add horizontal class', () => {
    let connectEl = connect.render(false);
    expect(
      connectEl.classList.contains('slider-connect--horizontal'),
    ).toBeTruthy();
  });

  test('add vertical class', () => {
    let connectEl = connect.render(true);
    expect(
      connectEl.classList.contains('slider-connect--vertical'),
    ).toBeTruthy();
  });

  test('set connect position', () => {
    let connectEl = connect.render(false);
    connect.setPosition(1, 5);
    expect(connectEl.style.left).toBe('0%');
    expect(connectEl.style.right).toBe('0%');
  });

  test('set connect position', () => {
    connect.setPosition(2, 3);
    expect(connect.element).toBeUndefined();
    expect(connect.element).toBeUndefined();
  });
});
