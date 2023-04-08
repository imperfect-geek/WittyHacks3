const nodemailer = require("nodemailer");
const User = require("../models/user");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "johncookbrowse@gmail.com",
    pass: "kkoixcqyopunyuzc",
  },
});

const contact = async (req, res, next) => {
  try {
    if (req.body.sellerId && req.body.title) {
      const seller = await User.findById(req.body.sellerId, "email -_id");
      const buyer = await User.findById(
        req.userId,
        "name contact address email -_id"
      );
      const mailOptions = {
        from: "johncookbrowse@gmail.com", // sender address
        to: seller.email, // list of receivers
        subject: `Someone showed interest in ${req.body.title}`, // Subject line
        html: `<p>
                <strong> Contact Details </strong><br>
                Name: ${buyer.name} <br>
                Contact: ${buyer.contact} <br>
                Email: ${buyer.email} <br>
                Address: ${buyer.address.addressLine}, ${buyer.address.locality} <br>
                City: ${buyer.address.city}, ${buyer.address.state} <br>
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
