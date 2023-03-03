console.log(`Server`);
const {v4:uuid }=require("uuid")
// const {v4 }=require("uuid")
// const uuid =require("uuid")
const {format}=require("date-fns")
console.log(format(new Date(),`dd.MM.yyyy\tHH:mm:ss`));
console.log(`UUID: ${uuid()}`);