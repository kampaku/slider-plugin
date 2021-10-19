import type Presenter from '../presenter/presenter';
import type { SettingsInterface } from './SettingsInterface';
type args = any;
interface Observer {
  (eventName: string, arg: SettingsInterface): void;
}

// type Observer = <T>(coord: T) => void

export default class Observable {
  observers: Observer[];

  constructor() {
    this.observers = [];
  }

  attach(observer: Observer) {
    const isExist = this.observers.includes(observer);
    if (isExist) {
      return
    }
    this.observers.push(observer);
  }

  detach(observer: Observer) {
    this.observers = this.observers.filter(callback => callback === observer);
  }

  notify(eventName: string, arg: SettingsInterface) {
    this.observers.forEach(observer => observer(eventName, arg))
  }
}