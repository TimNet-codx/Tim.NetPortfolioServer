const express = require('express');
const nodemailer = require('nodemailer');
const { Resend } = require('resend');
const router = express.Router();

// Replace with your real receiving email address
const resend = new Resend(process.env.RESEND_API_KEY);
const RECEIVING_EMAIL_ADDRESS = process.env.RECEIVING_EMAIL || 'contact@example.com';

// Configure your SMTP transport (fill in your real credentials)
// const transporter = nodemailer.createTransport({
//   host: 'jesulayomitimze55@gmail.com',
//   port: 587,
//   secure: false, // true for port 465, false for other ports
//   auth: {
//     user: 'jesulayomitimze55@gmail.com',
//     pass: 'Ajto2218@'
//   }
// });

// const transporter = nodemailer.createTransport({
//   host: 'smtp.gmail.com',
//   port: 587,
//   secure: false,
//   auth: {
//     user: process.env.GMAIL_USER,
//     pass: process.env.GMAIL_APP_PASSWORD
//   },
//   family: 4
// });

// router.post('/contact', async (req, res) => {
//   const { name, email, subject, message } = req.body;

//   // Basic validation
//   if (!name || !email || !message) {
//     return res.status(400).json({ error: 'Name, email, and message are required.' });
//   }

//   // Build the email body similarly to add_message() calls in PHP version
//   const emailBody = `
// From: ${name}
// Email: ${email}

// Message:
// ${message}
//   `.trim();

//   const mailOptions = {
//     from: `"${name}" <${email}>`,
//     to: RECEIVING_EMAIL_ADDRESS,
//     replyTo: email,
//     subject: subject || 'New Contact Form Submission',
//     text: emailBody
//   };

//   try {
//     await transporter.sendMail(mailOptions);
//     res.json({ sent: true });
//   } catch (err) {
//     console.error('Error sending email:', err);
//     res.status(500).json({ error: 'Unable to send email. Please try again later.' });
//   }
// });

router.post('/contact', async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required.' });
  }

  try {
    await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>', // works immediately without domain verification
      to: RECEIVING_EMAIL_ADDRESS,
      replyTo: email,
      subject: subject || 'New Contact Form Submission',
      text: `From: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    });

    res.json({ sent: true });
  } catch (err) {
    console.error('Error sending email:', err);
    res.status(500).json({ error: 'Unable to send email. Please try again later.' });
  }
});

module.exports = router;