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
  response.send('Hello World!')
})

app.get('/wheelOfFortune', function(request, response) {
  response.render( 'WheelOfFortune', { letters: "this is my puzzle".split( "" ) } );
})

var port = process.env.PORT || 2500;
server.listen(port, function() {
  console.log("LISTENING ON PORT: "+port);
});
