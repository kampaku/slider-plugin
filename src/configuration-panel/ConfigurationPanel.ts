import type SuperSlider from '../slider/SuperSlider';
import type { ModelEvents } from '../helpers/Events';
import './configuration-panel.scss';

interface NumVal {
  max: (value: number) => void;
  min: (value: number) => void;
  step: (value: number) => void;
  from: (value: number) => void;
  to: (value: number) => void;
}

interface BoolVal {
  range: (value: boolean) => void;
  tip: (value: boolean) => void;
  vertical: (value: boolean) => void;
  connect: (value: boolean) => void;
  scale: (value: boolean) => void;
}

class ConfigurationPanel {
  slider: SuperSlider;
  container: HTMLElement;
  minInput: HTMLInputElement;
  maxInput: HTMLInputElement;
  stepInput: HTMLInputElement;
  fromInput: HTMLInputElement;
  toInput: HTMLInputElement;
  rangeInput: HTMLInputElement;
  tipInput: HTMLInputElement;
  connectInput: HTMLInputElement;
  scaleInput: HTMLInputElement;
  verticalInput: HTMLInputElement;

  constructor(slider: SuperSlider, container: HTMLElement) {
    this.slider = slider;
    this.container = container;
    this.findElements();
    this.initValues();
    this.bindEventListener();
    this.slider.attach(this.update.bind(this));
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

  private findElements() {
    const minInput = this.container.querySelector('[data-name="min"]');
    if (minInput instanceof HTMLInputElement) {
      this.minInput = minInput;
    }
    const maxInput = this.container.querySelector('[data-name="max"]');
    if (maxInput instanceof HTMLInputElement) {
      this.maxInput = maxInput;
    }
    const stepInput = this.container.querySelector('[data-name="step"]');
    if (stepInput instanceof HTMLInputElement) {
      this.stepInput = stepInput;
    }
    const fromInput = this.container.querySelector('[data-name="from"]');
    if (fromInput instanceof HTMLInputElement) {
      this.fromInput = fromInput;
    }
    const toInput = this.container.querySelector('[data-name="to"]');
    if (toInput instanceof HTMLInputElement) {
      this.toInput = toInput;
    }
    const rangeInput = this.container.querySelector('[data-name="range"]');
    if (rangeInput instanceof HTMLInputElement) {
      this.rangeInput = rangeInput;
    }
    const tipInput = this.container.querySelector('[data-name="tip"]');
    if (tipInput instanceof HTMLInputElement) {
      this.tipInput = tipInput;
    }
    const connectInput = this.container.querySelector('[data-name="connect"]');
    if (connectInput instanceof HTMLInputElement) {
      this.connectInput = connectInput;
    }
    const scaleInput = this.container.querySelector('[data-name="scale"]');
    if (scaleInput instanceof HTMLInputElement) {
      this.scaleInput = scaleInput;
    }
    const verticalInput = this.container.querySelector('[data-name="vertical"]');
    if (verticalInput instanceof HTMLInputElement) {
      this.verticalInput = verticalInput;
    }
  }

  private initValues() {
    this.minInput.value = String(this.slider.getMin());
    this.maxInput.value = String(this.slider.getMax());
    this.stepInput.value = String(this.slider.getStep());
    this.fromInput.value = String(this.slider.getFrom());
    this.toInput.value = String(this.slider.getTo());
    this.rangeInput.checked = this.slider.getRange();
    this.tipInput.checked = this.slider.getTip();
    this.connectInput.checked = this.slider.getConnect();
    this.scaleInput.checked = this.slider.getScale();
    this.verticalInput.checked = this.slider.getVertical();

    this.toInput.disabled = !this.rangeInput.checked;
  }

  private setValue = ({ target }: Event) => {
    if (!target) return;
    const input = (<HTMLInputElement>target).closest(
      '[data-name]',
    ) as HTMLInputElement;
    if (!input) return;

    const name = input.dataset.name;

    if (!name) return;

    if (input.type === 'number') {
      const value = Number(input.value);
      this.setValues[name as keyof NumVal](value);
    } else if (input.type === 'checkbox') {
      const checked = !input.checked;
      this.setValues[name as keyof BoolVal](!checked);
    }
  };

  private update(args: ModelEvents) {
    const shouldUpdate =
      args.kind === 'stateUpdate' ||
      args.kind === 'changeFrom' ||
      args.kind === 'changeTo';
    if (!shouldUpdate) return;
    this.initValues();
  }

  private bindEventListener() {
    this.container.addEventListener('change', this.setValue);
  }
}

export default ConfigurationPanel;
