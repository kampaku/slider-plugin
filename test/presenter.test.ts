import Presenter from '../src/presenter/presenter';
import Model from '../src/model/model';
import View from '../src/view/view';
import * as $ from 'jquery';

describe('test presenter', () => {
  const settings = {
    min: 1,
    max: 5,
    step: 1,
    from: 1,
    to: 5,
    range: true,
    tip: true,
    connect: true,
    scale: true,
    vertical: false,
  };
  let presenter: Presenter;
  let model: Model;
  let view: View;
  jest.useFakeTimers();
  beforeEach(() => {
    document.body.innerHTML = '';
    let div = document.createElement('div');
    document.body.append(div);
    view = new View($(div));
    model = new Model(settings);
    presenter = new Presenter(model, view);
    jest.runAllTimers();
  });
  test('presenter defined', () => {
    expect(presenter).toBeDefined();
  });

  test('presenter view', () => {
    expect(presenter.view.sliderContainer).toBeDefined();
  });

  test('should set max', () => {
    presenter.setMax(100);
    expect(model.getMax()).toBe(100);
  });

  test('should set min', () => {
    presenter.setMin(0);
    expect(model.getMin()).toBe(0);
  });

  test('should set step', () => {
    presenter.setStep(2);
    expect(model.getStep()).toBe(2);
  });

  test('should set from', () => {
    presenter.setFrom(5);
    expect(model.getFrom()).toBe(5);
  });

  test('should set connect', () => {
    presenter.setConnect(true);
    expect(model.getConnect()).toBeTruthy();
  });

  test('should set range', () => {
    presenter.setRange(true);
    expect(model.getRange()).toBeTruthy();
  });

  test('should set scale', () => {
    presenter.setScale(true);
    expect(model.getScale()).toBeTruthy();
  });

  test('should set vertical', () => {
    presenter.setVertical(true);
    expect(model.getVertical()).toBeTruthy();
  });

  test('should set tip', () => {
    presenter.setTip(true);
    expect(model.getTip()).toBeTruthy();
  });

  test('should set to', () => {
    presenter.setTo(30);
    expect(model.getTo()).toBe(30);
  });

  test('should not connect', () => {
    presenter.setConnect(false);
    expect(model.getConnect()).toBeFalsy();
  });

  test('should not range', () => {
    presenter.setRange(false);
    expect(model.getRange()).toBeFalsy();
  });

  test('should not tip', () => {
    presenter.setTip(false);
    expect(model.getTip()).toBeFalsy();
  });
});