const Koa = require('koa');
const serve = require('koa-static');
const bodyParser = require('koa-bodyparser');
const _ = require('lodash');
const db = require('./models');
const router = require('./routes');
const PORT = 8000;

const app = new Koa();

//set the static middle ware
app.use(serve(__dirname + '/public/'));

//create or sync models in db
db.sequelize
	.sync()
	.then(() => console.log('Database models synced!!!'))
	.catch(err => console.log('Error in DB sync --', err));

//add db variable to context ,so that  models can be accessed
app.context.db = db;
app.use(bodyParser()); //add middleware body parser
app.use(router.routes()); // register routes as middleware

app.listen(PORT);
console.log(`App is running on ${PORT}`);
