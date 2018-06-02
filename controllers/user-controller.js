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
			ctx.body = await ctx.db.User.create({
				email,
				password,
			});
		} catch (err) {
			ctx.throw(500, err);
		}
	},
};
