import type { ModelEvents } from '../src/helpers/Events';
import Observable from '../src/helpers/Observable';

describe('test observable', () => {
  class TestObservable extends Observable<ModelEvents> {}
  let observable: TestObservable;


  beforeEach(() => {
    observable = new TestObservable();
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
