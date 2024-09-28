import nodemailer from 'nodemailer'

export const sendMail = async (token: number, emailTo: string) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    host: process.env.NODEMAILER_HOST,
    port: 465,
    secure: true,
    auth: {
      user: process.env.NODEMAILER_USER_EMAIL,
      pass: process.env.NODEMAILER_PASSWORD,
    },
  })

  const mailOptions = {
    from: process.env.NODEMAILER_USER_EMAIL,
    to: emailTo,
    subject: 'Código de verificación',
    text: 'Su código de verificación es: ' + token + '\n\nEste código va a expirar dentro de 10 minutos.',
  }

  return await transporter.sendMail(mailOptions)
}
