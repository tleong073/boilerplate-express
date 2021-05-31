var express = require('express');
var app = express();
console.log("Hello World");


app.use('/public',express.static(__dirname +'/public/'));
app.use(loggingMiddleware);

app.get('/',(req,res) => {
    res.sendFile(__dirname + '/views/index.html');
});

app.get('/json',(req,res) => {
    msg = 'Hello json'
    if(process.env.MESSAGE_STYLE == 'uppercase') {
        msg = msg.toUpperCase();
    }
    res.json({
        "message": msg
    });
});

function loggingMiddleware(req,res,next) {
    console.log(req.method + ' ' + req.path + ' - ' + req.ip);
    next();
}

 module.exports = app;
