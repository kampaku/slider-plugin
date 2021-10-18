import type Presenter from '../presenter/presenter';
type args = any;
interface Observer {
  (eventName: string, arg: args): void;
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

  notify(eventName: string, arg: args) {
    this.observers.forEach(observer => observer(eventName, arg))
  }
}