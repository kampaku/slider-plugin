import Observable from '../src/helpers/Observable';

describe('test observable', () => {
  let observable: Observable;

  beforeEach(() => {
    observable = new Observable();
  });

  test('should attach', () => {
    const func = jest.fn();
    observable.attach(func);
    expect(observable.observers.length).toBe(1);
  });

  test('should not attach same function', () => {
    const func = jest.fn();
    observable.attach(func);
    observable.attach(func);
    expect(observable.observers.length).toBe(1);
  });

  test('should detach', () => {
    const func = jest.fn();
    observable.attach(func);
    observable.detach(func);
    expect(observable.observers.length).toBe(0);
  });
});
