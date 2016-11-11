// Express server for DKW Communications Demo 
var express = require('express');
var app = express();

app.get('*', function(req, res){
	res.sendFile('index.html', {root : __dirname + '/public'});

});

app.listen(process.env.PORT || 8080, function () {
   console.log('DEMO TIME!');
});