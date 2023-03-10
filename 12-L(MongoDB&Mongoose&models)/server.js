const express = require("express");
const app = express();
const path = require("path");
const { logger } = require("./middleware/logEvent");
const cors = require("cors");
const errorHandler = require("./middleware/errorHandler");
const verifyJWT = require('./middleware/verifyJWT');
const cookieParser = require('cookie-parser');
const credentials = require('./middleware/credentials');
const corsOptions = require("./config/corsOptions");
const mongoose = require("mongoose")
const connectDB = require('./config/dbConn');
// mongoose.set("strictQuery", true);
// const dotenv = require("dotenv");

// dotenv.config();
mongoose.set('strictQuery', false);

// require(`dotenv`).config();
require('dotenv').config({ path: './.env' });
const PORT = 3500;
connectDB();

// app.use((req,res,next)=>{
//   logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`,`reqLog.txt`)
//   console.log(`Custom Middleware ${req.method}: ${req.url}:${req.path}`);
//   next()
// })
// Connect to MongoDB
app.use(logger);
// built-in middleware to handle urlencoded data
// in other words, form data:
// â€˜content-type: application/x-www-form-urlencodedâ€™

//
// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);
app.use(cors(corsOptions));
// app.use(cors());
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json
app.use(express.json());
//middleware for cookies
app.use(cookieParser());
//serve static files
app.use(express.static(path.join(__dirname, "/public")));

// routes
app.use('/', require('./routes/root'));
app.use('/register', require('./routes/register'));
app.use('/auth', require('./routes/auth'));
app.use('/refresh', require('./routes/refresh'));
app.use('/logout', require('./routes/logout'));
app.use(verifyJWT);
app.use('/employees', require('./routes/api/employees'));
app.use('/users', require('./routes/api/users'));
// chaining route handlers
const one = (req, res, next) => {
  console.log("one");
  next();
};

const two = (req, res, next) => {
  console.log("two");
  next();
};

const three = (req, res) => {
  console.log("three");
  res.send("Finished!");
};

app.get("/chain(.html)?", [one, two, three]);

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});
// app.use((err,req,res,next)=>{
//   console.log(err.stack);
//   res.status(500).send(err.message)
//   next()
// })
app.use(errorHandler);
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});