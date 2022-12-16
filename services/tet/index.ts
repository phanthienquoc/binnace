
import telegram  from "../../providers/telegram";

const CronJob = require('cron').CronJob;
const CronJobTime = '00 11 00 * * 1-5'; // '00 09 15 * * 1-5';

const job = new CronJob(
  CronJobTime,
  function () {
    /*
     * Runs every weekday (Monday through Friday)
     * at 11:30:00 AM. It does not run on Saturday
     * or Sunday.
     */
    telegram.sendMessage(603532799,`xxx`);
  },
  function () {
    /* This function is executed when the job stops */
  },
  true /* Start the job right now */,
  'Asia/Bangkok' /* Time zone of this job. */
);

export default job;
