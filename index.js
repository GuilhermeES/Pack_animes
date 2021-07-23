const express = require('express');
const router = require('./routes/router');
const connection = require('./db/connection');

const app = express();

global.__basedir = __dirname;


/*Models*/
const Anime = require('./models/Anime');
const Espisodes = require('./models/Episodes');
const Genres = require('./models/Genres');


app.use((req,res,next) => {
    res.header("Access-Control-Allow-Origin", "*");
    next();
})

/*Views*/
app.set('view engine', 'ejs');

/*Static*/ 
app.use(express.static('resources'))

/*Body-parsers*/
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/*Database*/
connection.authenticate().then(() => {console.log('conectado')}).catch((error) => {console.log(error)});

/*Routes*/
app.use("/", router);

app.listen(4000);