import Model from '../src/model/model';
// jest.mock('../src/model/model')

describe('test model', () => {
  const settings = {
    min: 0,
    max: 10,
  }
  let model = new Model(settings);
  test('set connect', () => {
    model.setConnect(true);
    expect(model.getConnect()).toBe(true);
  });

  test('set min', () => {
    model.setMin(0);
    expect(model.getMin()).toBe(0);
  });

  test('set max', () => {
    model.setMax(100);
    expect(model.getMax()).toBe(100);
  });

  test('set step', () => {
    model.setStep(3);
    expect(model.getStep()).toBe(3);
  });

  test('set from', () => {
    model.setFrom(1);
    expect(model.getFrom()).toBe(1);
  });

  test('set to', () => {
    model.setTo(50);
    expect(model.getTo()).toBe(50);
  });

  test('set to', () => {
    model.setTo(50);
    expect(model.getTo()).toBe(50);
  });

  test('set vertical', () => {
    model.setVertical(true);
    expect(model.getVertical()).toBe(true);
  });

  test('set tip', () => {
    model.setTip(true);
    expect(model.getTip()).toBe(true);
  });

  test('set range', () => {
    model.setRange(true);
    expect(model.getRange()).toBe(true);
  });

  test('set vertical', () => {
    model.setVertical(true);
    expect(model.getVertical()).toBe(true);
  });

  test('set scale', () => {
    model.setScale(true);
    expect(model.getScale()).toBe(true);
  });

  test('fill array of values', () => {
    model.setMin(-10);
    model.setMax(10);
    model.setStep(1);
    let step = model.getStep();
    model.setValueArray();
    let arr = [];
    for (let i = -10; i <= 10; i+=step) {
      arr.push(i)
    }
    expect(model.getValueArray()).toEqual(arr);
  });
});