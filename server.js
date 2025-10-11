const express = require('express');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
app.use(express.json());

const allowedOrigins = [
  'http://localhost:5500',
  'http://localhost:5501',
  'http://127.0.0.1:5500',
  'http://127.0.0.1:5501',
  'https://mola.mk',
  'https://www.mola.mk',
  'https://bediwrld.github.io'
];

// Custom CORS middleware
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin'); // important for proxies
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');

  if (req.method === 'OPTIONS') {
    // Preflight request
    return res.sendStatus(200);
  }
  next();
});

app.post('/api/contact', async (req, res) => {
  const { name, email, subject, message } = req.body;

  let transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.brevo_user,
      pass: process.env.brevo_pass
    }
  });

  try {
    await transporter.sendMail({
      from: `"Mola Caffe Contact" <${process.env.brevo_user}>`,
      to: 'onlycoins1905@gmail.com',
      subject,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      html: `<p><strong>Name:</strong> ${name}<br>
             <strong>Email:</strong> ${email}<br><br>
             ${message.replace(/\n/g, '<br>')}</p>`,
      replyTo: email
    });
    res.status(200).json({ success: true });
  } catch (err) {
    console.error('Email error:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
