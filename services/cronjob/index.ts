import cron from 'cron';
import lodash from 'lodash';
import { ICronJob } from './model';

class CronJobManagement {
  list = <ICronJob[]>[];
  constructor() {}

  create({
    name = 'cronjob',
    cronTime = process.env.CRON_JOB_TIME || '',
    action = () => {
      console.log('detaul');
    },
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

    const newList = [...this.list];

    newList.push({
      name: name,
      id: new Date().getTime(),
      instance: job,
      cronTime,
      timezone,
    });

    this.list = [...newList];

    console.log(this.list);
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
    let getList = [...this.list].map((item) => {
      delete item.instance;
      return item;
    });
    return getList;
  }

  reset() {
    this.list = [];
  }
}

export default new CronJobManagement();
