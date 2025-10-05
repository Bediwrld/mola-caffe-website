const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:5500', 'http://localhost:5501']
}));

app.post('/api/contact', async (req, res) => {
  const { name, email, subject, message } = req.body;

  // Replace with your real Gmail and App Password
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'pajazitiubejd1@gmail.com', // <-- CHANGE THIS
      pass: 'tjle kbmr ssvt rqgg'      // <-- CHANGE THIS
    }
  });

  try {
    await transporter.sendMail({
      from: '"Mola Caffe Contact" <pajazitiubejd1@gmail.com>',
      to: 'onlycoins1905@gmail.com', // <-- Updated recipient
      subject: subject,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      html: `<p><strong>Name:</strong> ${name}<br>
           <strong>Email:</strong> ${email}<br><br>
           ${message.replace(/\n/g, '<br>')}</p>`,
      replyTo: email // <-- This line!
    });
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.listen(3001, () => console.log('Server running on port 3001')); 