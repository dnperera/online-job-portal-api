module.exports = {
	/**
	 * @api {post} /jobs Create a new job posting.
	 *@apiGroup Jobs
	 *@apiName createJob
	 * @apiParam {String} [title] User must provide the title of the job.
	 * @apiParam {Text} [description] Description or introduction about the job.
	 * @apiParam {Text} [responsibilities] Responsibilities or tasks involve with the job.
	 * @apiParam {Text} [skills] Skills needed for the job.
	 * @apiParam {Number} [CompanyId] user needs to provide related Company ID.
	 *
	 * @apiParamExample {String} Request Params:
	 *{
	 *	"title":"Java Senior Developer with Oracle",
	 *	"description":"We are looking for a smart and energetic developer who wants to take part in architecting and implementing a novel product from scratch, leveraging open source where possible and filling in the gaps with clean, tested, maintainable code.",
	 *	"responsibilities":"Iterate with UX and design team to specify the client experience Work directly with engineering team to architect application components and services Implement application components and services Do whatever else needs to be done. We are a small team",
	 *	"skills":"React and/or React-Native,Node JS ,Express,CSS,SASS",
	 *	"CompanyId":1
	 *}
	 * @apiSuccess {Object} Job Newly created Job.
	 * @apiSuccessExample {json} Signup -Success-Response:
	 * HTTP/1.1 200 OK
	 * {
	 *   "id": 5,
	 *   "title": "Java Senior Developer with Oracle",
	 *   "description": "We are looking for a smart and energetic developer who wants to take part in architecting and implementing a novel product from scratch, leveraging open source where possible and filling in the gaps with clean, tested, maintainable code.",
	 *   "responsibilities": "Iterate with UX and design team to specify the client experience Work directly with engineering team to architect application components and services Implement application components and services Do whatever else needs to be done. We are a small team",
	 *   "skills": "React and/or React-Native,Node JS ,Express,CSS,SASS",
	 *   "CompanyId": 1,
	 *   "updatedAt": "2018-06-04T18:57:41.759Z",
	 *   "createdAt": "2018-06-04T18:57:41.759Z"
	 *}
	 *@apiExample {curl} Example usage:
	 *curl -i http://localhost:8000/jobs
	 *@apiDescription User can add new jobs for a given company.
	 *@apiHeader {String} Authorization-Token JWT Authorization header.
	 *@apiHeaderExample {json} Request Authorization Header
	 *{
	 *	"authorization":"gkskkvkgkfkls340444004400ldlcgrynb"
	 *}
	 */
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

	/**
	 *@api {get} /jobs Get the list of jobs.
	 *@apiGroup Jobs
	 *@apiName getJobs
	 *@apiSuccess {Object[]} Jobs list of jobs with related candidates
	 *@apiExample {curl} Example usage:
	 *curl -i http://localhost:8000/jobs
	 *@apiDescription Authorized user can view all the jobs.
	 *@apiHeader {String} Authorization-Token JWT Authorization header.
	 *@apiHeaderExample {json} Request Authorization Header
	 *{
	 *	"authorization":"gkskkvkgkfkls340444004400ldlcgrynb"
	 *}
	 */
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
