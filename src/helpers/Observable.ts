abstract class Observable<T> {
  observers: Observer<T>[];

  constructor() {
    this.observers = [];
  }

  attach(observer: Observer<T>) {
    const isExist = this.observers.includes(observer);
    if (isExist) {
      return;
    }
    this.observers.push(observer);
  }

  detach(observer: Observer<T>) {
    this.observers = this.observers.filter((callback) => callback !== observer);
  }

  notify(arg: T) {
    this.observers.forEach((observer) => observer(arg));
  }
}

export default Observable;
