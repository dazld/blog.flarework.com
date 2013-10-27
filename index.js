process.chdir(__dirname);

var express = require('express');
var app = express();
var Poet = require('poet');
var handle404 = require('./lib/handle-404');


var poet = Poet(app, {
	posts: './_posts/',
	postsPerPage: 5,
	metaFormat: 'json'
});

poet.addRoute('/posts/:post',function(req,res){
	var post = poet.helpers.getPost(req.params.post);
	if (post) {
		// Do some fancy logging here
		res.render('post', {
			title: post.title,
			post: post
		});
	} else {
		res.send(404);
	}
});

poet.watch().init(function(){
	console.log('up and running: ', new Date());
});

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.static(__dirname + '/public'));
app.use(app.router);
app.use(handle404);

app.get('/rss', function (req, res) {
  // Only get the latest posts
  var posts = poet.helpers.getPosts(0, 5);
  res.setHeader('Content-Type', 'application/rss+xml');
  res.render('rss', { posts: posts });
});

app.configure('development', function() {
	app.use(express.errorHandler({
		dumpExceptions: true,
		showStack: true
	}));
});

app.configure('production', function() {
	app.use(express.errorHandler());
});

app.get('/', function(req, res) {
	res.render('index', {
		title: 'flarework'
	});
});

app.get('/sitemap.xml', function (req, res) {
  // Only get the latest posts
  var postCount = poet.helpers.getPostCount();
  var posts = poet.helpers.getPosts(0, postCount);
  res.setHeader('Content-Type', 'application/xml');
  res.render('pages/sitemap', { posts: posts });
});

app.get('/about', function(req, res) {
	res.render('pages/about', {
		title: 'About'
	});
});


app.get('/post/', function(req, res) {
	res.render('index', {
		title: 'flarework'
	});
});

app.listen(3030, '127.0.0.1');
