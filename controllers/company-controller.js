module.exports = {
	async create(ctx) {
		try {
			//create new record
			ctx.body = await ctx.db.Company.create({
				name: ctx.request.body.name,
				city: ctx.request.body.city,
				address: ctx.request.body.address,
				UserId: ctx.state['user'],
			});
		} catch (err) {
			ctx.throw(500, err);
		}
	},

	async find(ctx) {
		try {
			ctx.body = await ctx.db.Company.findAll({
				where: { UserId: ctx.state['user'] },
				include: [{ model: ctx.db.Job }],
			});
		} catch (err) {
			ctx.thow(500, err);
		}
	},
	async findOne(ctx) {
		try {
			const company = await ctx.db.Company.findOne({
				where: { id: ctx.params.id },
			});
			if (!company) {
				ctx.throw(404, 'Company is not found.');
			}
			ctx.body = company;
		} catch (err) {
			ctx.throw(500, err);
		}
	},

	async delete(ctx) {
		try {
			const results = await ctx.db.Company.destroy({
				where: {
					id: ctx.params.id,
				},
			});

			results === 0
				? ctx.throw(404, 'Company not found !!')
				: `Compamy is deleted with id ${ctx.params.id}`;
			ctx.body = results;
		} catch (err) {
			ctx.throw(500, err);
		}
	},

	async update(ctx) {
		try {
			const results = await ctx.db.Company.update(
				{
					name: ctx.request.body.name,
					city: ctx.request.body.city,
					address: ctx.request.body.address,
				},
				{
					where: {
						id: ctx.params.id,
					},
				}
			);

			results === 0
				? ctx.throw(404, 'Company not found !!')
				: `Company was updated with id ${ctx.params.id}`;
			ctx.body = results;
		} catch (err) {
			ctx.throw(500, err);
		}
	},
};
