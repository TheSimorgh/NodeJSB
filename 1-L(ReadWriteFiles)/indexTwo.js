const fs = require(`fs`);
const path = require(`path`);



const rs =fs.createReadStream(`./files3/lorem.txt`,{encoding:`utf8`})
const ws =fs.createWriteStream(`./files3/new-lorem.txt`)

//method 1
// rs.on(`data`,(dataChunk)=>{
//   ws.write(dataChunk)
// })

//method 2
rs.pipe(ws)