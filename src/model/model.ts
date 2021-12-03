import Observable from '../helpers/Observable';
import { Events } from '../helpers/Events';

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

export default class Model extends Observable {
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
  valueArray: number[];

  constructor({
    min,
    max,
    step = 1,
    from = 0,
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
    this.valueArray = [];
    this.setValueArray();
  }

  setMin(value: number) {
    this.min = value;
    this.setValueArray();
    this.notify(Events.update, { ...this.getSettings(), min: value });
  }

  setMax(value: number) {
    this.max = value;
    this.setValueArray();
    this.notify(Events.update, { ...this.getSettings(), max: value });
  }

  setFrom(value: number) {
    if (value > this.to) return;
    this.from = value;
    this.notify(Events.changeFrom, { ...this.getSettings(), from: value });
  }

  setTo(value: number) {
    if (value < this.from) return;
    this.to = value;
    this.notify(Events.changeTo, { ...this.getSettings(), to: value });
  }

  setStep(value: number) {
    this.step = value;
    this.setValueArray();
    this.notify(Events.update, { ...this.getSettings(), step: value });
  }

  setVertical(value: boolean) {
    this.vertical = value;
    this.notify(Events.update, { ...this.getSettings(), vertical: value });
  }

  setTip(value: boolean) {
    this.tip = value;
    this.notify(Events.update, { ...this.getSettings(), tip: value });
  }

  setRange(value: boolean) {
    this.range = value;
    if (!value) this.setTo(this.max);
    this.notify(Events.update, { ...this.getSettings(), range: value });
  }

  setConnect(value: boolean) {
    this.connect = value;
    this.notify(Events.update, { ...this.getSettings(), connect: value });
  }

  setScale(value: boolean) {
    this.scale = value;
    this.notify(Events.update, { ...this.getSettings(), scale: value });
  }

  setValueArray() {
    if (this.valueArray.length > 0) {
      this.valueArray = [];
    }

    for (let i = this.min; i <= this.max; i += this.step) {
      this.valueArray.push(i);
    }
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
      valueArray: this.valueArray,
    };
  }
}
