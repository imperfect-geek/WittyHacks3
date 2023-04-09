const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_MAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

const contact = async (req, res, next) => {
  try {
    if (
      req.body.name &&
      req.body.address &&
      req.body.description &&
      req.body.contact &&
      req.body.email
    ) {
      const buyer = req.body;
      const mailOptions = {
        from: process.env.SMTP_MAIL, // sender address
        to: "divyanshugour197@gmail.com", // list of receivers
        subject: `Waste Collection Request`, // Subject line
        html: `<p>
                <strong> Contact Details </strong><br>
                Name: ${buyer.name} <br>
                Contact: ${buyer.contact} <br>
                Email: ${buyer.email} <br>
                Address: ${buyer.address} <br>
                Description: ${buyer.description}
                Regards: <strong>Team VoidTrash</strong>
            </p>`, // plain text body
      };
      await transporter.sendMail(mailOptions);
      res.status(200).send({
        code: 200,
        status: "success",
        message: "Mail sent successfully",
      });
    } else throw new Error("Incomplete Details");
  } catch (error) {
    res.status(400).send({
      code: 400,
      status: "fail",
      message: error.message,
    });
  }
  next();
};

module.exports = contact;
