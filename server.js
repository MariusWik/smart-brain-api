const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");

const register = require("./controllers/register.js");
const signin = require("./controllers/signin.js");
const profile = require("./controllers/profile.js");
const image = require("./controllers/image.js");

const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1", //localhost
    user: "postgres",
    password: "test",
    database: "smart-brain",
  },
});

app.use(bodyParser.json());
app.use(cors());

app.post("/signin", signin.handleSignin(db, bcrypt));

app.get("/profile/:id", profile.handleProfileGet(db));
app.put("/image/", image.handleImage(db));
app.post("/imageurl/", image.handleApiCall());

app.post("/register", register.handleRegister(db, bcrypt));

app.listen(process.env.PORT || 3000, () => {
  console.log(`app is runnign on port ${process.env.PORT}`);
});
