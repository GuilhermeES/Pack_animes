const express = require('express');
const router = require('./routes/router');
const connection = require('./db/connection');
const session = require("express-session")

const app = express();


global.__basedir = __dirname;


/*Models*/
const Anime = require('./models/Anime');
const Espisodes = require('./models/Episodes');
const User = require('./models/User');
const Genres = require('./models/Genres');

//session
app.use(session({
    secret: "3a5361437e5a32f3594116f527c38c02",
    resave: true, 
    saveUninitialized: true,
    cookie: {maxAge: 900000000}
}))

/*Views*/
app.set('view engine', 'ejs');

/*Static*/ 
app.use(express.static(__dirname + '/resources'))

/*Body-parsers*/
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/*Database*/
connection.authenticate().then(() => {console.log('conectado')}).catch((error) => {console.log(error)});

/*Routes*/
app.use("/", router);

app.listen(4000);