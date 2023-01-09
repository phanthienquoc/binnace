import { TELEGRAM } from '../../constants/constants';

const CronJob = require('cron').CronJob;

const job = new CronJob(
  TELEGRAM.TET_FEATURE.CRON_JOB_TIME,
  function () {
    // telegramBot.sendMessage(TELEGRAM.USER_ID, getDistance());
  },
  function () {
    /* This function is executed when the job stops */
  },
  true /* Start the job right now */,
  'Asia/Bangkok' /* Time zone of this job. */
);

export default job;
