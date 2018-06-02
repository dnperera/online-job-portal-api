const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const _ = require('lodash');
const db = require('./models');
const router = require('./routes');
const PORT = 8000;

const app = new Koa();

//create or sync models in db
db.sequelize
	.sync()
	.then(() => console.log('Database models synced!!!'))
	.catch(err => console.log('Error in DB sync --', err));

app.use(bodyParser()); //add middleware body parser
app.use(router.routes()); // register routes as middleware

// const posts = [
// 	{
// 		id: '1',
// 		title: 'School Bus Driver Wanted!',
// 		content:
// 			"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
// 	},

// 	{
// 		id: '2',
// 		title: 'General Contractor Wanted!!!!',
// 		content:
// 			'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the ',
// 	},
// 	{
// 		id: '3',
// 		title: 'Experienced Full Stack Developer',
// 		content:
// 			"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
// 	},
// ];

// //Get all posts
// router.get('/posts', (ctx, next) => {
// 	ctx.body = posts;
// });

// //Get post details of a given id
// router.get('/posts/:id', ctx => {
// 	ctx.body = posts.find(post => post.id === ctx.params.id);
// });

// //Home route
// router.get('/', (ctx, next) => {
// 	ctx.body = 'Hello Welcome to Job portal!!!!';
// });

// // Add a new post
// router.post('/posts', (ctx, next) => {
// 	console.log(ctx.request.body);
// 	let { id, title, content } = ctx.request.body;
// 	if (!id) {
// 		ctx.throw(400, 'id is a required field!');
// 	}
// 	if (!title) {
// 		ctx.throw(400, 'title is a required field!');
// 	}

// 	if (!content) {
// 		ctx.throw(400, 'content is a required field!');
// 	}

// 	posts.push({ id, title, content });
// 	ctx.body = posts;
// });

// //Delete a post by id
// router.delete('/posts/:id', ctx => {
// 	ctx.body = _.remove(posts, post => {
// 		return post.id === ctx.params.id;
// 	});
// });

// router.put('/posts/:id', ctx => {
// 	//destructure the request body object
// 	let { id, title, content } = ctx.request.body;
// 	//find the matchin index to be update
// 	const index = posts.findIndex(p => p.id === ctx.params.id);

// 	if (id) {
// 		posts[index].id = id;
// 	}
// 	if (title) {
// 		posts[index].title = title;
// 	}
// 	if (content) {
// 		posts[index].content = content;
// 	}

// 	ctx.body = posts;
// });

app.listen(PORT);
console.log(`App is running on ${PORT}`);
