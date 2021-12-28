import Model from '../src/slider/model/model';
// jest.mock('../src/model/model')

describe('test model', () => {
  const settings = {
    min: 0,
    max: 10,
  }
  let model: Model;

  beforeEach(() => {
    model = new Model(settings)
  })
  test('set connect', () => {
    model.setConnect(true);
    expect(model.connect).toBe(true);
  });

  test('set min', () => {
    model.setMin(0);
    expect(model.min).toBe(0);
  });

  test('set max', () => {
    model.setMax(100);
    expect(model.max).toBe(100);
  });

  test('set step', () => {
    model.setStep(3);
    expect(model.step).toBe(3);
  });

  test('set from', () => {
    model.setFrom(1);
    expect(model.from).toBe(1);
  });

  test('set to', () => {
    model.setTo(5);
    expect(model.to).toBe(5);
  });

  test('set vertical', () => {
    model.setVertical(true);
    expect(model.vertical).toBe(true);
  });

  test('set tip', () => {
    model.setTip(true);
    expect(model.tip).toBe(true);
  });

  test('set range', () => {
    model.setRange(true);
    expect(model.range).toBe(true);
  });

  test('set vertical', () => {
    model.setVertical(true);
    expect(model.vertical).toBe(true);
  });

  test('set scale', () => {
    model.setScale(true);
    expect(model.scale).toBe(true);
  });

  test('fill array of values', () => {
    model.setMin(-10);
    model.setMax(10);
    model.setStep(1);
    let step = model.step;
    model.setValuesArray();
    let arr = [];
    for (let i = -10; i <= 10; i+=step) {
      arr.push(i)
    }
    expect(model.valuesArray).toEqual(arr);
  });
});