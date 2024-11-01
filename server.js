const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors'); // jeden import cors

const app = express();
const PORT = 5002;

app.use(cors()); // použitie cors len raz
app.use(express.json());

// Nastavenie Nodemailer transportera
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'tkutik72@gmail.com', // váš e-mail
    pass: 'lthc hqik nhnw cgum' // heslo aplikácie vygenerované cez Gmail
  }
});


app.post('/send-email', (req, res) => {
  const { name, email, message } = req.body;

  const mailOptions = {
    from: email,
    to: 'tkutik72@gmail.com', // cieľový e-mail
    subject: 'Správa z kontaktného formulára',
    text: `Meno: ${name}\nE-mail: ${email}\n\nSpráva:\n${message}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return res.status(500).send('Error sending email');
    }
    res.status(200).send('Email successfully sent!');
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
