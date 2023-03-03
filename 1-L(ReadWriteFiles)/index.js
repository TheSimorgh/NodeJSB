const fs=require(`fs`)
const path=require(`path`)

console.log(`Hello Uno`);
fs.readFile(`./files/starter.txt`,(err,data)=>{
    if(err) throw err
    console.log(data); // we get the buffer data 
    console.log(data.toString()); // here we converting buffer data into string we get readable data
    console.log(``);

})
console.log(`Hello Dos`);
fs.readFile(path.join(__dirname,'files',`one.txt`),`utf8`,(err,data)=>{
    if(err) throw err
    console.log(`added UTF8 encoding parametr `);
    console.log(data); 
})

fs.writeFile(path.join(__dirname,'files',`two.txt`),`Hello Node WriteFile`,(err)=>{
    if(err) throw err
    console.log(`OPS is completed`);
    fs.appendFile(path.join(__dirname,'files',`two.txt`),`\n\n YES Append Node WriteFile`,(err)=>{
        if(err) throw err
        console.log(`Append completed`);
    })
})

fs.writeFile(path.join(__dirname,'files',`three.txt`),`Hello Node WriteFile`,(err)=>{
    if(err) throw err
    console.log(`OPS is completed`);
    fs.appendFile(path.join(__dirname,'files',`three.txt`),`\n\n YES Append Node WriteFile`,(err)=>{
        if(err) throw err
        console.log(`Append completed`);
        fs.rename(path.join(__dirname,'files',`three.txt`),path.join(__dirname,'files',`threeUpdated.txt`),(err)=>{
            if(err) throw err
            console.log(`rename completed`);
        })
    })
})
process.on('uncaughtException',err=>{
   console.error(`There was an uncaught error ${err}`)
   process.exit(1)
})


console.log(`Hello Tree`);