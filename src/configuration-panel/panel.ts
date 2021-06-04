import createElement from '../helpers/create-element';
import type Presenter from '../presenter/presenter';

type NumVal = {
  min: (value: number) => void;
  max: (value: number) => void;
  step: (value: number) => void;
  from: (value: number) => void;
  to: (value: number) => void;
};

type BoolVal = {
  range: (value: boolean) => void;
  tip: (value: boolean) => void;
  vertical: (value: boolean) => void;
  connect: (value: boolean) => void;
  scale: (value: boolean) => void;
};

export default class Panel {
  slider: Presenter;
  container: HTMLElement;

  constructor(slider: Presenter, selector: string) {
    this.slider = slider;
    this.container = document.querySelector(selector) as HTMLElement;
  }

  setValues = {
    min: (value: number) => this.slider.setMin(value),
    max: (value: number) => this.slider.setMax(value),
    step: (value: number) => this.slider.setStep(value),
    from: (value: number) => this.slider.setFrom(value),
    to: (value: number) => this.slider.setTo(value),
    range: (value: boolean) => this.slider.setRange(value),
    tip: (value: boolean) => this.slider.setTip(value),
    vertical: (value: boolean) => this.slider.setVertical(value),
    connect: (value: boolean) => this.slider.setConnect(value),
    scale: (value: boolean) => this.slider.setScale(value),
  };

  initValues = {
    min: () => {
      return this.slider.model.getMin();
    },
    max: () => {
      return this.slider.model.getMax();
    },
    step: () => {
      return this.slider.model.getStep();
    },
    from: () => {
      return this.slider.model.getFrom();
    },
    to: () => {
      return this.slider.model.getTo();
    },
    range: () => {
      return this.slider.model.getRange();
    },
    tip: () => {
      return this.slider.model.getTip();
    },
    connect: () => {
      return this.slider.model.getConnect();
    },
    scale: () => {
      return this.slider.model.getScale();
    },
    vertical: () => {
      return this.slider.model.getVertical();
    },
  };

  inputNames = [
    { label: 'min', type: 'number' },
    { label: 'max', type: 'number' },
    { label: 'step', type: 'number' },
    { label: 'from', type: 'number' },
    { label: 'to', type: 'number' },
    { label: 'range', type: 'boolean' },
    { label: 'tip', type: 'boolean' },
    { label: 'connect', type: 'boolean' },
    { label: 'scale', type: 'boolean' },
    { label: 'vertical', type: 'boolean' }
  ];

  changeVal(input: HTMLElement, inputName: { label: string; type: string }) {
    input.addEventListener('change', ({ target }: Event) => {
      if (inputName.type === 'number') {
        let value = Number((<HTMLInputElement>target).value);
        this.setValues[inputName.label as keyof NumVal](value);
      } else if (inputName.type === 'boolean') {
        let value = (<HTMLInputElement>target).checked;
        this.setValues[inputName.label as keyof BoolVal](value);
      }
    });
  }

  createCheckbox(inputName: { label: string; type: string }) {
    let label = createElement('label', ['panel__toggle']);
    label.textContent = inputName.label;
    let input = createElement('input', ['panel__toggle-input']);
    let span = createElement('span', ['panel__toggle-slider']);
    input.setAttribute('type', 'checkbox');
    if (this.initValues[inputName.label as keyof BoolVal]()) {
      input.setAttribute('checked', '');
    }
    label.append(input);
    label.append(span);
    this.changeVal(input, inputName);
    return label;
  }

  createInput(inputName: { label: string; type: string }) {
    let label = createElement('label', ['panel__label-number']);
    let span = createElement('span', ['label-number']);
    let input = createElement('input', ['panel-number']) as HTMLInputElement;
    span.textContent = inputName.label;
    input.value = String(this.initValues[inputName.label as keyof NumVal]());
    input.setAttribute('type', 'number');
    label.append(span);
    label.append(input);
    this.changeVal(input, inputName);
    return label;
  }

  renderPanel() {
    const panel = createElement('div', ['panel']);
    const firstRow = createElement('div', ['panel-row']);
    const secondRow = createElement('div', ['panel-row']);
    panel.append(firstRow, secondRow);
    this.container.append(panel);
    this.inputNames.forEach(inputName => {
      let { type } = inputName;
      if (type === 'number') {
        let input = this.createInput(inputName);
        firstRow.append(input);
      }
      if (type === 'boolean') {
        let checkbox = this.createCheckbox(inputName);
        secondRow.append(checkbox);
      }
    });
  }
}
