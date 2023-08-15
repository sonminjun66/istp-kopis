const dotenv = require('dotenv');

dotenv.config({path: './env/test.env'});
console.log(process.env.name)
dotenv.config({path: './env/mail.env'})
console.log(process.env.email_service)