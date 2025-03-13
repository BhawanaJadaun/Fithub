import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const sendEmail = async (options) => {
  try {
    // Set OTP expiration time (5 minutes from now)
    const otpExpiration = new Date(Date.now() + 5 * 60 * 1000); // 5 min
    const formattedTime = otpExpiration.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });

    // Create transporter with SMTP settings
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465, // Use 587 if 465 doesn't work
      secure: true,
      auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS, // App Password (not Gmail password)
      },
    });

    // Mail options
    const mailOptions = {
      from: `"WEBDEV WARRIORS" <${process.env.EMAIL_USER}>`,
      to: options.email,
      subject: options.subject,
      html: `
        <p>${options.html}</p>
        <p><strong>⚠️ Note:</strong> This OTP is valid until <b>${formattedTime}</b>. After that, you will need to request a new one.</p>
      `,
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log("📧 Email sent successfully!", info.messageId);

    return { info, otpExpiration };
  } catch (error) {
    console.error("❌ Error sending email:", error.message);
    throw new Error("Failed to send email");
  }
};

export default sendEmail;

// import nodemailer from "nodemailer";
// import dotenv from "dotenv";

// dotenv.config(); // Ensure environment variables are loaded

// const sendEmail = async (options) => {
//   try {
//     // Create transporter with correct SMTP settings
//     const transporter = nodemailer.createTransport({
//       host: "smtp.gmail.com",
//       port: 465, // Use 587 if 465 doesn't work
//       secure: true, // True for 465, false for 587
//       auth: {
//         user: process.env.EMAIL_USER, 
//         pass: process.env.EMAIL_PASS, // Your App Password (not Gmail password)
//       },
//     });

//     // Verify SMTP connection
//     transporter.verify((error, success) => {
//       if (error) {
//         console.error("❌ SMTP Connection Error:", error);
//       } else {
//         console.log("✅ SMTP server is ready to send emails");
//       }
//     });

//     // Mail options
//     const mailOptions = {
//       from: `"WEBDEV WARRIORS" <${process.env.EMAIL_USER}>`, // Sender email
//       to: options.email, // Recipient email
//       subject: options.subject,
//       html: options.html, // HTML content
//     };

//     // Send email
//     const info = await transporter.sendMail(mailOptions);
//     console.log("📧 Email sent successfully!", info.messageId);

//     return info;
//   } catch (error) {
//     console.error("❌ Error sending email:", error.message);
//     throw new Error("Failed to send email");
//   }
// };

// export default sendEmail;
