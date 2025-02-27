// Rutas para grupos
import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import { validationGroup } from '../validations/groupsValidator';
import { nuevoGrupo, todosGrupos } from '../controller/groupsController';

const router = Router();

// ESQUEMA PARA LAS RUTAS DE GRUPOS
// Se define el esquema de los grupos para la documentación de Swagger
/**
 * @swagger
 * components:
 *   schemas:
 *     Grupo:
 *       type: object
 *       required:
 *         - nombre
 *         - id_materia
 *       properties:
 *         id:
 *           type: integer
 *           description: ID del grupo
 *         nombre:
 *           type: string
 *           description: Nombre del Grupo
 *         carrera:
 *           type: string
 *           description: Descripción del Grupo
 *         id_materia:
 *           type: integer
 *           description: ID de la materia asignada al Grupo
 *       example:
 *         nombre: "Grupo A"
 *         carrera: "Tecnologias de la Información"
 *         id_materia: 101
 */

/**
 * @swagger
 * /grupo:
 *   get:
 *     summary: Obtener todos los grupos
 *     description: Devuelve una lista de todos los grupos disponibles.
 *     tags:
 *       - Grupos
 *     responses:
 *       200:
 *         description: Lista de grupos obtenida correctamente
 */
router.get("/", todosGrupos);

/**
 * @swagger
 * /grupo/nuevo:
 *   post:
 *     summary: Crear un nuevo grupo
 *     description: Registra un nuevo grupo en el sistema.
 *     tags:
 *       - Grupos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Grupo'
 *     responses:
 *       201:
 *         description: Grupo creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Grupo creado con éxito"
 *       400:
 *         description: Error en los datos de entrada
 *       500:
 *         description: Error interno del servidor
 */
router.post(
    "/nuevo",
    celebrate({
      [Segments.BODY]: Joi.object({
        nombre: Joi.string().min(3).max(250).required().messages(validationGroup.nombre),
        carrera: Joi.string().min(3).max(250).messages(validationGroup.carrera),
        id_materia: Joi.number().required().messages(validationGroup.materia),
      }),
    }),
    nuevoGrupo
  );



module.exports = router;

export default router;