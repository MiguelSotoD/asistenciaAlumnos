import { Request, Response } from "express";
import logger from "../utils/logger";
import jwt from "jsonwebtoken";
import { crearProfesor, loginProfesor } from "../services/sessionService";

const JWT_SECRET = process.env.JWT_SECRET || "clave_secreta";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1h";

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

// Iniciar sesión y guardar token en cookies
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

    const profesor = await loginProfesor(email, password);

    if (!profesor) {
      res.status(401).json({ error: "Correo o contraseña incorrectos" });
      return;
    }

    const token = jwt.sign(
      { id: profesor.id, email: profesor.email },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    // Guardar el token en las cookies
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 1000, // 1 hora
    });

    res.status(200).json({
      message: "Inicio de sesión exitoso",
      profesor,
    });
  } catch (err) {
    logger.error("Error en el login: ", err.message);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

// Cerrar sesión eliminando la cookie
export const logoutProfesorController = (req: Request, res: Response): void => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "Sesión cerrada correctamente." });
  } catch (error) {
    res.status(500).json({ error: "Error al cerrar sesión." });
  }
};
