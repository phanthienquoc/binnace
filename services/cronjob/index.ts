import cron from 'cron';
import lodash from 'lodash';
import { ICronJob } from './model';

class CronJobManagement {
  list = <ICronJob[]>[];
  constructor() {}

  create({
    name = 'cronjob',
    cronTime = process.env.CRON_JOB_TIME || '',
    action = () => {},
    actionOnStop = () => {},
    startAtInit = true,
    timezone = 'Asia/Bangkok',
  }: ICronJob) {
    const job = new cron.CronJob(
      cronTime,
      action,
      actionOnStop,
      startAtInit,
      timezone
    );

    this.list.push({
      name: name,
      id: new Date().getTime(),
      instance: job,
      cronTime,
      timezone,
    });
  }

  start(id: string) {
    let selected = lodash.find(this.list, { id: id });
    if (selected) {
      selected.start();
    } else {
      console.log('error');
    }
  }
  stop(id: string) {
    let selected = lodash.find(this.list, { id: id });
    if (selected) {
      selected.stop();
    } else {
      console.log('error');
    }
  }

  remove(id: string) {
    this.list = lodash.remove(this.list, { id: id });
  }

  getList() {
    return this.list.map((item: any) => {
      delete item.instance;
      return item;
    });
  }

  reset() {
    this.list = [];
  }
}

export default new CronJobManagement();
