const express = require('express');
// Const fortune = require('./lib/fortune');
const handlers = require('./lib/handlers');
const {engine} = require('express-handlebars');

const app = express();

// Настройка механизма представлений Handlebars.
app.engine('handlebars', engine({
	defaultLayout: 'main',
}));
app.set('view engine', 'handlebars');

const port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get('/', handlers.home);
app.get('/about', handlers.about);
app.get('/newsletter', handlers.newsletter);
app.post('/api/newsletter-signup', handlers.api.newsletterSignup); // Проверьте правильность пути
app.get('/newsletter-signup', handlers.newsletterSignup);
app.post('/newsletter-signup/process', handlers.newsletterSignupProcess);
app.get('/newsletter-signup/thank-you', handlers.newsletterSignupThankYou);

// Пользовательская страница 404
app.use(handlers.notFound);
// Пользовательская страница 500
app.use(handlers.serverError);

if (require.main === module) {
	app.listen(port, () => {
		console.log(`Express запущен на http://localhost:${port}; нажмите Ctrl + C для завершения.`);
	});
} else {
	module.exports = app;
}
