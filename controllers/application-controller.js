module.exports = {
	/**
	 * @api {post} /applications Create a new candidate.
	 *@apiGroup Applications
	 *@apiName createApplications
	 *@apiParam {String} [firstName] Candidate's First Name.
	 *@apiParam {String} [lastName] Candidate's Last Name.
	 *@apiParam {String} [email] Candidate's Email Address.
	 *@apiParam {Number} [JobId] Related Job Id that candiate applying for

	 * @apiParamExample {json} Request Params:
	 *	{
	 *   "firstName": "James",
	 *   "lastName": "William",
	 *   "email":"james@yahoo.com",
	 *   "jobId":2
	 *	}
	 * @apiSuccess {Object} Application New  Application or Candidate for the selected job.
	 * @apiSuccessExample {json} Application -Success-Response:
	 * HTTP/1.1 200 OK
		{
		    "firstName": "James",
		    "lastName": "William",
		    "email":"james@yahoo.com",
			"jobId":2
		}
	 *@apiExample {curl} Example usage:
	 *curl -i http://localhost:8000/applications
	 *@apiDescription User-candiate can apply for selected job.
	 *@apiHeader {String} Authorization-Token JWT Authorization header.
	 *@apiHeaderExample {json} Request Authorization Header
	 *{
	 *	"authorization":"gkskkvkgkfkls340444004400ldlcgrynb"
	 *}
	 */
	async create(ctx) {
		try {
			const candidate = await ctx.db.Candidate.create({
				firstName: ctx.request.body.firstName,
				lastName: ctx.request.body.lastName,
				email: ctx.request.body.email,
			});

			ctx.body = await ctx.db.Application.create({
				JobId: ctx.request.body.jobId,
				CandidateId: candidate.id,
			});
		} catch (err) {
			ctx.throw(500, err);
		}
	},
};
