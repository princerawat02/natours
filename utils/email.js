const pug = require('pug');
const nodemailer = require('nodemailer');
const htmlToText = require('html-to-text');

// new Email(user, url).sendWelcome()
module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(' ')[0];
    this.url = url;
    this.from = `Prince Rawat <${process.env.EMAIL_FROM}>`;
  }

  newTransport() {
    // if (process.env.NODE_ENV === 'production') {
    //   // Sendgrid For PRODUCTION
    //   return nodemailer.createTransport({
    //     // service: 'Brevo',
    //     host: process.env.BREVO_HOST,
    //     port: process.env.BREVO_PORT,
    //     secure: false,
    //     auth: {
    //       user: process.env.BREVO_LOGIN,
    //       pass: process.env.BREVO_PASSWORD,
    //     },
    //   });
    // }
    // For DEVELOPMENT
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  //Send the actual email
  async send(template, subject) {
    // 1) Render HTML based on a pug template
    const html = pug.renderFile(
      `${__dirname}/../views/emails/${template}.pug`,
      {
        firstName: this.firstName,
        url: this.url,
        subject,
      }
    );
    // 2) Define the Email Options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: htmlToText.convert(html),
    };

    // Create a transport and send EMAIL
    await this.newTransport().sendMail(mailOptions);
  }

  //SENDWELCOME METHOD

  async sendWelcome(template, subject) {
    //Send the actual email
    await this.send('Welcome', 'Welcome to he Natours!');
  }

  async sendPasswordReset() {
    await this.send(
      'passwordReset',
      'Your password reset token (valid for only 10 minutes)'
    );
  }
};
