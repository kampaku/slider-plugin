import Observable from '../../helpers/Observable';
import type { ModelEvents } from '../../helpers/Events';

interface SliderOptions {
  min: number;
  max: number;
  step?: number;
  from?: number;
  to?: number;
  vertical?: boolean;
  tip?: boolean;
  range?: boolean;
  connect?: boolean;
  scale?: boolean;
}

class Model extends Observable<ModelEvents> {
  min: number;
  max: number;
  step: number;
  from: number;
  to: number;
  vertical: boolean;
  tip: boolean;
  range: boolean;
  connect: boolean;
  scale: boolean;
  valuesArray: number[];

  constructor({
    min,
    max,
    step = 1,
    from = min,
    to = max,
    vertical = false,
    tip = false,
    range = false,
    connect = false,
    scale = false,
  }: SliderOptions) {
    super();
    this.min = min;
    this.max = max;
    this.step = step;
    this.from = from;
    this.to = to;
    this.vertical = vertical;
    this.tip = tip;
    this.range = range;
    this.connect = connect;
    this.scale = scale;
    this.valuesArray = [];
    this.setValuesArray();
  }

  setMin(value: number) {
    if (value >= this.max) return;
    this.min = this.roundValue(value);
    this.setValuesArray();
    this.notify({ kind: 'stateUpdate', state: { ...this.getSettings() } });
  }

  setMax(value: number) {
    if (value <= this.min) return;
    this.max = this.roundValue(value);
    this.setValuesArray();
    this.notify({ kind: 'stateUpdate', state: { ...this.getSettings() } });
  }

  setFrom(value: number) {
    if (value > this.to && this.range) return;
    this.from = this.roundValue(value);
    this.notify({ kind: 'changeFrom', value: value });
  }

  setTo(value: number) {
    if (value < this.from || value > this.max) return;
    this.to = this.roundValue(value);
    this.notify({ kind: 'changeTo', value: value });
  }

  setStep(value: number) {
    if (Math.abs(this.max - this.min) <= value || value <= 0) return;
    this.step = this.roundValue(value);
    this.setValuesArray();
    this.notify({ kind: 'stateUpdate', state: { ...this.getSettings() } });
  }

  setVertical(value: boolean) {
    this.vertical = value;
    this.notify({ kind: 'stateUpdate', state: { ...this.getSettings() } });
  }

  setTip(value: boolean) {
    this.tip = value;
    this.notify({ kind: 'stateUpdate', state: { ...this.getSettings() } });
  }

  setRange(value: boolean) {
    if (this.from > this.to) {
      [this.to, this.from] = [this.from, this.to];
    }
    this.range = value;
    this.notify({ kind: 'stateUpdate', state: { ...this.getSettings() } });
  }

  setConnect(value: boolean) {
    this.connect = value;
    this.notify({ kind: 'stateUpdate', state: { ...this.getSettings() } });
  }

  setScale(value: boolean) {
    this.scale = value;
    this.notify({ kind: 'stateUpdate', state: { ...this.getSettings() } });
  }

  getSettings() {
    return {
      min: this.min,
      max: this.max,
      step: this.step,
      from: this.from,
      to: this.to,
      vertical: this.vertical,
      tip: this.tip,
      range: this.range,
      connect: this.connect,
      scale: this.scale,
      valueArray: this.valuesArray,
    };
  }

  closestValue(value: number) {
    return this.valuesArray.reduce((prev, curr) =>
      Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev,
    );
  }

  private setValuesArray() {
    this.valuesArray = [];

    for (let i = this.min; i < this.max; i += this.step) {
      this.valuesArray.push(this.roundValue(i));
    }
    if (this.valuesArray[this.valuesArray.length - 1] !== this.max) {
      this.valuesArray.push(this.max);
    }

    this.from = this.closestValue(this.from);
    this.to = this.closestValue(this.to);
  }

  private roundValue(value: number) {
    return Number(value.toFixed(3));
  }
}

export default Model;
