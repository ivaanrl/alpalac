const express = require("express");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
const db = require("./models");
const { Pool } = require("pg");

const dotenv = require("dotenv");
dotenv.config();

const app = express();
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};

console.log(process.env.DATABASE_URL);

const pool = new Pool();

app.use(cors(corsOptions));
app.options("*", cors());

app.use(express.json());

app.use(
  session({
    store: new (require("connect-pg-simple")(session))({
      pool: pool,
    }),
    secret: "cats",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      sameSite: "none",
      secure: true,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

require("./routes/itemsRoutes")(app);
require("./routes/authRoutes")(app);
require("./routes/orderRoutes")(app);
app.use("/", require("./routes/authRoutes"));

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV === "production") {
  //Express will serve up production asses like main.js
  //or main.css files
  app.use(express.static("client/build"));

  //Express will serve up the index.html if it doesn't
  //recognize the route
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
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
