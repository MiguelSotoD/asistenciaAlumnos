// ROUTER DE SESSION (Login, logout, Register)-ADRIAN
import { celebrate, Joi, Segments } from "celebrate";
import { Router } from "express";
import { validationSession } from "../validations/sessionValidator";
import { ingresarProfesor, logoutProfesorController, nuevoProfesor, recuperarContrasenaController } from "../controller/sessionController";
import { verificarToken } from "../middleware/authMiddleware";

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Session
 *     description: Rutas para registrar, iniciar sesión y cerrar sesión.
 */

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Registra a un nuevo profesor
 *     description: Crea un nuevo usuario de tipo profesor en el sistema.
 *     tags: [Session]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Profesor'
 *     responses:
 *       201:
 *         description: Profesor creado con éxito
 *       400:
 *         description: Error en la validación de los datos
 *       500:
 *         description: Error interno del servidor
 */
router.post(
  "/register",
  celebrate({
    [Segments.BODY]: Joi.object({
      nombre: Joi.string()
        .min(3)
        .max(250)
        .required()
        .messages(validationSession.nombre),
      apellido_paterno: Joi.string()
        .min(3)
        .max(250)
        .required()
        .messages(validationSession.nombre),
      apellido_materno: Joi.string()
        .min(3)
        .max(250)
        .required()
        .messages(validationSession.nombre),
      email: Joi.string()
        .min(3)
        .max(250)
        .email()
        .messages(validationSession.email),
      password: Joi.string().required().messages(validationSession.password),
    }),
  }),
  nuevoProfesor
);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Inicia sesión como profesor
 *     description: Autentica a un profesor con el correo electrónico y la contraseña.
 *     tags: [Session]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Correo electrónico del profesor
 *               password:
 *                 type: string
 *                 description: Contraseña del profesor
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de éxito
 *                 profesor:
 *                   $ref: '#/components/schemas/Profesor'
 *       401:
 *         description: Correo o contraseña incorrectos
 *       400:
 *         description: Error en la validación de los datos
 *       500:
 *         description: Error interno del servidor
 */
router.post(
  "/login",
  celebrate({
    [Segments.BODY]: Joi.object({
      email: Joi.string()
        .min(3)
        .max(250)
        .email()
        .messages(validationSession.email),
      password: Joi.string().required().messages(validationSession.password),
    }),
  }),
  ingresarProfesor
);

/**
 * @swagger
 * /logout:
 *   post:
 *     summary: Cierra sesión de un profesor
 *     description: Finaliza la sesión activa del profesor.
 *     tags: [Session]
 *     responses:
 *       200:
 *         description: Cierre de sesión exitoso
 *       500:
 *         description: Error interno del servidor
 */
router.post("/logout", logoutProfesorController);

router.get("/perfil", verificarToken, (req, res) => {
  res.status(200).json({ message: "Acceso concedido", usuario: (req as any).user });
});

router.post("/recuperarContrasena", recuperarContrasenaController);

module.exports = router;

export default router;
