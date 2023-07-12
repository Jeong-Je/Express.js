const express = require('express');
const path = require('path');
const morgan = require('morgan');

const app = express();

const authRouter = require('./auth');
app.use(express.json());
app.use(express.urlencoded( {extended : false} )); 

app.set('port', process.env.PORT || 3002);
app.set('view engine', 'ejs');
app.set('views', './');

app.use(express.static(path.join(__dirname, 'public')));

app.use('/mail', authRouter);

app.listen(app.get('port'), () =>{
    console.log(`${app.get('port')}번 포트에서 대기 중.`)
})

let cnt = 0;
app.get('/', (req, res) =>{
    res.render('main', { cnt: cnt});
})
