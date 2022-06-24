import { createTransport } from 'nodemailer';

// TODO : Update this to be modularized and replace sendVerificationEmail.js with methods from here.

// Email Verification
// Create reusable transporter object using the default SMTP transport
const transporter = createTransport({
    port: 465,               // true for 465, false for other ports
    host: "gmail",
       auth: {
            user: 'brainbeatsdev@gmail.com',
            pass: process.env.EMAIL_PASSWORD,
         },
    secure: true,
});
  
// Send mail with defined transport object
async function sendMail(urlID, email) {
    const mailData = {
        from: 'brainbeatsdev@gmail.com',  // Sender address
            to: email,                    // List of receivers
            subject: 'Verify your login to BrainBeats!',
            text: 'Please click the following link to verify your login to BrainBeats: ' + 'https://brainbeats.dev/verify/' + urlID,
            html: '<b>Hey there! </b><br> This is our first message sent with Nodemailer<br/>',
    };

    transporter.sendMail(mailOptions, function (err, info) {
        if(err)
            console.log(err)
        else
            console.log('Email Sent: ' + info.response);
    });
}
  