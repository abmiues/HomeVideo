const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

const logger = require('morgan');

const app = express();

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
//---------此处为项目修改内容------//
const session = require('express-session');
app.set('views', path.join(__dirname, 'views'));
app.engine('.html',require('ejs').__express);
app.set('view engine', 'html');
app.use(cookieParser('Amadeus'));
app.use(session({
    secret:'Amadeus',
    resave:true,
    saveUninitialized:true,//每次访问都自动获取session,如果没有,则创建
    rolling:true,//配置如果登陆后，重置session过期时间
    cookie:{maxAge:10*24*3600*1000}//保存10天,单位毫秒
}))
//---------此处为项目修改内容------//

//---------此处添加路由---------//
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const videoRouter=require('./routes/video');
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/video', videoRouter);
//---------此处添加路由---------//

/*//实现post请求的数据打印
const bodyParser=require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));//解析post请求
//*/

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
