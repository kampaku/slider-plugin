import './style.css';
import Presenter from './presenter/presenter';
import View from './view/view';
import Model from './model/model';

export default class SuperSlider {
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
  }

  setMax(value: number) {
    this.model.setMax(value);
  }

  setFrom(value: number) {
    const validValue = this.model.validateValue(value);
    this.model.setFrom(validValue);
  }

  setTo(value: number) {
    const validValue = this.model.validateValue(value);
    this.model.setTo(validValue);
  }

  setStep(value: number) {
    this.model.setStep(value);
  }

  setVertical(value: boolean) {
    this.model.setVertical(value);
  }

  setConnect(value: boolean) {
    this.model.setConnect(value);
  }

  setRange(value: boolean) {
    this.model.setRange(value);
  }

  setScale(value: boolean) {
    this.model.setScale(value);
  }

  setTip(value: boolean) {
    this.model.setTip(value);
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
}