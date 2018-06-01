const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const PORT = 8000;

const app = new Koa();
const router = new Router();

app.use(bodyParser()); //add middleware body parser

const posts = [
	{
		id: '1',
		title: 'School Bus Driver Wanted!',
		content:
			"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
	},

	{
		id: '2',
		title: 'General Contractor Wanted!!!!',
		content:
			'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the ',
	},
	{
		id: '3',
		title: 'Experienced Full Stack Developer',
		content:
			"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
	},
];

router.get('/posts', (ctx, next) => {
	ctx.body = posts;
});

router.get('/posts/:id', ctx => {
	ctx.body = posts.find(post => post.id === ctx.params.id);
});

router.get('/', (ctx, next) => {
	ctx.body = 'Hello Welcome to Job portal!!!!';
});

router.post('/posts', (ctx, next) => {
	console.log(ctx.request.body);
	let { id, title, content } = ctx.request.body;
	if (!id) {
		ctx.throw(400, 'id is a required field!');
	}
	if (!title) {
		ctx.throw(400, 'title is a required field!');
	}

	if (!content) {
		ctx.throw(400, 'content is a required field!');
	}

	posts.push({ id, title, content });
	ctx.body = posts;
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(PORT);
console.log(`App is running on ${PORT}`);
