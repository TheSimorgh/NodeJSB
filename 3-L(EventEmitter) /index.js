const logEvents = require("./logEvent");

const EventEmitter= require(`events`)
class MyEmitter extends EventEmitter{};

//initialize object
const myEmitter =new MyEmitter()

//add listener for the log event
myEmitter.on(`log`,(msg)=>logEvents(msg))

setTimeout(()=>{
    //Emitter event
    myEmitter.emit(`log`,`Log Event Emitter`)
    
},2000)
