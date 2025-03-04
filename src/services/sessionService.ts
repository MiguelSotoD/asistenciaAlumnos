import { conexionDB } from "../config/configBD";
import { Profesor } from "../models/interface/sessionInterface";
import logger from "../utils/logger";
import jwt from "jsonwebtoken";
import { enviarEmailRecuperacion } from "./emailService";

const crearProfesor = async (profesorData: Profesor): Promise<void> => {
  const { nombre, apellido_paterno, apellido_materno, email, password } =
    profesorData;
  try {
    const result = await conexionDB.query(
      `INSERT INTO profesores (
        nombre, apellido_paterno, apellido_materno, email, password
      ) VALUES (
        $1,$2,$3, $4, $5
      ) RETURNING *`,
      [nombre, apellido_paterno, apellido_materno, email, password]
    );
    logger.info(`Profesor creado: ${result.rows[0].nombre}`);
    return result.rows[0];
  } catch (error) {
    logger.error(`Error creando el profesor: ${error}`);
    throw new Error("Error al crear el profesor.");
  }
};

const loginProfesor = async (
  email: string,
  password: string
): Promise<Profesor | null> => {
  try {
    const result = await conexionDB.query(
      `SELECT * FROM profesores WHERE Email = $1`,
      [email]
    );

    if (result.rows.length === 0) {
      return null;
    }

    const profesor = result.rows[0];

    if (password !== profesor.password) {
      return null;
    }

    return profesor;
  } catch (error) {
    logger.error(`Error en el login: ${error.message}`);
    throw new Error("Error al iniciar sesión.");
  }
};

const recuperarContrasena = async (email: string) => {
  try {
    const result = await conexionDB.query(
      `SELECT * FROM profesores WHERE Email = $1`,
      [email]
    );

    if (result.rows.length > 0) {
      const user = result.rows[0];

      // Generar un token de recuperación con expiración de 1 hora
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, {
        expiresIn: "1h",
      });

      // Crear el enlace para restablecer la contraseña
      const link = `${process.env.FRONTEND_URL}/restablecer-contrasena/${token}`;

      // Enviar el correo electrónico con el enlace
      await enviarEmailRecuperacion(email, link);

      return user;
    } else {
      return null;
    }
  } catch (error: any) {
    logger.error(`No se encontró el email: ${error.message}`);
    throw new Error("Error al consultar el correo electrónico.");
  }
};
export { crearProfesor, loginProfesor, recuperarContrasena };
