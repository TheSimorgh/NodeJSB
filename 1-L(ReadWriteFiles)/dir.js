const fs = require(`fs`);


if(!fs.existsSync("./new")){
    fs.mkdir("./new",(err)=>{
        if(err)throw err;
        console.log(`error:${err}`);
        console.log(`Directory created`);

    })
}

if(fs.existsSync("./new")){
    fs.rmdir("./new",(err)=>{
        if(err)throw err;
        console.log(`error:${err}`);
        console.log(`Directory Removed`);
    })
}

process.on('uncaughtException',err=>{
    console.error(`There was an uncaught error ${err}`)
    process.exit(1)
 })
 