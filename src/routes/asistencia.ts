import { Router } from "express";
import { asignarAsistencias } from "../controller/asistenciaController";
import { celebrate, Joi, Segments } from "celebrate";

const router = Router();

/**
 *@swagger
 * /asistencia/nueva:
 *   post:
 *     summary: Registra la asistencia de múltiples alumnos en una sesión
 *     tags: [Asistencias]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               grupo_id:
 *                 type: integer
 *                 description: El ID del grupo al que pertenecen los alumnos.
 *                 example: 1
 *               asistencias:
 *                 type: array
 *                 description: Lista de las asistencias de los alumnos.
 *                 items:
 *                   type: object
 *                   properties:
 *                     alumno_id:
 *                       type: integer
 *                       description: El ID del alumno.
 *                       example: 1
 *                     sesion_id:
 *                       type: integer
 *                       description: El ID de la sesión.
 *                       example: 10
 *                     asistencia:
 *                       type: boolean
 *                       description: Estado de la asistencia del alumno (true para presente, false para ausente).
 *                       example: true
 *     responses:
 *       200:
 *         description: Asistencias registradas correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Asistencias registradas correctamente."
 *       400:
 *         description: Error en los datos enviados, los parámetros proporcionados son incorrectos.
 *       500:
 *         description: Error interno del servidor, no se pudo procesar la solicitud.
*/
router.post(
  "/nueva",
  celebrate({
    [Segments.BODY]: Joi.object({
      asistencias: Joi.array()
        .items(
          Joi.object({
            alumno_id: Joi.number().integer().required(),
            sesion_id: Joi.number().integer().required(),
            asistencia: Joi.boolean().required(),
          })
        )
        .min(1)
        .required(),
    }),
  }),
 asignarAsistencias
);

export default router;
