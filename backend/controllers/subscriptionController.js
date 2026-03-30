import subscriptionModel from "../models/subscriptionModel.js";
import nodemailer from "nodemailer";

const subscribe = async (req, res) => {
  try {
    const { email } = req.body;

    const exists = await subscriptionModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "Email already subscribed" });
    }

    const newSubscription = new subscriptionModel({ email });
    await newSubscription.save();

    const transporter = nodemailer.createTransporter({
      service: "gmail",
      auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: email,
      to: process.env.ADMIN_EMAIL,
      subject: "New Newsletter Subscription - RAQS",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">New Newsletter Subscription</h2>
          <p style="color: #666;">You have a new subscriber to your newsletter:</p>
          <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p style="margin: 5px 0;"><strong>Email:</strong> ${email}</p>
            <p style="margin: 5px 0;"><strong>Date:</strong> ${new Date().toLocaleString()}</p>
          </div>
          <p style="color: #666;">This subscriber will receive updates about new products, offers, and restocks.</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.json({ success: true, message: "Subscribed successfully! Thank you for joining us." });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const getAllSubscribers = async (req, res) => {
  try {
    const subscribers = await subscriptionModel.find({});
    res.json({ success: true, subscribers });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { subscribe, getAllSubscribers };
