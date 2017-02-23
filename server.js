var express = require('express')
var os = require('os');

var app = express()

app.get('/api/whoami', function (req, res) {
    try {
        var output = {}

        output.ipaddress = req.headers['x-forwarded-for'].split(",")[0]
            || req.connection.remoteAddress
            || req.socket.remoteAddress
            || req.connection.socket.remoteAddress;
        output.language = req.headers["accept-language"].split(",")[0]
        output.software = os.type() + " " + os.release()

        res.json(output)
    }
    catch (e) {
        res.sendStatus(500)
    }
})

// Any other url
app.get('*', function (req, res) {
    res.send("Please visit " + req.headers.host + "/api/whoami/");
});

app.listen(process.env.PORT || 8080, function () {
    console.log('App started')
})