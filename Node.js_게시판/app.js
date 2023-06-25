const express = require('express');
const path = require('path');
const morgan = require('morgan');
const expressSession = require('express-session');

const app = express();

const postListRouter = require('./routes/post_list');
const postDetailRouter = require('./routes/post_detail');
const loginRouter = require('./routes/login');
const registerRouter = require('./routes/register');
const postUploadRouter = require('./routes/post_upload');
const commentUploadRouter = require('./routes/comment_upload');

/* 아래 두 코드로 인해 req.body 사용가능 */
app.use(express.json());
app.use(express.urlencoded( {extended : false} )); 

app.use(express.static(path.join(__dirname, 'public')));
app.use(expressSession({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}))

app.set('port', process.env.PORT || 3002);
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(morgan('dev'));

app.listen(app.get('port'), () => {
    console.log(`${app.get('port')}번 포트에서 대기 중`);
})


app.use('/', postListRouter);
app.use('/post_detail', postDetailRouter);
app.use('/post_upload', postUploadRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/comment_upload', commentUploadRouter);

app.get('/logout', (req, res) => {
    req.session.destroy( // 세션 삭제
    function (err) {
        if(err){
            console.log('세션 삭제시 에러');
            return;
        }
        console.log('로그아웃(세션 삭제) 성공');

        res.redirect('/'); // 로그아웃 하면 다시 로그인 페이지로
    }
)
})