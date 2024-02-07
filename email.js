require('dotenv').config();


const sendWelcomeEmail = (userEmail, password) => {
    // Create a transporter using Gmail SMTP
    const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL, // Your Gmail email address
      pass: process.env.GMAIL_PASSWORD // Your Gmail password or App password
    }
    });
    
    // Define email options
    const mailOptions = {
    from: 'support@educativ.com',
    to: userEmail, // User's email address
    subject: 'Welcome to Educativ',
    text: `Hello, your login credentail are: Email: ${userEmail} and Password:${password}. Keep it to only yourself`
    };
    
    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error occurred:', error);
    } else {
      console.log('Email sent:', info.response);
    }
    });
    };

module.exports = sendWelcomeEmail;
