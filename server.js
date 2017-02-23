var express = require('express')

var app = express()

app.get('/api/whoami', function (req, res) {
    try {
        var output = {}

        output.ipaddress = req.headers['x-forwarded-for'].split(",")[0]
            || req.connection.remoteAddress
            || req.socket.remoteAddress
            || req.connection.socket.remoteAddress;
        
        output.language = req.headers["accept-language"].split(",")[0];
        
        var ua = req.headers['user-agent'];
        var regex = /\(.+?\)/
        var result = ua.match(regex);
        output.software = result[0].replace("(", "").replace(")", "");

        res.json(output);
    }
    catch (e) {
        res.sendStatus(500);
    }
})

// Any other url
app.get('*', function (req, res) {
    res.send("Please visit " + req.headers.host + "/api/whoami/");
});

app.listen(process.env.PORT || 8080, function () {
    console.log('App started');
})