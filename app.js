var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var axios = require('axios')
var code = require('./codeParams')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/********************************************************************************************************/

//设置允许跨域访问该服务.
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Content-Type', 'application/json;charset=utf-8');
    next();
});

//社区活动
app.use('/api/v1.0/communityActCon/homePageList', function (req, res, next) {
    axios.get('https://www.universelife.cn/activity/api/v1.0/communityActCon/homePageList', {}).then(function (response) {
        console.log('---', response.data);
        res.send(response.data)
    })
})
//banner
app.use('/api/bannerCon/bannerShow', function (req, res, next) {
    axios.get('https://www.universelife.cn/heli-oms/api/bannerCon/bannerShow', {
        params:code(req.query)
    }).then(function (response) {
        console.log('----',req.query,'------')
        console.log(code(req.query))
        // console.log('---', response.data);
        res.send(response.data)
    })
})

/********************************************************************************************************/

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
