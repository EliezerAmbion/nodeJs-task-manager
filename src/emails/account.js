const sgMail = require('@sendgrid/mail');

// to let sendgrid know we want to work w/ this (sendgridAPIKey) api key.
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
  // to set an individual email
  sgMail.send({
    to: email,
    from: 'forproxyacct@gmail.com',
    subject: 'Welcome to the Elis APP',
    text: `Hello, ${name}! Let me know how you get along with the app.`,
  });
};

const sendCancellationEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: 'forproxyacct@gmail.com',
    subject: 'We are sad to see you go',
    text: `Hello, ${name}, tell us why you want to cancel your account.`,
  });
};

// exprorting an object
module.exports = {
  sendWelcomeEmail,
  sendCancellationEmail,
};
