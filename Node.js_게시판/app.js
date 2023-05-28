const express = require('express');
const path = require('path');
const morgan = require('morgan');

const app = express();

const postListRouter = require('./routes/post_list');
const postDetailRouter = require('./routes/post_detail');
const loginRouter = require('./routes/login');
const registerRouter = require('./routes/register');

app.set('port', process.env.PORT || 3002);
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(morgan('dev'));

app.listen(app.get('port'), () => {
    console.log(`${app.get('port')}번 포트에서 대기 중`);
})


app.use('/', postListRouter);