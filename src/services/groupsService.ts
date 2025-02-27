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


  const obtenerGrupos = async (): Promise<Grupo[]> => {
    try {
      // Obtener todos los grupos de la base de datos
      const result = await conexionDB.query(
        `SELECT * FROM grupos`
      );
      logger.info(`Grupos Obtenido: ${result.rows[0].nombre}`);
      return result.rows;
    } catch (error) {
      logger.error(`Error al obtener los Grupos: ${error}`);
      throw new Error("Error al obtener los Grupos.");
  }
  };


  // Exportar funciones del servicio para actualizar Grupo
  const actualizarGrupo = async (grupoData: Grupo, idNumber: number): Promise<Grupo> => {
    const {nombre,carrera,id_materia} = grupoData;
    try {
      // Actualizar Grupo en la base de datos
      const result = await conexionDB.query(
        `UPDATE grupos SET nombre_grupo = $1, materia_id = $2, carrera = $3 WHERE id_grupo = $4 RETURNING *`,
        [nombre, id_materia, carrera, idNumber]
      );
      logger.info(`Grupo actualizado: ${result.rows[0].nombre}`);
      return result.rows[0];
    } catch (error) {
      logger.error(`Error al actualizar el Grupo: ${error}`);
      throw new Error("Error al actualizar el Grupo.");
    }

  }

  const verGrupoById = async (id: number): Promise<boolean> => {
    try {
      // Obtener Grupo por Id
      const result = await conexionDB.query(
        `SELECT * FROM grupos WHERE id_grupo = $1`,
        [id]
      );
      return result.rows.length > 0;
    } catch (error) {
      logger.error(`Error al verificar el Grupo: ${error}`);
      throw new Error("Error al verificar el Grupo.");
    }
  }
  export { crearGrupo, obtenerGrupos, actualizarGrupo, verGrupoById };