const Router = require('koa-router');
const router = new Router();
const { CompanyController } = require('../controllers');

router.post('/companies', CompanyController.create);

module.exports = router;
