console.log(`Server`);
const { v4: uuid } = require("uuid");
// const {v4 }=require("uuid")
// const uuid =require("uuid")
const { format } = require("date-fns");
const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");


const  ip = Object.values(require("os").networkInterfaces())
.flat()
.filter((item) => !item.internal && item.family === "IPv4")
.find(Boolean).address;
const logEvents = async (message, logName) => {
  const dateTime = `${format(new Date(), 'ddMMyyyy\tHH:mm:ss')}`;
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`;

  try {
      if (!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
          await fsPromises.mkdir(path.join(__dirname, '..', 'logs'));
      }

      await fsPromises.appendFile(path.join(__dirname, '..', 'logs', logName), logItem);
  } catch (err) {
      console.log(err);
  }
}

const logger = (req, res, next) => {
  logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, 'reqLog.txt');
  console.log(`${req.method} ${req.path}`);
  console.log(req.headers.origin);
  next();
}

module.exports = { logger, logEvents };