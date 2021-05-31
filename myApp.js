var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var bp = bodyParser.urlencoded({extended:false});

app.use('/public',express.static(__dirname +'/public/'));
app.use(loggingMiddleware);
app.use(bp);

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

app.get('/now', (req,res,next) => {
    req.time = new Date().toString();
    next();
}, (req,res) => {
    res.json({
        time: req.time
    });
});
app.get('/:word/echo', (req,res) => {
    res.json({
        echo: req.params.word
    });
});

app.route('/name').get((req,res) => {
    res.json({
        name: req.query.first + ' ' + req.query.last
    });
}).post((req,res) => {
    res.json({
        name: req.body.first + ' ' +  req.body.last
    });
});

function loggingMiddleware(req,res,next) {
    console.log(req.method + ' ' + req.path + ' - ' + req.ip);
    next();
}

 module.exports = app;
