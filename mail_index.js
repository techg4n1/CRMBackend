//1. install nodemailer libararay

//2. import nodemailer
const nodemailer = require('nodemailer');

//3. cofigure mail and send it
async function sendMail(){
    //1. create an email transporter.
    //SMTP (Simple Mail Transfer Protocol)
   const transporter =  nodemailer.createTransport({
        service: 'gmail',
        auth:{
            user: 'pravinnagla00000@gmail.com',
            pass: 'wjbnpkwoxtwiskpm '
        }
    })


    //2.configure email content.
    const mailOptions = {
        from:'pravinnagla00000@gmail.com',
        to: 'techg4n1@gmail.com',
        subject: 'Welcome to NodeJS App',
        text: 'This is an email using nodemail in nodejs',
        attachments: [
            {
                path: './text.txt'
            },
            {   // use URL as an attachment
                filename: 'license.txt',
                path: 'https://raw.github.com/nodemailer/nodemailer/master/LICENSE'
            }
        ]
    }

    //3. send email
    try {
       const result = await transporter.sendMail(mailOptions);
       console.log('Eamil sent successfully')
    } catch (error) {
        console.log('Email send failed with error:', error)
    }
}

sendMail();