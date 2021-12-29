import SuperSlider from '../src/slider/SuperSlider';
import * as $ from 'jquery';

describe('test slider', () => {
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
  }
  let slider: SuperSlider;
  beforeEach(() => {
    document.body.innerHTML = '';
    let div = document.createElement('div');
    document.body.append(div);
    slider = new SuperSlider($(div), settings);
  });
  test('slider defined', () => {
    expect(slider).toBeDefined();
  });

  test('should set max', () => {
    slider.setMax(100);
    expect(slider.getMax()).toBe(100);
  });

  test('should set min', () => {
    slider.setMin(0);
    expect(slider.getMin()).toBe(0);
  });

  test('should set step', () => {
    slider.setStep(2);
    expect(slider.getStep()).toBe(2);
  });

  test('should set from', () => {
    slider.setFrom(5);
    expect(slider.getFrom()).toBe(5);
  });

  test('should set connect', () => {
    slider.setConnect(true);
    expect(slider.getConnect()).toBeTruthy();
  });

  test('should set range', () => {
    slider.setRange(true);
    expect(slider.getRange()).toBeTruthy();
  });

  test('should set scale', () => {
    slider.setScale(true);
    expect(slider.getScale()).toBeTruthy();
  });

  test('should set vertical', () => {
    slider.setVertical(true);
    expect(slider.getVertical()).toBeTruthy();
  });

  test('should set tip', () => {
    slider.setTip(true);
    expect(slider.getTip()).toBeTruthy();
  });

  test('should set to', () => {
    slider.setTo(3);
    expect(slider.getTo()).toBe(3);
  });

  test('should not connect', () => {
    slider.setConnect(false);
    expect(slider.getConnect()).toBeFalsy();
  });

  test('should not range', () => {
    slider.setRange(false);
    expect(slider.getRange()).toBeFalsy();
  });

  test('should not tip', () => {
    slider.setTip(false);
    expect(slider.getTip()).toBeFalsy();
  });
});