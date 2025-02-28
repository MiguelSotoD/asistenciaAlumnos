import { conexionDB } from "../config/configBD";
import { Profesor } from "../models/interface/sessionInterface";
import logger from "../utils/logger";

const crearProfesor = async (profesorData: Profesor): Promise<void> => {
  const { nombre, apellido_paterno, apellido_materno, email, password } =
    profesorData;
  try {
    // Insertar nuevo Grupo en la base de datos
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
    // Buscar al profesor por email
    const result = await conexionDB.query(
      `SELECT * FROM profesores WHERE Email = $1`,
      [email]
    );

    if (result.rows.length === 0) {
      return null; // No se encontró el profesor
    }

    const profesor = result.rows[0];

    if (password !== profesor.password) {
      return null; // Contraseña incorrecta
    }

    return profesor; // Devuelve el objeto profesor si todo es correcto
  } catch (error) {
    logger.error(`Error en el login: ${error.message}`);
    throw new Error("Error al iniciar sesión.");
  }
};

export { crearProfesor, loginProfesor };
