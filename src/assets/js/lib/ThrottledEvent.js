import { throttle } from 'lodash';
import { capitalize } from './index';

class ThrottledEvent {
  constructor(event = '', opt = {}) {
    if (event === '') return null;

    const DEFAULT_OPT = {
      throttleTime: 100,
      element: window,
      globalName: '',
      isGlobal: true,
    };

    this.OPT = { ...DEFAULT_OPT, ...opt };
    this.EVENT = event;
    this.GLOBAL_NAME = this.OPT.isGlobal ? this.getEventClassName() : '';
    this.callBacks = [];
    this.curEventHandler = null;

    if (window[this.GLOBAL_NAME]) return window[this.GLOBAL_NAME];
    this.init();
  }

  static funcAdapter(func) {
    return (e, ...args) => func(...args);
  }

  getEventClassName() {
    return `$Throttled${capitalize(this.OPT.globalName)}${capitalize(this.EVENT)}`;
  }

  eventHandler(e) {
    this.callBacks.forEach((callBack) => callBack.func(e, ...callBack.args));
  }

  add(entry) {
    if (typeof entry === 'function') {
      this.callBacks.push({
        key: entry.name,
        func: entry,
        args: [],
      });
    }

    if (typeof entry === 'object' && typeof entry.func === 'function') {
      this.callBacks.push({
        key: entry.key || entry.func.name,
        func: entry.func,
        args: entry.args || [],
      });
    }

    this.callBacks[this.callBacks.length - 1].func(null);

    return this;
  }

  remove(target) {
    const key = typeof target === 'function' ? target.name : target;
    const callBackIndex = this.callBacks.findIndex((cb) => cb.key === key);
    if (callBackIndex !== -1) this.callBacks.splice(callBackIndex, 1);
    return this;
  }

  destroy(force = false) {
    if (force) this.callBacks = [];
    if (this.callBacks.length > 0) throw new Error('Stack of callbacks in not empty');

    this.OPT.element.removeEventListener(this.EVENT, this.curEventHandler);
    this.curEventHandler = null;
  }

  init() {
    const { throttleTime, element, isGlobal } = this.OPT;
    this.curEventHandler = throttle(this.eventHandler.bind(this), throttleTime);
    element.addEventListener(this.EVENT, this.curEventHandler);
    this.eventHandler(null);
    if (isGlobal) window[this.GLOBAL_NAME] = this;
  }
}

export default ThrottledEvent;
