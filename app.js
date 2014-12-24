var express = require('express'),
    app = express(),
    port = process.env.PORT || 8080;

app.get('/:name?', function (req, res) {
    var name = req.params.name || 'World';
    res.write('<h1>Hello ' + name);
});

app.listen(port);
console.log('Listening on port: ' + port);