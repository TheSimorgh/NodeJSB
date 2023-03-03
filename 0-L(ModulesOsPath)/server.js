const os = require("os");
const path = require("path");
const customMath=require("./math")
const {reset}=require("./math")
console.log(`OS TYPE: ${os.type()}`);
console.log(`OS VERSION: ${os.version()}`);
console.log(`Home Directory: ${os.homedir()}`);
console.log(__dirname);
console.log(__filename);
console.log(path.dirname(__filename));
console.log(path.basename(__filename));
console.log(path.extname(__filename));
console.log(`//////////////////---Custom-Math---/////////////////////////`);
console.log(`Add: ${customMath.add(10,10)}`);
console.log(`Subtract:${customMath.subtract(10,10)}`);
console.log(customMath.multiply(10,10));
console.log(customMath.divide(10,10));
console.log(`Reset: ${reset(5)}`);

