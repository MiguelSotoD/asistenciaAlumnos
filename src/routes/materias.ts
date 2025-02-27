// Rutas para grupos
import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import { validationMateria } from '../validations/materiaValidator';
import { nuevaMateria } from '../controller/materiaController';
const router = Router();


// ESQUEMA PARA LAS RUTAS DE MATERIAS
// Se define el esquema de las materias para la documentación de Swagger
/**
/**
 * @swagger
 * components:
 *   schemas:
 *     Materia:
 *       type: object
 *       required:
 *         - nombre
 *         - horas
 *         - id_profesor
 *       properties:
 *         id:
 *           type: integer
 *           description: ID de la materia
 *         nombre:
 *           type: string
 *           description: Nombre de la materia
 *         horas:
 *           type: integer
 *           description: Horas de la materia
 *         id_profesor:
 *           type: integer
 *           description: ID del profesor asignado a la materia
 *       example:
 *         id: 1
 *         nombre: "Matemáticas"
 *         horas: 50
 *         id_profesor: 101
 */

/**
 * @swagger
 * /materia/nueva:
 *   post:
 *     summary: Crear nueva materia
 *     description: Registra una nueva materia en la base de datos
 *     tags:
 *       - Materias
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Materia'
 *     responses:
 *       201:
 *         description: Materia creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Materia creada con éxito"
 *       400:
 *         description: Error en los datos de entrada
 *       500:
 *         description: Error interno del servidor
 */
router.post(
    "/nueva",
    celebrate({
      [Segments.BODY]: Joi.object({
        nombre: Joi.string().min(3).max(250).required().messages(validationMateria.nombre),
        horas: Joi.number().integer().min(3).max(250).messages(validationMateria.horas),
        id_profesor: Joi.number().integer().required().messages(validationMateria.profesor),
      }),
    }),
    nuevaMateria
  );



module.exports = router;

export default router;
