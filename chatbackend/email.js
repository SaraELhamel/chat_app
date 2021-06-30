const nodemailer = require('nodemailer');
const emailCrypter = require('./emailCrypter');


const transport = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: "projectmailtestyc@gmail.com",
        pass: "youcode2020",
    },
});
module.exports = async function sendEmail(verificationKey) {

    const mailOptions = {
        from: 'projectmailtestyc@gmail.com',
        to:'saraelhamel88@gmail.com',
        subject:'validation',
        html: 'This is your verification link : ' + verificationKey,
    };
    console.log('hola')
    transport.sendMail(mailOptions, (error) => {
        if (error) {
            console.log(error);
        }
    });
};