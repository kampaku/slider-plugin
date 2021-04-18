import type { ModelInterface } from '../model/modelInterface';

type Options = {
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
};

export default class Presenter {
  model: any;
  view: any;
  constructor(model: any, view: any) {
    this.model = model;
    this.view = view;
  }

  create(options: Options) {
    const {
      min,
      max,
      step,
      from,
      to,
      vertical,
      tip,
      range,
      connect,
      scale,
    } = options;

    this.model.setMin(min);
    this.model.setMax(max);
    if (step) this.model.setStep(step);
    if (from) this.model.setFrom(from);
    if (to) this.model.setTo(to);
    if (vertical) this.model.setVertical(vertical);
    if (tip) this.model.setTip(tip);
    if (range) this.model.setRange(range);
    if (connect) this.model.setConnect(connect);
    if (scale) this.model.setScale(scale);

    this.render();
  }

  getProperties() {
    
    const props: ModelInterface = {
      min: this.model.getMin(),
      max: this.model.getMax(),
      step: this.model.getStep(),
      from: this.model.getFrom(),
      to: this.model.getTo(),
      vertical: this.model.getVertical(),
      tip: this.model.getTip(),
      range: this.model.getRange(),
      connect: this.model.getConnect(),
      scale: this.model.getScale(),
    };

    return props;
  }

  render() {
    const props = this.getProperties();
    this.view.render(props);
  }
}
