import { Request, Response } from "express";
import { crearGrupo, obtenerGrupos } from "../services/groupsService";
import logger from "../utils/logger";

// Crear un Nuevo Grupo
export const nuevoGrupo = async (req: Request, res: Response): Promise<void> => {
    try {
      const groupData = req.body;
      const grupoNuevo = await crearGrupo(groupData);
  
    //Enviar respuesta exitosa (201) con los datos del grupo creado
       res.status(201).json({
        message: "Grupo Creado exitosamente",
        grupo: grupoNuevo
      });
    } catch (err) {
    // Mensaje de error al crear un nuevo grupo
      logger.error('Error al crear un nuevo Grupo: ', err.message); 
        res.status(500).json({
        error: "Error interno al procesar la solicitud. Intenta nuevamente más tarde.",
      });
    }
  };


  export const todosGrupos = async (req: Request, res: Response): Promise<void> => {
    try {
      const grupos = await obtenerGrupos();
      res.status(200).json(grupos);
    } catch (err) {
      logger.error('Error al obtener los Grupos: ', err.message);
      res.status(500).json({
        error: "Error interno al procesar la solicitud. Intenta nuevamente más tarde.",
      });
    }
  }