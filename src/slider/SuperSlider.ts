import './style.scss';
import Presenter from './presenter/Presenter';
import View from './view/View';
import Model from './model/Model';

class SuperSlider {
  readonly view: View;
  readonly model: Model;
  private presenter: Presenter;

  constructor(element: JQuery<HTMLElement>, settings: SliderOptions) {
    this.model = new Model(settings);
    this.view = new View(element);
    this.presenter = new Presenter(this.model, this.view);
  }

  setMin(value: number) {
    this.model.setMin(value);
    return this;
  }

  setMax(value: number) {
    this.model.setMax(value);
    return this;
  }

  setFrom(value: number) {
    const validValue = this.model.closestValue(value);
    this.model.setFrom(validValue);
    return this;
  }

  setTo(value: number) {
    const validValue = this.model.closestValue(value);
    this.model.setTo(validValue);
    return this;
  }

  setStep(value: number) {
    this.model.setStep(value);
    return this;
  }

  setVertical(value: boolean) {
    this.model.setVertical(value);
    return this;
  }

  setConnect(value: boolean) {
    this.model.setConnect(value);
    return this;
  }

  setRange(value: boolean) {
    this.model.setRange(value);
    return this;
  }

  setScale(value: boolean) {
    this.model.setScale(value);
    return this;
  }

  setTip(value: boolean) {
    this.model.setTip(value);
    return this;
  }

  getMin() {
    return this.model.min;
  }

  getMax() {
    return this.model.max;
  }

  getFrom() {
    return this.model.from;
  }

  getTo() {
    return this.model.to;
  }

  getStep() {
    return this.model.step;
  }

  getVertical() {
    return this.model.vertical;
  }

  getConnect() {
    return this.model.connect;
  }

  getRange() {
    return this.model.range;
  }

  getScale() {
    return this.model.scale;
  }

  getTip() {
    return this.model.tip;
  }

  attach(observer: Observer) {
    this.model.attach(observer);
  }

  detach(observer: Observer) {
    this.model.detach(observer);
  }
}

export default SuperSlider;
