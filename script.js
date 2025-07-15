// server.js
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public'))); // host checkout.html in public/

app.post('/place-order', async (req, res) => {
  try {
    const { product, email, phone, address, payment, upi } = req.body;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASS
      }
    });

    const mailOptions = {
      from: process.env.SMTP_EMAIL,
      to: email,
      subject: 'Order Confirmation from Bihar Bites',
      html: `
        <h2>Thank you for your order 🎉</h2>
        <p><strong>Product:</strong> ${product}</p>
        <p><strong>Payment Method:</strong> ${payment}${payment === 'UPI' ? ` (UPI ID: ${upi})` : ''}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Delivery Address:</strong><br/>${address}</p>
        <p>We’ll start preparing your order soon. Have a great day!</p>
      `
    };

    await transporter.sendMail(mailOptions);
    res.json({ success: true });
  } catch (err) {
    console.error('Error sending email:', err);
    res.json({ success: false, error: err.message });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port ${port}`));
