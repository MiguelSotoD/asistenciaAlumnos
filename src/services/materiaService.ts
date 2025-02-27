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


  const obtenerMaterias = async (): Promise<Materia[]> => {
    try {
      // Obtener todos las Materias de la base de datos
      const result = await conexionDB.query(
        `SELECT * FROM materias`
      );
      logger.info(`Materias Obtenidas: ${result.rows[0].nombre}`);
      return result.rows;
    } catch (error) {
      logger.error(`Error al obtener las Materias: ${error}`);
      throw new Error("Error al obtener ls Materias.");
  }
  };


  // Exportar funciones del servicio para actualizar Materia
  const actualizarMateria = async (MateriaData: Materia, idNumber: number): Promise<Materia> => {
    const {nombre,id_profesor,horas} = MateriaData;
    try {
      // Actualizar Materia en la base de datos
      const result = await conexionDB.query(
        `UPDATE materias SET nombre_materia = $1, horas_clase = $2, profesor_id = $3 WHERE id_materias = $4 RETURNING *`,
        [nombre, horas, id_profesor, idNumber]
      );
      logger.info(`Materia actualizado: ${result.rows[0].nombre}`);
      return result.rows[0];
    } catch (error) {
      logger.error(`Error al actualizar el Materia: ${error}`);
      throw new Error("Error al actualizar la Materia.");
    }

  }

  const verificarMateriaById = async (id: number): Promise<boolean> => {
    try {
      // Obtener Materia por Id
      const result = await conexionDB.query(
        `SELECT * FROM materias WHERE id_materias = $1`,
        [id]
      );
      return result.rows.length > 0;
    } catch (error) {
      logger.error(`Error al verificar la Materia: ${error}`);
      throw new Error("Error al verificar la Materia.");
    }
  }
  export { crearMateria, obtenerMaterias, actualizarMateria, verificarMateriaById };