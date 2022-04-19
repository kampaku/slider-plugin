import Connect from '../src/slider/view/Connect';

describe('test connect', () => {
  const settings = {
    min: 1,
    max: 5,
    step: 1,
    from: 1,
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
    connect.settings.vertical = false;
  });

  test('connect should be defined', () => {
    expect(connect).toBeDefined();
  })

  test('connect should render', () => {
    connect.render(div);
    expect(connect.element).toBeDefined();
  });

  test('add horizontal class', () => {
    connect.render(div);
    expect(
      connect.element.classList.contains('slider__connect_type_horizontal'),
    ).toBeTruthy();
  });

  test('add vertical class', () => {
    connect.settings.vertical = true;
    connect.render(div);
    expect(
      connect.element.classList.contains('slider__connect_type_vertical'),
    ).toBeTruthy();
  });

  test('set connect position', () => {
    connect.render(div);
    connect.setPosition(1, 5);
    expect(connect.element.style.left).toBe('0%');
    expect(connect.element.style.right).toBe('0%');
  });
});
