import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

transporter.verify((error, success) => {
    if (error) {
      console.log("Error al conectar:", error);
    } else {
      console.log("¡Conexión exitosa!");
    }
  });

export const enviarEmailRecuperacion = async (email: string, link: string) => {
  const mailOptions = {
    from: `"Soporte" <${process.env.SMTP_USER}>`,
    to: email,
    subject: "Recuperación de Contraseña",
    html: `
      <h2>Solicitud de Recuperación de Contraseña</h2>
      <p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p>
      <a href="${link}" target="_blank">Restablecer Contraseña</a>
      <p>Este enlace expirará en 1 hora.</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};
