interface ICronJob {
  id?: any;
  name?:any;
  cronTime?: string;
  action?: any;
  actionOnStop?: any;
  startAtInit?: any;
  timezone?: any;
  instance?: any;
  start?: any;
  stop?: any;
}

export { ICronJob };
