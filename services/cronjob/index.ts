const CronJob = require('cron').CronJob;
const lodash = require('lodash');
const CronJobTime = '28 11 * * *'; // '28 11 * * 1-5';

export default class CronJobManagement {
  list = <any>[];
  constructor() {}

  create({
    time = CronJobTime,
    action = () => {},
    actionOnStop = () => {},
    startAtInit = true,
    timezone = 'Asia/Bangkok',
  }) {
    const job = new CronJob(time, action, actionOnStop, startAtInit, timezone);
    this.list.push(job);
  }

  start(id) {
    let selected = lodash.find(this.list, { id: id });
    if (selected) {
      selected.start();
    } else {
      console.log('error');
    }
  }
  stop(id) {
    let selected = lodash.find(this.list, { id: id });
    if (selected) {
      selected.stop();
    } else {
      console.log('error');
    }
  }

  getList() {
    return this.list;
  }

  reset() {
    this.list = [];
  }
}
