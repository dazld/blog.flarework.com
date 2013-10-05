var express = require('express');
var app = express();
var Poet = require('poet');
var handle404 = require('./lib/handle-404');


var poet = Poet(app, {
	posts: './_posts/',
	postsPerPage: 5,
	metaFormat: 'json'
});



poet.watch().init(function(){
	
	
});

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.static(__dirname + '/public'));
app.use(app.router);
app.use(handle404);


// app.configure('development', function() {
	app.use(express.errorHandler({
		dumpExceptions: true,
		showStack: true
	}));
// });

// app.configure('production', function() {
// 	app.use(express.errorHandler());
// });


app.get('/', function(req, res) {
	res.render('index', {
		title: 'flarework'
	});
});

app.listen(3030);