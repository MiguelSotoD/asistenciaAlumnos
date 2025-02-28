import { Request, Response } from "express";
import { asignarAsistenciaService } from "../services/asistenciaService";
import logger from "../utils/logger";

export const asignarAsistencias = async (req: Request, res: Response) => {
  try {
    const { grupo_id, asistencias } = req.body;

    if (!asistencias || !Array.isArray(asistencias) || asistencias.length === 0) {
      res.status(400).json({ error: "Debe proporcionar al menos una asistencia válida." });
      return;
    }

    await asignarAsistenciaService(grupo_id, asistencias);

    res.status(200).json({ message: "Asistencias registradas correctamente." });
  } catch (error) {
    logger.error(`Error registrando asistencias: ${error}`);
    res.status(500).json({ error: "Error interno del servidor." });
  }
};
