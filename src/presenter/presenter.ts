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

  move = (event: MouseEvent) => {

    const clientOreintation = this.model.vertical ? 'clientY' : 'clientX';
    const side = this.model.vertical ? 'top' : 'left'
    const offsetWH = this.model.vertical ? 'offsetHeight' : 'offsetWidth'

    let shiftThumb = event[clientOreintation] - this.view.thumbFrom.element.getBoundingClientRect()[side];

      const onMouseMove =  (event: MouseEvent) => {
        event.preventDefault();
        let newLeft = event[clientOreintation] - shiftThumb - this.view.sliderContainer.getBoundingClientRect()[side];

        if (newLeft < 0) {
          newLeft = 0;
        }
        let sliderEnd = this.view.sliderContainer[offsetWH] - this.view.thumbFrom.element[offsetWH];
        if (newLeft > sliderEnd) {
          newLeft = sliderEnd;
        }

        this.view.thumbFrom.element.style[side] = newLeft + 'px';
        let max: number = this.model.getMax()
        let min: number = this.model.getMin()
        let rangeArray = () => {
          const arr = [];
          for(let i = min; i < max; i++) {
            arr.push(i)
          }
          return arr
        }
        let arr = rangeArray()
        let index = Math.floor((newLeft / sliderEnd) * rangeArray.length)
        console.log(arr[index])
      }

      function onMouseUp() {
        document.removeEventListener('mouseup', onMouseUp);
        document.removeEventListener('mousemove', onMouseMove);
      }

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
  }

  render() {
    const props = this.getProperties();
    this.view.render(props);
    this.view.thumbFrom.addListener(this.move)
  }
}
