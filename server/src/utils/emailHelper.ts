import nodemailer from 'nodemailer';

const mailHelper = async (data: any) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.mailtrap.io',
        port: 2525,
        auth: {
            user: '4589a12dc92422',
            pass: 'f60440087d7dad',
        },
    });

    const message = {
        from: 'lokesh@dev.com',
        to: data.email,
        subject: data.subject,
        text: data.message,
    }

    await transporter.sendMail(message);
}


module.exports = mailHelper