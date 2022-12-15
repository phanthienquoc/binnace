const express = require('express');
const bodyParser = require('body-parser');
const expressip = require('express-ip');
const TelegramBot = require('node-telegram-bot-api');

const CronJobManagement = require('./services/cronjob/index');

const formatDistanceStrict = require('date-fns/formatDistanceStrict');
const CronJob = require('cron').CronJob;
// const TelegramProvider = require('./providers/telegram/index');
/*
 * Runs every weekday (Monday through Friday)
 * at 11:30:00 AM. It does not run on Saturday
 * or Sunday.
 */
const app = express();
const TET_GROUP = -769366227;
const TET_CHANNEL = -1001642216402;
const TOKEN = '1290547542:AAGo2y1rFjAf3EqGpGeYvx5Zm4F73rlBDgA';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(TOKEN, { polling: true });

// Matches "/echo [whatever]"
bot.onText(/\/echo (.+)/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"

  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, resp);
});

// Listen for any kind of message. There are different kinds of
// messages.
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  console.log(msg);
  let a = formatDistanceStrict(new Date(), new Date('01/21/2023'), {
    unit: 'day',
    roundingMethod: 'ceil',
  });

  a = a.replace(/days/g, 'ngày');
  // send a message to the chat acknowledging receipt of their message
  // bot.sendMessage(TET_GROUP, `Còn ${a} là tết nha!!!`);
});

bot.on('channel_post', (msg) => {
  console.log('channel_post', msg);
  bot.sendMessage(TET_CHANNEL, getStringCountDownTet());
});

const CronJobTime = '28 11 * * *'; // '00 09 15 * * 1-5';
const getStringCountDownTet = () => {
  let countdowntet = formatDistanceStrict(new Date(), new Date('01/21/2023'), {
    unit: 'day',
    roundingMethod: 'ceil',
  });
  countdowntet = countdowntet.replace(/days/g, 'ngày');

  return `Còn ${countdowntet} là tết nha!`;
};

const job = new CronJob(
  CronJobTime,
  function () {
    bot.sendMessage(603532799, getStringCountDownTet());
  },
  function () {
    /* This function is executed when the job stops */
  },
  true /* Start the job right now */,
  'Asia/Bangkok' /* Time zone of this job. */
);
// job.start();

const cronjobs = new CronJobManagement({
  startAtInit: true,
  action: (ctrx) => {
    console.log('CronJobManagement', ctrx);
  },
});

cronjobs.create();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(expressip().getIpInfoMiddleware);

app.use((req, res, next) => {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  );

  // Request headers you wish to allow
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With,content-type'
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

// replace the value below with the Telegram token you receive from @BotFather

module.exports = app;
