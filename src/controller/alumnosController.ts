import { Request, Response } from "express";
import { registrarAlumno, obtenerAlumnos, verificarAlumnoById, actualizarAlumno } from "../services/alumnosService";
import logger from "../utils/logger";

// Controller para registrar un nuevo alumno
export const nuevoAlumno = async (req: Request, res: Response): Promise<void> => {
    try {
        const alumnoData = req.body;
        const alumnoNuevo = await registrarAlumno(alumnoData);
    
      //Enviar respuesta exitosa (201) con los datos del alu,mno registrado
         res.status(201).json({
          message: "Alumno Registrado exitosamente",
          materia: alumnoNuevo
        });
      } catch (err) {
      // Mensaje de error al crear alumno
        logger.error('Error al crear un nuevo alumno: ', err.message); 
          res.status(500).json({
          error: "Error interno al procesar la solicitud. Intenta nuevamente más tarde.",
        });
      }
}


  // Controller para obtener todos los Alumnos
  export const todosAlumnos = async (req: Request, res: Response): Promise<void> => {
    try {
      const alumnos = await obtenerAlumnos();
      res.status(200).json(alumnos);
    } catch (err) {
      logger.error('Error al obtener los alumnos: ', err.message);
      res.status(500).json({
        error: "Error interno al procesar la solicitud. Intenta nuevamente más tarde.",
      });
    }
  }


   // Controller para editar datos de un Alumno
   export const editarAlumno = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const alumnoData = req.body;
  
    // Convertir 'id' de string a number
    const idNumber = parseInt(id, 10);

    if (isNaN(idNumber)) {
      res.status(400).json({ error: "El ID proporcionado no es válido" });
      return;
    }

    try {
      // Verificar si el Alumno existe antes de intentar editarlo
      const alumnoExistente = await verificarAlumnoById(idNumber);
      if (!alumnoExistente) {
        res.status(404).json({ error: "Alumno no encontrada" });
        return;
      }
  
      // Llamar a la función de actualización
      const alumnoEditado = await actualizarAlumno(alumnoData, idNumber);
  
      if (!alumnoEditado) {
        res.status(400).json({ error: "No se pudo editar el alumno. Verifica los datos." });
        return;
      }
  
      // Respuesta exitosa
      res.status(200).json({
        message: "Alumno actualizado con éxito",
        materia: alumnoEditado,
      });
    } catch (err: any) {
      logger.error(`Error al editar la materia con ID ${idNumber}: ${err.message}`, {
        stack: err.stack,
        groupId: id,
      });
  
      // Respuesta para error de servidor
      res.status(500).json({
        error: "Error interno al procesar la solicitud. Intenta nuevamente más tarde.",
      });
    }
  };