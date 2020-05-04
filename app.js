const express = require('express');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const db = require('./models');
//const { Pool } = require('pg');
const sslRedirect = require('heroku-ssl-redirect');

const app = express();

app.use(sslRedirect());

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};

//const pool = new Pool({
//  user: 'ivanrl',
//  password: '73442332',
//  database: 'Alpalac',
//});

app.use(cors(corsOptions));
app.options('*', cors());

app.use(express.json());

app.use(
  session({
    store: new (require('connect-pg-simple')(session))({
      //pool,
    }),
    secret: 'oaksndlñsakosindg',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      sameSite: 'none',
      secure: true,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

require('./routes/itemsRoutes')(app);
require('./routes/authRoutes')(app);
require('./routes/orderRoutes')(app);
//app.use('/', require('./routes/authRoutes'));

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV === 'production') {
  console.log('proddddddddddddd');
  const path = require('path');
  //Express will serve up production asses like main.js
  //or main.css files
  //app.use(express.static('client/build'));
  app.use(express.static(path.resolve(__dirname, 'client/build')));

  //Express will serve up the index.html if it doesn't
  //recognize the route
  //app.get('*', (req, res) => {
  //  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  //});
  app.get('/*', function (req, res) {
    console.log('this is actually working');
    res.sendFile(path.resolve(__dirname, 'client/build', 'index.html'));
  });
}

db.sequelize.sync().then(async () => {
  await sequelize.query(
    `
    CREATE TABLE IF NOT EXISTS "session" (
      "sid" varchar NOT NULL COLLATE "default" PRIMARY KEY NOT DEFERRABLE INITIALLY IMMEDIATE,
      "sess" json NOT NULL,
      "expire" timestamp(6) NOT NULL
    )
    WITH (OIDS=FALSE);
    `
  );

  await sequelize.query(
    `CREATE INDEX IF NOT EXISTS "IDX_session_expire" ON "session" ("expire");`
  );
});

app.listen(PORT);
