import type { Events } from './Events';

export default class Observable {
  observers: Observer[];

  constructor() {
    this.observers = [];
  }

  attach(observer: Observer) {
    const isExist = this.observers.includes(observer);
    if (isExist) {
      return;
    }
    this.observers.push(observer);
  }

  detach(observer: Observer) {
    this.observers = this.observers.filter((callback) => callback === observer);
  }

  notify(eventName: Events, arg: SettingsInterface) {
    this.observers.forEach((observer) => observer(eventName, arg));
  }
}
