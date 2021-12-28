import Connect from '../src/slider/view/Connect';

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
  let div = document.createElement('div');
  beforeEach(() => {
    connect = new Connect(settings);
  });

  test('connect should be defined', () => {
    expect(connect).toBeDefined();
  })

  test('connect', () => {
    connect.render(false, div);
    expect(connect.element).toBeDefined();
  });

  test('add horizontal class', () => {
    connect.render(false, div);
    expect(
      connect.element?.classList.contains('slider__connect_horizontal'),
    ).toBeTruthy();
  });

  test('add vertical class', () => {
    connect.render(true, div);
    expect(
      connect.element?.classList.contains('slider__connect_vertical'),
    ).toBeTruthy();
  });

  test('set connect position', () => {
    connect.render(false, div);
    connect.setPosition(1, 5);
    expect(connect.element?.style.left).toBe('0%');
    expect(connect.element?.style.right).toBe('0%');
  });

  test('set connect position', () => {
    connect.setPosition(2, 3);
    expect(connect.element).toBeUndefined();
    expect(connect.element).toBeUndefined();
  });
});
