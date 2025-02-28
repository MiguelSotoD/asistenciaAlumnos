// Rutas para grupos
import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import { validationClase } from '../validations/claseValidator';
import { nuevaClase } from '../controller/clasesController';
const router = Router();

/**
 * @swagger
 * /sesion/nueva:
 *   post:
 *     summary: Agregar una nueva clase al grupo.
 *     description: Permite agregar una nueva clase al grupo
 *     tags:
 *       - Clase
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               grupo_id:
 *                 type: integer
 *                 description: Id del grupo que se asignara la clase.
 *                 example: 1
 *               fecha:
 *                 type: date
 *                 description: Fecha de la nueva clase
 *                 example: "2025-01-01"
 *     responses:
 *       200:
 *         description: Nueva clase Iniciada.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Clase nueva correctamente"
 *       400:
 *         description: Error en la validación de datos.
 *       500:
 *         description: Error interno del servidor.
 */
router.post(
    "/nueva",
    celebrate({
      [Segments.BODY]: Joi.object({
        grupo_id: Joi.number().integer().required().messages(validationClase.grupo_id),
        fecha: Joi.date().required().messages(validationClase.fecha),
      }),
    }),
    nuevaClase
  );


  module.exports = router;

  export default router;