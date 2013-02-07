// Mongo
var mongo = require('mongodb'),
	Server = mongo.Server,
	Db = mongo.Db;
	mConfig = require('./block_github/mongolab.json'),
	server = new Server(mConfig.url, mConfig.port, {auto_reconnect : true}),
	db = new Db(mConfig.database, server);
	
	
// Twitter
var twitter = require('ntwitter'),
	tConfig = require('./block_github/twitter.json');

// Mongo
db.open(function(err, client) {
	client.authenticate(mConfig.userName, mConfig.password, function(err, success) {

		// Twitter
		var twit = new twitter({
		  consumer_key: tConfig.consumerKey,
		  consumer_secret: tConfig.consumerSecret,
		  access_token_key: tConfig.accessToken,
		  access_token_secret: tConfig.accessTokenSecret
		});
	
		// Twitter
		twit.stream('statuses/sample', function(stream) {
			stream.on('data', function (data) {
	
				// Mongo
				db.collection('tweets', function(err, collection) {
					console.log(data.text);
					collection.insert(data);
				});
				if (err != null) console.log(err);
			});
			if (err != null) console.log(err);
		});
    });
});
