import { Request, Response } from "express";
import { crearMateria } from "../services/materiaService";
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