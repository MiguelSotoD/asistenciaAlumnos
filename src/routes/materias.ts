// Rutas para grupos
import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import { validationMateria } from '../validations/materiaValidator';
import { nuevaMateria, todasMaterias, editarMateria } from '../controller/materiaController';
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
 * /materia:
 *   get:
 *     summary: Obtener todas las materias
 *     description: Devuelve una lista de todos las materias disponibles.
 *     tags:
 *       - Materias
 *     responses:
 *       200:
 *         description: Lista de materias obtenida correctamente
 */
router.get("/", todasMaterias);


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

  
  /**
   * @swagger
   * /materia/{id}:
   *   put:
   *     summary: Actualiza una materia.
   *     description: Permite actualizar el nombre, horas, profesor de la materia
   *     tags:
   *       - Materias
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: ID de la materia a actualizar.
   *         schema:
   *           type: integer
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               nombre:
   *                 type: string
   *                 description: Nombre de la materia.
   *                 example: "Ciencias"
   *               horas:
   *                 type: integer
   *                 description: Horas de clases en la materi.
   *                 example: 40
   *               id_profesor:
   *                 type: integer
   *                 description: ID de la materia del grupo.
   *                 example: 101
   *     responses:
   *       200:
   *         description: Materia actualizada exitosamente.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: "Materia actualizado exitosamente"
   *       400:
   *         description: Error en la validación de datos.
   *       404:
   *         description: Materia no encontrada.
   *       500:
   *         description: Error interno del servidor.
   */
  router.put(
    "/:id",
    celebrate({
      [Segments.BODY]: Joi.object({
        nombre: Joi.string().min(3).max(250).required().messages(validationMateria.nombre),
        horas: Joi.number().integer().min(3).max(250).messages(validationMateria.horas),
        id_profesor: Joi.number().integer().required().messages(validationMateria.profesor),
      }),
    }),
    editarMateria
  );
  


module.exports = router;

export default router;
