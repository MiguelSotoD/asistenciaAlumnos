import { Request, Response } from "express";
import logger from "../utils/logger";
import { crearClase } from "../services/claseService";

export const nuevaClase = async (req: Request, res: Response): Promise<void> => {
    try {
        const claseData = req.body;
        const claseNueva = await crearClase(claseData);
    
      //Enviar respuesta exitosa (201) con los datos de la Clase
         res.status(201).json({
          message: "Clase Creada exitosamente",
          clase: claseNueva
        });
      } catch (err) {
      // Mensaje de error al crear clase
        logger.error('Error al crear un nueva clase: ', err.message); 
          res.status(500).json({
          error: "Error interno al procesar la solicitud. Intenta nuevamente más tarde.",
        });
      }
}