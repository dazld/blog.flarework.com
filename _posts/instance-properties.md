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
<p data-height="320" data-theme-id="0" data-slug-hash="Bmfan" data-user="dazld" data-default-tab="result" class='codepen'>See the Pen <a href='http://codepen.io/dazld/pen/Bmfan'>Logo playtime</a> by Dan Peddle (<a href='http://codepen.io/dazld'>@dazld</a>) on <a href='http://codepen.io'>CodePen</a></p>
<script async src="//codepen.io/assets/embed/ei.js"></script>

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