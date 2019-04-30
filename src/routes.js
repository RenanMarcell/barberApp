const express = require('express');
const multerConfig = require('./config/multer');
const upload = require('multer')(multerConfig);
const AppointmentController = require('./app/controllers/AppointmentController');
const AvailableController = require('./app/controllers/AvailableController');
const BarberDashboardController = require('./app/controllers/BarberDashboardController');
const DashboardController = require('./app/controllers/DashboardController');
const FileController = require('./app/controllers/FileController');
const SessionController = require('./app/controllers/SessionController');
const UserController = require('./app/controllers/UserController');
const authMiddleware = require('./app/middlewares/auth');
const guestMiddleware = require('./app/middlewares/guest');

const routes = express.Router();

routes.use((req, res, next) => {
	res.locals.flashSuccess = req.flash('success');
	res.locals.flashError = req.flash('error');
	return next();
})
routes.use('/app', authMiddleware);

routes.get('/', guestMiddleware, SessionController.create);
routes.get('/signup', guestMiddleware, UserController.create);
routes.get('/files/:file', FileController.show);
routes.get('/app/dashboard', DashboardController.index);
routes.get('/app/dashboard/:provider', BarberDashboardController.index);
routes.get('/app/logout', SessionController.destroy);
routes.get('/app/appointments/new/:provider', AppointmentController.create);
routes.get('/app/available/:provider', AvailableController.index);

routes.post('/signup', upload.single('avatar'), UserController.store);
routes.post('/signin', SessionController.store);
routes.post('/app/appointments/new/:provider', AppointmentController.store);

module.exports = routes;