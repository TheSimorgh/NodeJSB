// const mongoose = require('mongoose');

// const connectDB = async () => {
//     try {
//         await mongoose.connect(`${process.env.DATABASE_URI}`, {
//             useNewUrlParser: true, 
//             useUnifiedTopology: true 
//         });
//     } catch (err) {
//         console.error(err);
//     }
// }

// module.exports = connectDB


const mongoose = require('mongoose');

const connectDB = async()=>{
    try {
        const response = await mongoose.connect(process.env.MONGODB_URI,{useNewUrlParser:true});
        console.log("Database connected........")
    } catch (error) {
        console.log(error)
    }
}
module.exports = connectDB