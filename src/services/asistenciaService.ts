import { conexionDB } from "../config/configBD";
import { Asistencia } from "../models/interface/asistenciaInterface";
import logger from "../utils/logger";

// Función para asignar asistencia a múltiples alumnos en una sola transacción
export const asignarAsistenciaService = async (grupo_id: number, asistencias: Asistencia[]) => {
  const client = await conexionDB.connect();
  
  try {
    await client.query("BEGIN"); // Iniciar la transacción

    for (const { alumno_id, sesion_id, asistencia } of asistencias) {
      // Verificar si la asistencia ya existe
      const queryCheck = `SELECT * FROM asistencia WHERE alumno_id = $1 AND sesion_id = $2`;
      const resultCheck = await client.query(queryCheck, [alumno_id, sesion_id]);

      if (resultCheck.rows.length > 0) {
        // Si existe, actualizar
        const queryUpdate = `UPDATE asistencia SET asistencia = $1 WHERE alumno_id = $2 AND sesion_id = $3`;
        await client.query(queryUpdate, [asistencia, alumno_id, sesion_id]);
      } else {
        // Si no existe, insertar nuevo registro
        const queryInsert = `INSERT INTO asistencia (grupo_id, alumno_id, sesion_id, asistencia) VALUES ($1, $2, $3, $4)`;
        await client.query(queryInsert, [grupo_id, alumno_id, sesion_id, asistencia]);
      }
    }

    await client.query("COMMIT"); // Confirmar los cambios en la base de datos
    return { message: "Asistencias registradas correctamente." };

  } catch (error) {
    await client.query("ROLLBACK");
    logger.error("Error al asignar asistencias:", error);
    throw new Error("Error interno al asignar asistencias.");
  } finally {
    client.release();
  }
};

