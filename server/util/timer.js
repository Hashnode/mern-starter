/* timer */
import cuid from 'cuid';

const loopTime = 10000; // 10seconds
// ed - execute date

class Task {
  constructor(cb, ed) {
    this.cb = cb;
    this.ed = ed;
    this.id = cuid();
  }

  getID() {
    return this.id;
  }

  executable() {
    if ((new Date()).valueOf() > this.ed) {
      return true;
    }
    return false;
  }

  exec() {
    this.cb();
  }

  delay(ed) {
    this.ed = ed;
  }
}


class Timer {

  constructor() {
    this.pool = {};
    this.timeOut = null;
    this.processing = false;
  }

  begin() {
    this.processing = true;
    if (this.pool === null || typeof this.pool === 'undefined') {
      this.timeOut = setTimeout(() => { this.begin(); }, loopTime);
      return;
    }
    const tasks = Object.values(this.pool);
    for (const task of tasks) {
      if (task.executable()) {
        task.exec();
        this.removeTask(task.getID());
      }
    }
    this.timeOut = setTimeout(() => { this.begin(); }, loopTime);
  }

  end() {
    clearTimeout(this.timeOut);
    this.timeOut = null;
    this.processing = false;
  }

  addTask(cb, ed) {
    const task = new Task(cb, ed);
    this.pool[task.getID()] = task;
    if (this.timeOut == null && this.processing) {
      this.begin();
    }
    return task.getID();
  }

  removeTask(id) {
    delete this.pool[id];
    if (Object.keys(this.pool).length === 0) {
      clearTimeout(this.timeOut);
      this.timeOut = null;
    }
  }

  delayTask(id, ed) {
    const task = this.pool[id];
    if (task) {
      task.delay(ed);
      return true;
    }
    console.log('delayTask - cannot find task with id:' + id.toString());
    return false;
  }

  flush() {
    this.end();
    this.pool = {};
  }
}

const timer = new Timer();
module.exports = timer;
