const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const env = require("dotenv").config();
const morgan = require('morgan');
const { engine, create, ExpressHandlebars } = require('express-handlebars');
const passport = require('passport');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const Mongoose = require('./connectDB/connectMongoose');

//Passport config
require('./utilities/passport')(passport);

Mongoose();


const app = express();

// Loggin
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
};
//handlebars
app.engine('.hbs', engine({defaultLayout: 'main' , extname: '.hbs'}));
app.set('view engine', '.hbs');

//session
const store = new MongoDBStore({
  uri: process.env.DATABASE_URL,
  collection: 'mySessions'
});
// Catch errors
store.on('error', function(error) {
  console.log(error);
});
app.use(session({
  secret: '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',
  resave: false,
  saveUninitialized: false,  
  store: store
  // Boilerplate options, see.:
  // * https://www.npmjs.com/package/express-session#resave
  // * https://www.npmjs.com/package/express-session#saveuninitialized
  
}));


// midleware
//Passport
app.use(passport.initialize())
app.use(passport.session())
// Static folder
app.use(express.static(path.join(__dirname, 'public')))
// Routes
app.use('/', require('./routes/index'))
app.use('/auth', require('./routes/auth'))

/// Start the server and listen to the port
//Process .env
const PORT = process.env.PORT;
const HOST = process.env.HOST;


/* ***********************
 * Log statement to confirm server operation
 *************************/
app.listen(PORT, () => {
  console.log(`app listening on: ${HOST}:${PORT} `)
});

  