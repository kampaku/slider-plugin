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
    console.log(this.model.getValueArray())
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
      valueArray: this.model.getValueArray()
    };

    return props;
  }

  move(value: number, thumb: Thumb) {

  }

  thumbHandler = (event: MouseEvent, thumb: Thumb) => {
    // console.log(thumb)
    //const thumb = event.target;
    console.log(thumb === this.view.thumbTo)
    const clientOreintation = this.model.vertical ? 'clientY' : 'clientX';
    const side = this.model.vertical ? 'top' : 'left'
    const offsetWH = this.model.vertical ? 'offsetHeight' : 'offsetWidth'

    let shiftThumb = event[clientOreintation] - thumb.element.getBoundingClientRect()[side];

      const onMouseMove =  (event: MouseEvent) => {

        event.preventDefault();
        let newPosition = event[clientOreintation] - shiftThumb - this.view.sliderContainer.getBoundingClientRect()[side];

        if (newPosition < 0) {
          newPosition = 0;
        }
        let sliderEnd = this.view.sliderContainer[offsetWH] - thumb.element[offsetWH];
        if (newPosition > sliderEnd) {
          newPosition = sliderEnd;
        }
        
        let arr = this.model.getValueArray();
        const elemWidth = sliderEnd / (arr.length - 1);
        
        let index = Math.floor((newPosition / sliderEnd) * (arr.length - 1));
        thumb.element.style[side] = elemWidth * index + 'px';
        
        console.log(arr[index])
        // console.log(elemWidth, this.view.sliderContainer[offsetWH])
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
    this.view.thumbFrom.addListener(this.thumbHandler)
    this.view.thumbTo.addListener(this.thumbHandler)
  }
}
