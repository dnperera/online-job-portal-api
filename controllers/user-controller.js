const UtilService = require('../services/util-service');
const JWTService = require('../services/jwt-service');

module.exports = {
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
