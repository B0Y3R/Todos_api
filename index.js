var express = require('express'),
	app = express();
	port = 3000

var todoRoutes = require('./routes/todos');

app.get('/', function(req, res){
	res.send("Hello from the ROOT ROUTE!");
});

app.use('/apis/todos', todoRoutes);

app.listen(port, function () {
	console.log("APP IS RUNNING");
});