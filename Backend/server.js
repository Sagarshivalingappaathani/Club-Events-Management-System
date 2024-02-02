const express = require('express')
const app = express()
const cors = require("cors")
const PORT =  8080
const mongoose = require('mongoose')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const passport = require('passport')
const flash = require('express-flash')

app.use(cors());

// Database connection
mongoose.connect('mongodb://127.0.0.1:27017/userDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;

connection.on('error', (err) => {
  console.error('Connection failed...', err);
});

connection.once('open', () => {
  console.log('Database connected...');
});

// Session config including store configuration
app.use(session({
  secret: "SKPSMPSAP",
  resave: false,
  store: MongoStore.create({
    mongoUrl: 'mongodb://127.0.0.1:27017/userDB', 
    ttl: 60 * 60 * 24, 
  }),
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 * 24 }
}));

// Passport config
const passportInit = require('./app/config/passport')
passportInit(passport)
app.use(passport.initialize())
app.use(passport.session())

app.use(flash())

//it is usefull to tell that the data we are reciveing from client is json type
app.use(express.json());

//it is usefull to tell the exprees that the data we are revieing from client can be urlencoded  
app.use(express.urlencoded({extended:false}));


require('./routes/web')(app)
app.use((req, res) => {
  res.status(404).render('errors/404')
})

app.listen(PORT , () => {
    console.log(`Listening on port ${PORT}`)
})


    
        
          