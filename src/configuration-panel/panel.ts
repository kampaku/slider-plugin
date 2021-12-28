import './panel.css';
import createElement from '../helpers/create-element';
import type SuperSlider from '../slider/superSlider';
import { Events } from '../helpers/Events';
import type { SettingsInterface } from '../helpers/SettingsInterface';

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

class Panel {
  slider: SuperSlider;
  container: HTMLElement;
  fromInput!: HTMLInputElement;
  toInput!: HTMLInputElement;

  constructor(slider: SuperSlider, container: HTMLElement) {
    this.slider = slider;
    this.container = container;
    this.slider.attach(this.updateTo.bind(this));
    this.slider.attach(this.updateFrom.bind(this));
    this.renderPanel();
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
      return this.slider.getMin();
    },
    max: () => {
      return this.slider.getMax();
    },
    step: () => {
      return this.slider.getStep();
    },
    from: () => {
      return this.slider.getFrom();
    },
    to: () => {
      return this.slider.getTo();
    },
    range: () => {
      return this.slider.getRange();
    },
    tip: () => {
      return this.slider.getTip();
    },
    connect: () => {
      return this.slider.getConnect();
    },
    scale: () => {
      return this.slider.getScale();
    },
    vertical: () => {
      return this.slider.getVertical();
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
    { label: 'vertical', type: 'boolean' },
  ];

  changeVal(input: HTMLElement, inputName: { label: string; type: string }) {
    const inputHandler = ({ target }: Event) => {
      if (inputName.type === 'number') {
        let value = Number((<HTMLInputElement>target).value);
        this.setValues[inputName.label as keyof NumVal](value);
      } else if (inputName.type === 'boolean') {
        let value = (<HTMLInputElement>target).checked;
        this.setValues[inputName.label as keyof BoolVal](value);
      }
    };
    input.addEventListener('change', inputHandler);
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
    label.append(input, span);
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
    if (inputName.label === 'from') this.fromInput = input;
    if (inputName.label === 'to') this.toInput = input;
    label.append(span, input);
    this.changeVal(input, inputName);
    return label;
  }

  updateFrom(eventName: Events, settings: SettingsInterface) {
    if (eventName !== Events.changeFrom) return;
    const { from } = settings;
    this.fromInput.value = String(from);
  }

  updateTo(eventName: Events, settings: SettingsInterface) {
    if (eventName !== Events.changeTo) return;
    const { to } = settings;
    this.toInput.value = String(to);
  }

  renderPanel() {
    const panel = createElement('div', ['panel']);
    const firstRow = createElement('div', ['panel-row']);
    const secondRow = createElement('div', ['panel-row']);
    panel.append(firstRow, secondRow);
    this.container.append(panel);
    this.inputNames.forEach((inputName) => {
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

export default Panel;
