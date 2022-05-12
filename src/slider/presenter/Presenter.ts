import type { ModelEvents, ViewEvents } from '../../helpers/Events';
import type Model from '../model/Model';
import type View from '../view/View';

class Presenter {
  constructor(private model: Model, private view: View) {
    this.model = model;
    this.view = view;
    this.makeAttach();
    this.init(this.model.getSettings());
  }

  private onFromChange(args: ModelEvents) {
    if (args.kind !== 'changeFrom') return;
    this.view.moveThumb('from', args.value);
  }

  private onToChange(args: ModelEvents) {
    if (args.kind !== 'changeTo') return;
    this.view.moveThumb('to', args.value);
  }

  private onUpdateValues(args: ModelEvents) {
    if (args.kind !== 'changeFrom' && args.kind !== 'changeTo') return;
    const settings = this.model.getSettings();
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

  private handleThumbFromMove(args: ViewEvents) {
    if (args.kind !== 'moveFrom') return;
    this.model.setFrom(args.value);
  }

  private handleThumbToMove(args: ViewEvents) {
    if (args.kind !== 'moveTo') return;
    this.model.setTo(args.value);
  }

  private onUpdate(args: ModelEvents) {
    if (args.kind !== 'stateUpdate') return;
    this.view.destroy();
    this.init(args.state);
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
