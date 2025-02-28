import { Request, Response } from "express";
import logger from "../utils/logger";
import { crearProfesor, loginProfesor } from "../services/sessionService";

// Crear un nuevo profesor
export const nuevoProfesor = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const profesorData = req.body;
    const profesorNuevo = await crearProfesor(profesorData);

    res.status(201).json({
      message: "Profesor creado exitosamente",
      profesor: profesorNuevo,
    });
  } catch (err) {
    logger.error("Error al crear el usuario: ", err.message);
    res.status(500).json({
      error:
        "Error interno al procesar la solicitud. Intenta nuevamente más tarde.",
    });
  }
};

export const ingresarProfesor = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ error: "Email y contraseña son requeridos" });
      return;
    }

    // Llamamos a la función para obtener el profesor
    const profesor = await loginProfesor(email, password);

    if (!profesor) {
      res.status(401).json({ error: "Correo o contraseña incorrectos" });
      return;
    }

    res.status(200).json({
      message: "Inicio de sesión exitoso",
      profesor,
    });
  } catch (err) {
    logger.error("Error en el login: ", err.message);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

export const logoutProfesorController = (req: Request, res: Response): void => {
  try {
    res.status(200).json({ message: "Sesión cerrada correctamente." });
  } catch (error) {
    res.status(500).json({ error: "Error al cerrar sesión." });
  }
};
