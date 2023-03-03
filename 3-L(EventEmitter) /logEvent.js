console.log(`Server`);
const { v4: uuid } = require("uuid");
// const {v4 }=require("uuid")
// const uuid =require("uuid")
const { format } = require("date-fns");
const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");
// const ip = require("ip");
const  ip = Object.values(require("os").networkInterfaces())
.flat()
.filter((item) => !item.internal && item.family === "IPv4")
.find(Boolean).address;
const logEvents = async (message) => {
// const IPaddress = ip.address()
  const dateTime = `${format(new Date(), `dd.MM.yyyy\tHH:mm:ss`)}`;
  const logItem = `${dateTime}\t${uuid()}\t${message}\t${ip}\n`;

  console.log(logItem);
  try {
    if (!fs.existsSync(path.join(__dirname, `logs`))) {
      await fsPromises.mkdir(path.join(__dirname, `logs`));
    }
    await fsPromises.appendFile(
      path.join(__dirname, `logs`, `eventLog.txt`),
      logItem
    );
  } catch (error) {
    console.error(`Error:${error}`);
    console.log();
  }
};

console.log(format(new Date(), `dd.MM.yyyy\tHH:mm:ss`));
console.log(`UUID: ${uuid()}`);

module.exports = logEvents;
