import type SettingsInterface from '../../helpers/SettingsInterface';
import Events from '../../helpers/Events';
import type Model from '../model/Model';
import type View from '../view/View';

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
    this.view.moveThumb('from', from);
  }

  private onToChange(eventName: Events, settings: SettingsInterface) {
    if (eventName !== Events.changeTo) return;
    const { to } = settings;
    this.view.moveThumb('to', to);
  }

  private onUpdateValues(eventName: Events, settings: SettingsInterface) {
    if (eventName !== Events.changeFrom && eventName !== Events.changeTo) return;
    const { from, to, range, tip, connect, scale } = settings;

    if (tip) {
      this.view.updateTip(from, to, range);
    }
    if (connect) {
      this.view.updateConnect(from, to);
    }
    if (scale) {
      this.view.updateScale(settings);
    }

    this.view.updateTrack(settings);
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

  private init(settings: SettingsInterface) {
    const { from, to, range, connect } = settings;
    this.view.render(settings);
    if (range) {
      this.view.moveThumb('to', to);
    }
    this.view.moveThumb('from', from);
    if (connect) {
      this.view.updateConnect(from, to);
    }
  }

  private makeAttach() {
    this.view.attach(this.handleThumbFromMove.bind(this));
    this.view.attach(this.handleThumbToMove.bind(this));
    this.model.attach(this.onFromChange.bind(this));
    this.model.attach(this.onToChange.bind(this));
    this.model.attach(this.onUpdateValues.bind(this));
    this.model.attach(this.onUpdate.bind(this));
  }
}

export default Presenter;
