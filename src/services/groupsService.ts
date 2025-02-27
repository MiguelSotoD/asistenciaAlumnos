import { Grupo } from "../models/interface/grupoInterface";
import {conexionDB} from "../config/configBD";
import logger from "../utils/logger";

const crearGrupo = async (grupoData: Grupo): Promise<void> => {
  const {nombre,carrera,id_materia} = grupoData;
  try {
  // Insertar nuevo Grupo en la base de datos
  const result = await conexionDB.query(
    `INSERT INTO grupos (
      nombre_grupo, materia_id, carrera
    ) VALUES (
      $1,$2,$3
    ) RETURNING *`,
    [nombre, id_materia, carrera]
  );
  logger.info(`Grupo creado: ${result.rows[0].nombre}`);
  return result.rows[0]; 
    } catch (error) {
      logger.error(`Error creando Grupo: ${error}`);
      throw new Error("Error al crear el Grupo.");
    }
  };

  export { crearGrupo };