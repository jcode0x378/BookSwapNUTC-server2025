const Router = require('koa-router');
const paymentController = require('../controllers/paymentController');

let paymentRouter = new Router();

paymentRouter.post('/payment/create', paymentController.createTransaction);
paymentRouter.post('/payment/return', paymentController.handleReturn);

module.exports = paymentRouter;
