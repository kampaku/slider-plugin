import Connect from '../src/view/connect';

describe('test connect', () => {
  let connect: Connect;
  beforeEach(() => {
    connect = new Connect();
  });

  test('connect should be defined', () => {
    expect(connect).toBeDefined();
  })

  test('connect', () => {
    connect.create(false);
    expect(connect.element).toBeDefined();
  });

  test('add horizontal class', () => {
    connect.create(false);
    expect(
      connect.element.classList.contains('slider-connect--horizontal'),
    ).toBeTruthy();
  });

  test('add vertical class', () => {
    connect.create(true);
    expect(
      connect.element.classList.contains('slider-connect--vertical'),
    ).toBeTruthy();
  });

  test('set connect position', () => {
    connect.create(false);
    connect.setPosition('left', 'right', '10%', '20%');
    expect(connect.element.style.left).toBe('10%');
    expect(connect.element.style.right).toBe('20%');
  });

  test('set connect position', () => {
    connect.setPosition('left', 'right', '10%', '20%');
    expect(connect.element).toBeUndefined();
    expect(connect.element).toBeUndefined();
  });
});
