import type { ModelInterface } from './modelInterface';

export default class Model implements ModelInterface {
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
  constructor() {
    this.min = 0;
    this.max = 0;
    this.step = 1;
    this.from = 0;
    this.to = 0;
    this.vertical = false;
    this.tip = false;
    this.range = false;
    this.connect = false;
    this.scale = false;
    this.valueArray = [];
  }

  setMin(value: number) {
    this.min = value;
  }

  setMax(value: number) {
    this.max = value;
  }

  setFrom(value: number) {
    this.from = value;
  }

  setTo(value: number) {
    this.to = value;
  }

  setStep(value: number) {
    this.step = value;
  }

  setVertical(value: boolean) {
    this.vertical = value;
  }

  setTip(value: boolean) {
    this.tip = value;
  }

  setRange(value: boolean) {
    this.range = value;
    this.to = this.max;
  }

  setConnect(value: boolean) {
    this.connect = value;
  }

  setScale(value: boolean) {
    this.scale = value;
  }

  getMin() {
    return this.min;
  }

  getMax() {
    return this.max;
  }

  getFrom() {
    return this.from;
  }

  getTo() {
    return this.to;
  }

  getStep() {
    return this.step;
  }

  getVertical() {
    return this.vertical;
  }

  getTip() {
    return this.tip;
  }

  getRange() {
    return this.range;
  }

  getConnect() {
    return this.connect;
  }

  getScale() {
    return this.scale;
  }

  setValueArray() {
    if (this.valueArray.length > 0) {
      this.valueArray = [];
      console.log(this.min)
    }

    for (let i = this.min; i <= this.max; i += this.step) {
      this.valueArray.push(i);
    }
  }

  getValueArray() {
    return this.valueArray;
  }
}
