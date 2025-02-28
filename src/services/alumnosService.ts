import {conexionDB} from "../config/configBD";
import logger from "../utils/logger";
import { Alumnos } from "../models/interface/alumnosInterface";

const registrarAlumno = async (alumnoData: Alumnos): Promise<void> => {
  const {nombre, apellido_paterno, apellido_materno} = alumnoData;
  try {
  // Insertar nueva registro de alumno en la base de datos
  const result = await conexionDB.query(
    `INSERT INTO alumnos (
      nombre, apellido_paterno, apellido_materno
    ) VALUES (
      $1,$2,$3
    ) RETURNING *`,
    [nombre, apellido_paterno, apellido_materno,]
  );
  logger.info(`Alumno Registrado: ${result.rows[0].nombre}`);
  return result.rows[0]; 
    } catch (error) {
      logger.error(`Error Registrando Alumno: ${error}`);
      throw new Error("Error al crear la Alumno.");
    }
  };


  const obtenerAlumnos = async (): Promise<Alumnos[]> => {
    try {
      // Obtener todos los Alumnos de la base de datos
      const result = await conexionDB.query(
        `SELECT * FROM alumnos`
      );
      logger.info(`Alumnos Obtenidas: ${result.rows[0].nombre}`);
      return result.rows;
    } catch (error) {
      logger.error(`Error al obtener los Alumnos: ${error}`);
      throw new Error("Error al obtener los Alumnos.");
  }
  };


  // Exportar funciones del servicio para actualizar Alumno
  const actualizarAlumno = async (alumnoData: Alumnos, idNumber: number): Promise<Alumnos> => {
    const {nombre,apellido_paterno,apellido_materno} = alumnoData;
    try {
      // Actualizar Alumnos en la base de datos
      const result = await conexionDB.query(
        `UPDATE alumnos SET nombre = $1, apellido_paterno = $2, apellido_materno = $3 WHERE id_alumno = $4 RETURNING *`,
        [nombre, apellido_paterno, apellido_materno, idNumber]
      );
      logger.info(`Alumno actualizado: ${result.rows[0].nombre}`);
      return result.rows[0];
    } catch (error) {
      logger.error(`Error al actualizar el Alumno: ${error}`);
      throw new Error("Error al actualizar la Alumno.");
    }

  }

  const verificarAlumnoById = async (id: number): Promise<boolean> => {
    try {
      // Obtener Alumno por Id
      const result = await conexionDB.query(
        `SELECT * FROM alumnos WHERE id_alumno = $1`,
        [id]
      );
      return result.rows.length > 0;
    } catch (error) {
      logger.error(`Error al verificar el Alumno: ${error}`);
      throw new Error("Error al verificar el Alumno.");
    }
  }
  export { registrarAlumno, obtenerAlumnos, actualizarAlumno, verificarAlumnoById };