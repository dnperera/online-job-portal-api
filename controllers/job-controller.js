module.exports = {
	async create(ctx) {
		try {
			if (!ctx.request.body.title) {
				ctx.throw(400, 'Please provide the job title!!');
			}

			if (!ctx.request.body.CompanyId) {
				ctx.throw(400, 'Please provide the company id !!');
			}

			ctx.body = await ctx.db.Job.create({
				title: ctx.request.body.title,
				description: ctx.request.body.description,
				responsibilities: ctx.request.body.responsibilities,
				skills: ctx.request.body.skills,
				CompanyId: ctx.request.body.CompanyId,
			});
		} catch (err) {
			ctx.throw(500, err);
		}
	},

	async find(ctx) {
		try {
			ctx.body = await ctx.db.Job.findAll({
				include: [ctx.db.Candidate],
			});
		} catch (err) {
			ctx.throw(500, err);
		}
	},
};
