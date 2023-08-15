const express = require('express');
const app = express();
const mysql = require('mysql');
const port = 5500;
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const mainpagejsFile = require('./mainpage_server');

dotenv.config({path: './env/secretkey.env'});
const secretkey = process.env.secretkey

dotenv.config({path: './env/mysql.env'});
const {sql_host, sql_user, sql_password} = process.env

app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

const connection = mysql.createConnection({
    host     : sql_host,
    user     : sql_user, 
    password : sql_password,
    database : 'mainInfo',
    multipleStatements: true
});

var information = '';

connection.connect();
function reload(){
    connection.query('select * from userinfo', function(error, results, fields){
        if(error){
          console.log('error');
        }
        information = results;
    })
}

reload();

app.get('/', mainpagejsFile.mainpage)

app.get('/login', function(req, res){
    res.sendFile(__dirname + '/login.html');
})

app.get('/signup', function(req, res){
    res.sendFile(__dirname + '/signup.html');
})

app.get('/fund', function(req, res){
    res.sendFile(__dirname + '/fund.html')
})

app.post('/login', function(req, res){
    const userid = req.body.userid;
    const password = req.body.password;

    let i = 0;
    while(1){
        if(information[i] == null){
            res.send(`<script>alert('아이디 혹은 비밀번호가 틀렸습니다.'); location.href='/login'</script>`)
            break;
        }
        if(information[i].id == userid){
            connection.query(`select AES_DECRYPT(unhex("password"), "asdf") from userinfo`, function(error, results, field){
                console.log(results);
                if(results[i] == password){
                    token = jwt.sign(
                    {
                        type: 'JWT',
                        id: information[i].id,
                        name: information[i].name,
                        number: information[i].number
                    },
                    secretkey,
                    {
                        expiresIn: '15m',
                        issuer: 'Ainvestment'
                    }
                    )
                    res.cookie('jwt', token);

                    res.send(`<script>alert('로그인 성공'); location.href='/'</script>`);
                }
                else{
                    res.send( `<script>alert('아이디 혹은 비밀번호가 틀렸습니다.'); location.href="/login"</script>`)
                }
            })
            break;
            
        }
        i++;
    }    
})

app.post('/signup', function(req, res){
    const name = req.body.name;
    const id = req.body.id;
    const email = req.body.email;
    const phone_number = req.body.phone_number;
    const password1 = req.body.password1;
    const password2 = req.body.password2;
    const gender = req.body.gender;
    console.log(name);

    if(password1 != password2){
        res.send(`
        <script>alert('비밀번호를 잘못 입력하셨습니다.'); location.href='/signup'</script>
        `)
        return 0
    }

    let i=0
    while(1){
        if(information[i] == null){
            connection.query(`insert into userinfo(number, name, id, password, email, phone_number, gender) \ values("${i+1}","${name}","${id}",hex(aes_encrypt("${password1}","asdf")),"${email}","${phone_number}","${gender}")`,function(err, results, fields){
                if(err){
                    console.log(err);
                }
                else{
                    console.log('회원가입 성공');
                    reload();
                    console.log(name)
                    res.send(`<script>alert('회원가입을 성공하셨습니다. 반갑습니다 ${name}님'); location.href='/'</script>`)
                }
            })
            break;
        }
        if(information[i].name == name){
            res.send(`
            <script>alert('이미 존재하는 이름입니다.'); location.href='/signup'</script>
            `)
            break;
        }
        i++
    }

})

app.listen(port, function(){
    console.log('5500번 포트 실행중');
})