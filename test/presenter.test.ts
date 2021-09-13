import Presenter from '../src/presenter/presenter';
import Model from '../src/model/model';
import View from '../src/view/view';
import * as $ from 'jquery';

describe('test presenter', () => {
  let div = document.createElement('div');
  const settings = {
    min: -10,
    max: 10,
    step: 1,
    from: -10,
    tip: true,
    connect: true,
    scale: true,
  };
  let presenter: Presenter;
  let model: Model;
  let view = new View($(div));
  beforeEach(() => {
    document.body.innerHTML = '';
    document.body.append(div);
    model = new Model();
    presenter = new Presenter(model, view);
    presenter.create(settings);
  });
  test('presenter defined', () => {
    expect(presenter).toBeDefined();
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

describe('test creating presenter', () => {
  let div = document.createElement('div');
  const settings = {
    min: -10,
    max: 10,
    step: 1,
  };
  let presenter: Presenter;
  let model: Model;
  let view = new View($(div));

  beforeEach(() => {
    document.body.innerHTML = '';
    document.body.append(div);
    model = new Model();
    presenter = new Presenter(model, view);
  });

  test('should create with vertical', () => {
    presenter.create({ ...settings, vertical: true });
    expect(model.getVertical()).toBe(true);
  });

  test('should create with to', () => {
    presenter.create({ ...settings, to: 12 });
    expect(model.getTo()).toBe(12);
  });

  test('should create with not range', () => {
    presenter.create({ ...settings, range: true });
    expect(model.getRange()).toBe(true);
  });

  test('should create with false tip', () => {
    presenter.create({ ...settings, tip: false });
    expect(model.getTip()).toBe(false);
  });
});