import nodemailer from 'nodemailer'


var transport = nodemailer.createTransport({
  host: process.env.MAILTRAP_HOST,
  port: Number(process.env.MAILTRAP_PORT),
    secure: true,
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASS,
  }
});

import express from 'express';
const router = express.Router();

router.post('/msg', async (req, res) => {
  const { name, email, message } = req.body;

  try {
    await transport.sendMail({
      from: `"${name}" <${email}>`,
      to: 'acrubaugh11@gmail.com', // change this to your own email
      subject: 'Geas Art Email',
      text: message,
    });

    res.status(200).json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send message' });
  }
});

export default router;
