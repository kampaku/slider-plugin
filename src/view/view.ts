import createElement from '../helpers/create-element';
import type { ModelInterface } from '../model/modelInterface';
import Track from './track';
import Thumb from './thumb';
import Tip from './tip';
import Connect from './connect';
import Scale from './scale';

export default class View {
  app: HTMLElement | null;
  thumbFrom: Thumb;
  thumbTo: Thumb;
  tipFrom: Tip;
  tipTo: Tip;
  track: Track;
  connect: Connect;
  sliderContainer: HTMLElement;
  scale: Scale;

  constructor() {
    this.app = document.querySelector('#root');
    this.sliderContainer = createElement('div');
    this.thumbFrom = new Thumb();
    this.track = new Track();
    this.thumbTo = new Thumb();
    this.tipFrom = new Tip();
    this.tipTo = new Tip();
    this.connect = new Connect();
    this.scale = new Scale();
  }

  render(props: ModelInterface) {
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
    } = props;
    this.app?.append(this.sliderContainer);
    this.track.render(vertical);
    this.thumbFrom.render(vertical);
    if (vertical) {
      this.sliderContainer.classList.add('slider-vertical');
    } else {
      this.sliderContainer.classList.add('slider');
    }

    this.sliderContainer.append(this.track.element);
    this.track.element.append(this.thumbFrom.element);

    if (tip) {
      this.tipFrom.render(vertical);
      this.thumbFrom.element.append(this.tipFrom.element);
    }

    if (range) {
      this.thumbTo.render(vertical);
      this.track.element.append(this.thumbTo.element);
      if (tip) {
        this.tipTo.render(vertical);
        this.thumbTo.element.append(this.tipTo.element);
      }
    }

    if (connect) {
      this.connect.render(vertical);
      this.track.element.append(this.connect.element);
    }

    if (scale) {
      this.scale.render(vertical);
      this.sliderContainer.append(this.scale.element);
    }
  }

  destroy() {
    // this.sliderContainer.remove();
    const delNodes = (node: ChildNode) => {
      if (node.firstChild) {
        // console.log(node.firstChild)
        delNodes(node.firstChild);
      }
      // console.log(node.firstChild)

      node.firstChild?.remove();
    };

    delNodes(this.sliderContainer);
    // delNodes(this.scale.element);
    // this.scale.element.innerHTML = '';
    // // this.scale.element.remove()
    // this.tipTo.element.remove();
    // this.tipFrom.element.remove();
    // this.thumbTo.element.remove();

    // console.log(this.scale.element.firstChild);
    // // this.sliderContainer.remove();
    this.sliderContainer.innerHTML = '';
  }
}
