const Router = require('koa-router');
const router = new Router();
const {
	CompanyController,
	JobController,
	ApplicationController,
	UserController,
} = require('../controllers');

//Company routes
router.post('/companies', CompanyController.create);
router.get('/companies', CompanyController.find);
router.get('/companies/:id', CompanyController.findOne);
router.delete('/companies/:id', CompanyController.delete);
router.put('/companies/:id', CompanyController.update);

//Job routes
router.post('/jobs', JobController.create);
router.get('/jobs', JobController.find);

//Application routes
router.post('/applications', ApplicationController.create);

//User routes
router.post('/signup', UserController.signup);

module.exports = router;
