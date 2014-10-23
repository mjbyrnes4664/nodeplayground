var express = require('express'),
	hbs = require('express-hbs'),
	http = require('http'),
	app = express(),
	server = http.createServer(app);

hbs.registerHelper('if_eq', function(a, b, opts) {
    if(a === b) 
        return opts.fn(this);
    else
        return opts.inverse(this);
});

app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))

app.configure(function(){
	app.use(express.static(__dirname + '/public'));

	// Use `.hbs` for extensions and find partials in `views/partials`.
	app.engine('hbs', hbs.express3({
	  partialsDir: __dirname + '/templates-src',
	  contentHelperName: 'content',
	}));
	app.set('view engine', 'hbs');
	app.set('views', __dirname + '/templates-src');

	app.engine('html', hbs.express3);
	app.use(express.bodyParser());
});

app.get('/', function(request, response) {
  response.send('Hello World!');
});

app.get('/wheelOfFortune', function(request, response) {
  response.render( 'index' );
});

app.get('/wheelOfFortune/puzzle1', function(request, response) {
  response.render( 'WheelOfFortune', { next: "puzzle2", puzzle: "hakuna matata".split( "" ), category: "phrase" } );
});

app.get('/wheelOfFortune/puzzle2', function(request, response) {
  response.render( 'WheelOfFortune', { next: "puzzle3", puzzle: "city hall and oates".split( "" ), category: "before & after" } );
});

app.get('/wheelOfFortune/puzzle3', function(request, response) {
  response.render( 'WheelOfFortune', { next: "puzzle4", puzzle: "associate appreciation discount".split( "" ), category: "thing" } );
});

app.get('/wheelOfFortune/puzzle4', function(request, response) {
  response.render( 'WheelOfFortune', { next: "puzzle5", puzzle: "fantasy football league of nations".split( "" ), category: "before & after" } );
});

app.get('/wheelOfFortune/puzzle5', function(request, response) {
  response.render( 'WheelOfFortune', { next: "puzzle6", puzzle: "sharknado two: the second one".split( "" ), category: "title" } );
});

app.get('/wheelOfFortune/puzzle6', function(request, response) {
  response.render( 'WheelOfFortune', { next: "puzzle7", puzzle: "republic of the union of myanmar".split( "" ), category: "place" } );
});

app.get('/wheelOfFortune/puzzle7', function(request, response) {
  response.render( 'WheelOfFortune', { puzzle: "anybody next please?".split( "" ), category: "phrase" } );
});

app.get('/xss', function(request, response) {
	response.render( 'XSS', {} );
})

var port = process.env.PORT || 2500;
server.listen(port, function() {
  console.log("LISTENING ON PORT: "+port);
});
