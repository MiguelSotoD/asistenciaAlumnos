import { Materia } from "../models/interface/materiaInterface";
import {conexionDB} from "../config/configBD";
import logger from "../utils/logger";

const crearMateria = async (materiaData: Materia): Promise<void> => {
  const {nombre,horas , id_profesor} = materiaData;
  try {
  // Insertar nueva Materia en la base de datos
  const result = await conexionDB.query(
    `INSERT INTO materias (
      nombre_materia, horas_clase, profesor_id
    ) VALUES (
      $1,$2,$3
    ) RETURNING *`,
    [nombre, horas, id_profesor,]
  );
  logger.info(`Materia creada: ${result.rows[0].nombre}`);
  return result.rows[0]; 
    } catch (error) {
      logger.error(`Error creando Materia: ${error}`);
      throw new Error("Error al crear la Materia.");
    }
  };

  export { crearMateria };