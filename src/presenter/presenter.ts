import type Model from '../model/model';
import type View from '../view/view';
import type { SettingsInterface } from '../helpers/SettingsInterface';
import { Events } from '../helpers/Events';

export default class Presenter {
  model: Model;
  view: View;

  constructor(model: Model, view: View) {
    this.model = model;
    this.view = view;
    this.view.attach(this.handleThumbFromMove.bind(this));
    this.view.attach(this.handleThumbToMove.bind(this));
    this.model.attach(this.onFromChange.bind(this));
    this.model.attach(this.onToChange.bind(this));
    this.model.attach(this.onTipFromUpdate.bind(this));
    this.model.attach(this.onTipToUpdate.bind(this));
    this.model.attach(this.onUpdate.bind(this));
    this.model.attach(this.onConnectUpdate.bind(this));
    this.init(this.model.getSettings());
  }

  private onFromChange(eventName: Events, settings: SettingsInterface) {
    if (eventName !== Events.changeFrom) return;
    const { from } = settings;
    this.view.thumbFrom?.move(from);
  }

  private onToChange(eventName: Events, settings: SettingsInterface) {
    if (eventName !== Events.changeTo) return;
    const { to } = settings;
    this.view.thumbTo?.move(to);
  }

  private onTipFromUpdate(eventName: Events, settings: SettingsInterface) {
    if (eventName !== Events.changeFrom) return;
    const { from } = settings;
    this.view.tipFrom?.displayValue(from);
  }

  private onTipToUpdate(eventName: Events, settings: SettingsInterface) {
    if (eventName !== Events.changeTo) return;
    const { to } = settings;
    this.view.tipTo?.displayValue(to);
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
}
