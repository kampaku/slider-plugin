import type { SettingsInterface } from '../helpers/SettingsInterface';

export default class Model {
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
                min = 0,
                max = 1,
                step = 1,
                from = 0,
                to = 0,
                vertical = false,
                tip = false,
                range = false,
                connect = false,
                scale = false,
              }: SettingsInterface) {
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
    }

    for (let i = this.min; i <= this.max; i += this.step) {
      this.valueArray.push(i);
    }
  }

  getValueArray() {
    return this.valueArray;
  }

  convertToValue(coord: { newPosition: number, sliderEnd: number }) {
    // console.log(coord);
    const {newPosition, sliderEnd} = coord;
    const arr = this.valueArray;
    const index = Math.floor((newPosition / sliderEnd) * (arr.length - 1));
    this.setFrom(arr[index]);
    console.log(this.getFrom());
  }
}
