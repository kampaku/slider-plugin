import type Model from '../model/Model';
import type View from '../view/View';
import type { SettingsInterface } from '../../helpers/SettingsInterface';
import { Events } from '../../helpers/Events';
import isCross from '../../helpers/isCross';

class Presenter {
  model: Model;
  view: View;
  constructor(model: Model, view: View) {
    this.model = model;
    this.view = view;
    this.makeAttach();
    this.init(this.model.getSettings());
  }

  private onFromChange(eventName: Events, settings: SettingsInterface) {
    if (eventName !== Events.changeFrom) return;
    const { from } = settings;
    this.view.thumbFrom?.changeZindex(6);
    this.view.thumbTo?.changeZindex(5);
    this.view.thumbFrom?.move(from);
  }

  private onToChange(eventName: Events, settings: SettingsInterface) {
    if (eventName !== Events.changeTo) return;
    const { to } = settings;
    this.view.thumbFrom?.changeZindex(5);
    this.view.thumbTo?.changeZindex(6);
    this.view.thumbTo?.move(to);
  }

  private onTipUpdate(eventName: Events, settings: SettingsInterface) {
    if (eventName !== Events.changeFrom && eventName !== Events.changeTo) return;
    const { from, to, range } = settings;
    if (!range) {
      this.view.tipFrom?.displayValue(String(from));
      return;
    }
    if (this.view.tipFrom?.element && this.view.tipTo?.element) {
      const cross = isCross(this.view.tipFrom.element, this.view.tipTo.element);
      if (cross) {
        this.view.tipFrom.displayValue(`${from} − ${to}`);
        this.view.tipTo.element.style.visibility = 'hidden';
      } else {
        this.view.tipTo.element.style.visibility = 'visible';
        this.view.tipFrom?.displayValue(String(from));
        this.view.tipTo?.displayValue(String(to));
      }
    }
  }

  private handleThumbFromMove(eventName: Events, settings: SettingsInterface) {
    if (eventName !== Events.moveFrom) return;
    const { from } = settings;
    this.model.setFrom(from);
  }

  private handleThumbToMove(eventName: Events, settings: SettingsInterface) {
    if (eventName !== Events.moveTo) return;
    const { to } = settings;
    this.model.setTo(to);
  }

  private onUpdate(eventName: Events, settings: SettingsInterface) {
    if (eventName !== Events.update) return;
    this.view.destroy();
    this.init(settings);
  }

  private onConnectUpdate(eventName: Events, settings: SettingsInterface) {
    if (eventName !== Events.changeFrom && eventName !== Events.changeTo)
      return;
    const { from, to } = settings;
    this.view.connect?.setPosition(from, to);
    this.view.scale?.updateSettings(settings);
  }

  private init(settings: SettingsInterface) {
    const { from, to } = settings;
    this.view.render(settings);
    this.view.thumbFrom?.move(from);
    this.view.thumbTo?.move(to);
    if (settings.connect) {
      this.view.connect?.setPosition(from, to);
    }
  }

  private makeAttach() {
    this.view.attach(this.handleThumbFromMove.bind(this));
    this.view.attach(this.handleThumbToMove.bind(this));
    this.model.attach(this.onFromChange.bind(this));
    this.model.attach(this.onToChange.bind(this));
    this.model.attach(this.onTipUpdate.bind(this));
    this.model.attach(this.onUpdate.bind(this));
    this.model.attach(this.onConnectUpdate.bind(this));
  }
}

export default Presenter;