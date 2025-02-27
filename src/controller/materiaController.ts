import { Request, Response } from "express";
import { crearMateria, obtenerMaterias, verificarMateriaById, actualizarMateria } from "../services/materiaService";
import logger from "../utils/logger";

export const nuevaMateria = async (req: Request, res: Response): Promise<void> => {
    try {
        const materiaData = req.body;
        const materiaNueva = await crearMateria(materiaData);
    
      //Enviar respuesta exitosa (201) con los datos del Materia creado
         res.status(201).json({
          message: "Materia Creada exitosamente",
          materia: materiaNueva
        });
      } catch (err) {
      // Mensaje de error al crear materia
        logger.error('Error al crear un nueva materia: ', err.message); 
          res.status(500).json({
          error: "Error interno al procesar la solicitud. Intenta nuevamente más tarde.",
        });
      }
}


  // Controller para obtener todos las Materias
  export const todasMaterias = async (req: Request, res: Response): Promise<void> => {
    try {
      const materias = await obtenerMaterias();
      res.status(200).json(materias);
    } catch (err) {
      logger.error('Error al obtener las Materias: ', err.message);
      res.status(500).json({
        error: "Error interno al procesar la solicitud. Intenta nuevamente más tarde.",
      });
    }
  }


   // Controller para editar un materia
   export const editarMateria = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const materiaData = req.body;
  
    // Convertir 'id' de string a number
    const idNumber = parseInt(id, 10);

    if (isNaN(idNumber)) {
      res.status(400).json({ error: "El ID proporcionado no es válido" });
      return;
    }

    try {
      // Verificar si la materia existe antes de intentar editarlo
      const materiaExistente = await verificarMateriaById(idNumber);
      if (!materiaExistente) {
        res.status(404).json({ error: "Materia no encontrada" });
        return;
      }
  
      // Llamar a la función de actualización
      const MateriaEditado = await actualizarMateria(materiaData, idNumber);
  
      if (!MateriaEditado) {
        res.status(400).json({ error: "No se pudo editar el materia. Verifica los datos." });
        return;
      }
  
      // Respuesta exitosa
      res.status(200).json({
        message: "Materia editada con éxito",
        materia: MateriaEditado,
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