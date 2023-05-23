const express = require('express');
const path = require('path');
const expressSession = require('express-session');
const morgan = require('morgan');

const app = express();

const loginRouter = require('./routes/login'); //로그인 요청 처리하는 라우터
const registerRouter = require('./routes/register'); // 회원가입 요청 처리하는 라우터

app.set('port', process.env.PORT || 3002);
app.set('view engine', 'ejs'); //템플릿 엔진으로 ejs를 사용
app.set('views', './views');

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded( {extended : false} )); 

app.use(morgan('dev')); //dev 옵션으로 morgan에게 서버 로그 받기

app.use(expressSession({
    secret: 'keyboard cat',          
    resave: false, // 세션 데이터에 변화가 있을 때에만 저장한다. true면 계속 저장
    saveUninitialized:true //세션이 필요하기 전까지는 세션을 구동하지 않는다.
}));

app.get('/', (req, res, next) => { // '/' 요청
    if(req.session.user){ //저장된 세션이 있으면 (로그인 되어 있으면)
        res.redirect('/main'); // 메인 페이지로
    }else{ //로그인 안되어있으면
        res.redirect('/login'); //로그인 페이지로
    }
})

app.get('/main', (req, res) => { // '/main' 요청
    if(req.session.user){ //로그인 되어 있으면
        //메인페이지를 렌더링 이떄 로그인된 아이디를 id변수에 넣어서 같이 전달
        res.render('main', { id : req.session.user.id }); 
    }else{
        //로그인 안되어있으면 로그인 페이지 렌더링
        res.render('login'); 
    }
})

app.get('/logout', (req, res) => { // '/logout' 요청
    req.session.destroy( // 세션 삭제
        function (err) {
            if(err){
                console.log('세션 삭제시 에러');
                return;
            }
            console.log('로그아웃(세션 삭제) 성공');

            res.redirect('/login'); // 로그아웃 하면 다시 로그인 페이지로
        }

    )
})

app.use('/login', loginRouter); //로그인 요청 라우터
app.use('/register', registerRouter); //회원가입 요청 라우터

app.listen(app.get('port'), () => {
    console.log(`${app.get('port')} 번 포트에서 대기 중`);
})