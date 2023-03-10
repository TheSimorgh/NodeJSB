

const express = require('express');
const app = express();
const path = require('path');
const {logger} = require('./middleware/logEvent');
const cors=require("cors");
const errorHandler = require('./middleware/errorHandler');
const corsOptions = require('./config/corsOptions');
const PORT = 3500;





// app.use((req,res,next)=>{
//   logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`,`reqLog.txt`)
//   console.log(`Custom Middleware ${req.method}: ${req.url}:${req.path}`);
//   next()
// })

app.use(logger)
// built-in middleware to handle urlencoded data
// in other words, form data:  
// â€˜content-type: application/x-www-form-urlencodedâ€™


app.use(cors(corsOptions));
// app.use(cors());
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json 
app.use(express.json());

//serve static files
app.use(express.static(path.join(__dirname, '/public')));

// app.get('^/$|/index(.html)?', (req, res) => {
//     //res.sendFile('./views/index.html', { root: __dirname });
//     res.sendFile(path.join(__dirname, 'views', 'index.html'));
// });

// app.get('/new-page(.html)?', (req, res) => {
//     res.sendFile(path.join(__dirname, 'views', 'new-page.html'));
// });

// app.get('/old-page(.html)?', (req, res) => {
//     res.redirect(301, '/new-page.html'); //302 by default
// });

// // Route handlers
// app.get('/hello(.html)?', (req, res, next) => {
//     console.log('attempted to load hello.html');
//     next()
// }, (req, res) => {
//     res.send('Hello World!');
// });



// routes
app.use('/', require('./routes/root'));
app.use('/employees', require('./routes/api/employees'));

// chaining route handlers
const one = (req, res, next) => {
  console.log('one');
  next();
}

const two = (req, res, next) => {
  console.log('two');
  next();
}

const three = (req, res) => {
  console.log('three');
  res.send('Finished!');
}

app.get('/chain(.html)?', [one, two, three]);


app.all('*', (req, res) => {
  res.status(404);
  if (req.accepts('html')) {
      res.sendFile(path.join(__dirname, 'views', '404.html'));
  } else if (req.accepts('json')) {
      res.json({ "error": "404 Not Found" });
  } else {
      res.type('txt').send("404 Not Found");
  }
});
// app.use((err,req,res,next)=>{
//   console.log(err.stack);
//   res.status(500).send(err.message)
//   next()
// })
app.use(errorHandler)
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));