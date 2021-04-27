import type Thumb from 'src/view/thumb';
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
    this.model.setValueArray();
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
      valueArray: this.model.getValueArray(),
    };

    return props;
  }

  calculatePosition(value: number) {
    const arr = this.model.getValueArray();
    const index = arr.indexOf(value);
    const position = (100 / arr.length) * index + '%';
    return position;
  }

  getOrientation() {
    return {
      clientXY: this.model.vertical ? 'clientY' : 'clientX',
      start: this.model.vertical ? 'top' : 'left',
      offsetWH: this.model.vertical ? 'offsetHeight' : 'offsetWidth',
    };
  }

  thumbHandler = (event: MouseEvent, thumb: Thumb) => {
    const { clientXY, start, offsetWH } = this.getOrientation();
    const shiftThumb =
      event[clientXY] - thumb.element.getBoundingClientRect()[start];

    const onMouseMove = (event: MouseEvent) => {
      event.preventDefault();
      let newPosition =
        event[clientXY] -
        shiftThumb -
        this.view.sliderContainer.getBoundingClientRect()[start];

      if (newPosition < 0) {
        newPosition = 0;
      }
      const sliderEnd =
        this.view.sliderContainer[offsetWH] - thumb.element[offsetWH];
      if (newPosition > sliderEnd) {
        newPosition = sliderEnd;
      }

      const arr = this.model.getValueArray();
      const index = Math.floor((newPosition / sliderEnd) * (arr.length - 1));
      const pos = this.calculatePosition(arr[index]);

      if (thumb === this.view.thumbFrom) {
        this.model.setFrom(arr[index]);
        thumb.move(start, pos);
      }
      if (thumb === this.view.thumbTo) {
        this.model.setTo(arr[index]);
        thumb.move(start, pos);
      }
    };

    function onMouseUp() {
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mousemove', onMouseMove);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  render() {
    const props = this.getProperties();
    const { start } = this.getOrientation();
    const startPos = this.calculatePosition(props.from);
    this.view.render(props);
    this.view.thumbFrom.addListener(this.thumbHandler);
    this.view.thumbTo.addListener(this.thumbHandler);
    this.view.thumbFrom.move(start, startPos);
    if (props.range) {
      const thumbToPos = this.calculatePosition(props.to);
      this.view.thumbTo.move(start, thumbToPos);
    }
  }

  private destroy() {
    this.view.sliderContainer.remove();
  }
}
