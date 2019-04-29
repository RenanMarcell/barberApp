const express = require('express');
const nunjucks = require('nunjucks');
const path = require('path');
const session = require('express-session');
const lokiStore = require('connect-loki')(session)
const flash = require('connect-flash');

class App {
	constructor() {
		this.express = express();
		this.isDev = process.env.NODE_ENV !== 'production';
		this.middlewares();
		this.views();
		this.routes();
	}
	middlewares() {
		this.express.use(express.urlencoded({ extended: false }));
		this.express.use(session({
			secret: 'MyAppSecret',
			resave: false,
			saveUninitialized: true,
			store: new lokiStore({
				path: path.resolve(__dirname, '..', 'tmp', 'sessions.db')
			})
		}))
		this.express.use(flash());
	}
	views() {
		nunjucks.configure(path.resolve(__dirname, 'app', 'views'), {
			watch: this.isDev,
			express: this.express,
			autoescape: true
		});
		this.express.use(express.static(path.resolve(__dirname, 'public')))
		this.express.set('view engine', 'njk');
	}
	routes() {
		this.express.use(require('./routes'));
	}
}

module.exports = new App().express;