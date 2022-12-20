import dayfns from 'date-fns';
import { ICronJob } from './model';

export const createCronJobTime = (time: any) => {
  return `${dayfns.format(new Date(time), 'mm HH')} * * *`;
};

export const getRegisterSuccessTemplate = (
  jobName: String,
  action: String,
  CronTime: String
) => {
  return `[${formatDateTime(
    new Date()
  )}] [${jobName}] ${action} [${CronTime}] `;
};

export const getSchedueTemplate = (cronjob: ICronJob) => {
  return `[${cronjob.name}][${cronjob.name}] [${cronjob.description}] `;
};

export const formatDateTime = (time: any, format = " 'hh:mm dd-mm-yyyy'") => {
  return dayfns.format(time, 'hh:mm dd-mm-yyyy');
};
