import nodemailer from 'nodemailer';

const sendEmail = async (to, subject, text) => {
    console.log("📨 Preparing to send email...");

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const info = await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to,
        subject,
        text,
    });

    console.log("✅ Email sent:", info.messageId);
    return info;
};

export default sendEmail;
