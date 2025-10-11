const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors({
  origin: [
    'http://localhost:5500', 
    'http://localhost:5501',
    'http://127.0.0.1:5500',
    'http://127.0.0.1:5501',
    'https://mola.mk',
    'https://www.mola.mk',
    'https://bediwrld.github.io'
  ]
}));

app.post('/api/contact', async (req, res) => {
  const { name, email, subject, message } = req.body;

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER || 'pajazitiubejd1@gmail.com',
      pass: process.env.EMAIL_PASS || 'tjle kbmr ssvt rqgg'
    }
  });

  try {
    await transporter.sendMail({
      from: '"Mola Caffe Contact" <pajazitiubejd1@gmail.com>',
      to: 'onlycoins1905@gmail.com',
      subject: subject,
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

// Use Railway's PORT or default to 3001
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));