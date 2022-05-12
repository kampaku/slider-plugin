interface MoveFrom {
  kind: 'moveFrom';
  value: number;
}

interface MoveTo {
  kind: 'moveTo';
  value: number;
}

type ViewEvents = MoveFrom | MoveTo;

interface ThumbFromUpdate {
  kind: 'changeFrom';
  value: number;
}

interface ThumbToUpdate {
  kind: 'changeTo';
  value: number;
}

interface StateUpdate {
  kind: 'stateUpdate';
  state: SettingsInterface;
}

type ModelEvents = StateUpdate | ThumbFromUpdate | ThumbToUpdate;

export type { ModelEvents, ViewEvents };
