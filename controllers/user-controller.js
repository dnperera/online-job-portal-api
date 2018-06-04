const UtilService = require('../services/util-service');
const JWTService = require('../services/jwt-service');

module.exports = {
	/**
	 * @api {post} /signup Register User information
	 *@apiGroup Users
	 *@apiName signupUser
	 * @apiParam {String} [email] User must provide valid email address.
	 * @apiParam {String} [password] User must provide password.
	 * @apiParamExample {String} Request Params:
	 *{
	 * "email": 'dayan@gmail.com',
	 * "password":"passwordD#$"
	 *}
	 *
	 * @apiSuccess {String} User signup successful.
	 * @apiSuccessExample {json} Signup -Success-Response:
	 * HTTP/1.1 200 OK
	 *{
	 * "msg":"User signup successful"
	 *}
	 *@apiExample {curl} Example usage:
	 *curl -i http://localhost:8000/signup
	 *@apiDescription User can register or create a new account
	 */
	async signup(ctx) {
		let { email, password } = ctx.request.body;
		if (!email) {
			ctx.throw(400, 'Please enter the email');
		}

		if (!password) {
			ctx.throw(400, 'please enter the password');
		}

		try {
			const encryptedPassword = await UtilService.hashPassword(password);
			await ctx.db.User.create({
				email,
				password: encryptedPassword,
			});
			ctx.body = 'User signup successful';
		} catch (err) {
			ctx.throw(500, err);
		}
	},
	/**
	 * @api {post} /login  User login route
	 *@apiGroup Users
	 *@apiName loginUser
	 * @apiParam {String} [email] User must provide valid email address.
	 * @apiParam {String} [password] User must provide password.
	 * @apiParamExample {String} Request Params:
	 *{
	 * "email": 'dayan@gmail.com',
	 * "password":"passwordD#$"
	 *}
	 *
	 * @apiSuccess {Object} Token  A Json Web Token generated to access protected routed
	 * @apiSuccessExample {json} Signup -Success-Response:
	 * HTTP/1.1 200 OK
	 *{
	 * "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
	 *}
	 *@apiExample {curl} Example usage:
	 *curl -i http://localhost:8000/login
	 *@apiDescription User can login with valid email and password
	 */
	async login(ctx) {
		let { email, password } = ctx.request.body;
		if (!email) {
			ctx.throw(400, 'Please enter the email');
		}

		if (!password) {
			ctx.throw(400, 'please enter the password');
		}

		try {
			const user = await ctx.db.User.findOne({
				where: { email },
			});

			if (!user) {
				ctx.throw(500, 'Unable to find user');
			}
			const matched = UtilService.comparedPassword(password, user.password);
			if (matched) {
				//create  json webtoken for the user
				const token = JWTService.issue(
					{
						payload: { user: user.id },
					},
					'1 day'
				);
				ctx.body = { token };
			} else {
				ctx.throw(500, 'Invalid password');
			}
			//once your logged in successfully , create JWT for the user
		} catch (err) {
			ctx.throw(500, err);
		}
	},
};
