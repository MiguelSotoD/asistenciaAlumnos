import {conexionDB} from "../config/configBD";
import logger from "../utils/logger";
import { Clase } from "../models/interface/claseInterface";

const crearClase = async (claseData: Clase): Promise<void> => {
  const {grupo_id, fecha} = claseData;
  try {
  // Insertar nueva registro de alumno en la base de datos
  const result = await conexionDB.query(
    `INSERT INTO sesiones (
      grupo_id, fecha
    ) VALUES (
      $1,$2
    ) RETURNING *`,
    [grupo_id, fecha]
  );
  logger.info(`Alumno Registrado: ${result.rows[0].nombre}`);
  return result.rows[0]; 
    } catch (error) {
      logger.error(`Error Registrando Alumno: ${error}`);
      throw new Error("Error al crear la Alumno.");
    }
  };

  export {crearClase}