{{{
  "title": "Instance Properties in JS",
  "tags": ["js","playtime"],
  "date": "9-11-2013",
  "description": "hello"
}}}



this is [some](http://www.google.com) `code`
```js
var F = function(){};
```

<!--more-->
and more

```javascript
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


app.get('/post/', function(req, res) {
	res.render('index', {
		title: 'flarework'
	});
});

app.listen(3030);

```