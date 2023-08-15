const express = require('express');
const app = express();
const nodemailer = require('nodemailer');
const SendmailTransport = require('nodemailer/lib/sendmail-transport');
const dotenv = require('dotenv');
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

dotenv.config({path: './env/secretkey.env'});
const secretkey = process.env.secretkey;

dotenv.config({path: './env/mysql.env'});
const {sql_host, sql_user, sql_password} = process.env

const connection = mysql.createConnection({
  host     : sql_host,
  user     : sql_user, 
  password : sql_password,
  database : 'maininfo',
  multipleStatements: true
});

var information = '';

connection.connect();
  function reload(){
  connection.query('select * from emailCheck', function(error, results, fields){
      if(error){
        console.log('error');
      }
      information = results;
  })
}

reload();

dotenv.config({path : './env/mail.env'})
const {email_service, user, pass} = process.env

const transporter = nodemailer.createTransport({
  service: email_service,
  auth: {
    user: user,
    pass: pass
  }
})

function generateRandomCode() {
  let str = ''
  for (let i = 0; i < 6; i++) {
    str += Math.floor(Math.random() * 10)
  }
  return str
}

app.post('/sendmail', function(req, res){
  const email_destination = req.body.email
  connection.query(`select * from emailCheck`, function(error, results, fields){
    let i = 0;
    while(1){
      if(results[i] == null){
        console.log('먼저 입력된 이메일 없음');
        
        console.log('이메일 정보 ㄲ')
        connection.query(`insert into emailCheck(RandomNumber, email) values("${randomKey}","${email_destination}")`, function(error, results, fields){
          if(error){
            console.log(error);
          }
        })
         break;
      }
      if(results[i].email == email_destination){
        connection.query(`delete from emailcheck where email='${email_destination}'`, function(error, results, fields){
          if(error){
            console.log(error);
          }
          else{
            console.log('지움')

            console.log('이메일 정보 ㄲ')
            connection.query(`insert into emailCheck(RandomNumber, email) values("${randomKey}","${email_destination}")`, function(error, results, fields){
              if(error){
                console.log(error);
              }
            })
            
          }
        })
        break;
      }
      i++;
    }
  })

  const randomKey=generateRandomCode()
  
  const mailOptions = {
      from: user,
      to: email_destination,
      subject: 'Nodemailer Test',
      text: `이 숫자를 입력하세요 ${randomKey}`
    };

    transporter.sendMail(mailOptions, function(error, info){
      if(error){
        console.error(error);
      }
      else{
        console.log('Email Sent : ', info)
      }
    })  
    token = jwt.sign(
      {
        type: 'JWT',
        email: email_destination
      },
      secretkey,
      {
        expiresIn: '15m',
        issuer: 'Ainvestment'
      }
    )
    res.cookie('jwt', token);
  res.send(`<script>alert('이메일을 전송하였습니다.'); location.href='/'</script>`)
})

app.get('/', function(req, res){
  
  res.send(`
  <form action="/sendmail" method="post">
    <input type="email" name="email">
    <input type="submit">
  </form>

  <form action="/email_check" method="post">
    <input type="text" name="inputnum"></input>
    <input type="submit">
  </form>
  `) 
});

app.post('/email_check', function(req, res){
  const inputnum = req.body.inputnum;
  const token = req.headers.cookie;
  const verified = jwt.verify(token.substring(4), secretkey);
  const email_destination = verified.email;
  connection.query('select * from emailcheck', function(error, results, fields){
    if(error){
      console.log(error);
    }
    let i = 0;
    while(1){
      if(results[i].email == email_destination){
        if(results[i].RandomNumber == inputnum){  
          res.send(`<script>alert('이메일 인증 성공')</script>`);
          console.log(i+'번째');
          connection.query(`delete from emailcheck where email='${email_destination}'`)
          break;
        }
        else{
          res.send(`<script>alert('번호를 잘못 입력하셨습니다.'); location.href='/'</script>`);
          break;
        }
      }
      i++;
    }

  })
})

app.listen('3000',function(){
  console.log('3000번 포트 실행중')
})