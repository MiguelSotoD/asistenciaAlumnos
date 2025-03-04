// Rutas para grupos
import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import { validationGroup } from '../validations/groupsValidator';
import { nuevoGrupo, todosGrupos, editarGrupo, todasAsistenciasAlumno, nuevoAlumnoEnGrupo } from '../controller/groupsController';

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
 * /grupo/{id}:
 *   get:
 *     summary: Obtener todos los alumnos y las asistencias a las sesiones que esten registrados en ese grupo
 *     description: Devuelve una lista de todos lo alumnos  y las asistencias a las sesiones que estan asignados a ese grupo.
 *     parameters:
*       - in: path
*         name: id
*         required: true
*         description: ID del Grupo .
 *     tags:
 *       - Grupos
 *       - Alumnos
 *     responses:
 *       200:
 *         description: Lista de alumnos y asistencias a las sesiones registrados en un grupo
 */
router.get("/:id", todasAsistenciasAlumno);

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


/**
 * @swagger
 * /grupo/{id}:
 *   put:
 *     summary: Actualiza un grupo.
 *     description: Permite actualizar el nombre, la carrera y la materia de un grupo.
 *     tags:
 *       - Grupos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del grupo a actualizar.
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
 *                 description: Nombre del grupo.
 *                 example: "Grupo A"
 *               carrera:
 *                 type: string
 *                 description: Carrera asociada al grupo (opcional).
 *                 example: "Ingeniería en Sistemas"
 *               id_materia:
 *                 type: integer
 *                 description: ID de la materia del grupo.
 *                 example: 101
 *     responses:
 *       200:
 *         description: Grupo actualizado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Grupo actualizado exitosamente"
 *       400:
 *         description: Error en la validación de datos.
 *       404:
 *         description: Grupo no encontrado.
 *       500:
 *         description: Error interno del servidor.
 */
router.put(
  "/:id",
  celebrate({
    [Segments.BODY]: Joi.object({
      nombre: Joi.string().min(3).max(250).required().messages(validationGroup.nombre),
      carrera: Joi.string().min(3).max(250).messages(validationGroup.carrera),
      id_materia: Joi.number().integer().required().messages(validationGroup.materia),
    }),
  }),
  editarGrupo
);


/**
 * @swagger
 * /grupo/agregar-alumno:
 *   post:
 *     summary: Asignar alumno a un grupo
 *     description: Registrar un Alumno a un Grupo existente
 *     tags:
 *       - Grupos
 *       - Alumnos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               grupo_id:
 *                 type: integer
 *                 description: ID del Grupo al que se asignara Alumno
 *                 example: 1
 *               alumno_id:
 *                 type: integer
 *                 description: ID del Alumno que se Asignara al Grupo
 *                 example: 1
 *     responses:
 *       201:
 *         description: Alumno Asignado Correctamten
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Alumno Asignado con éxito"
 *       400:
 *         description: Error en los datos de entrada
 *       500:
 *         description: Error interno del servidor
 */
router.post(
  "/agregar-alumno",
  celebrate({
    [Segments.BODY]: Joi.object({
      grupo_id: Joi.number().integer().required().messages(validationGroup.id),
      alumno_id: Joi.number().integer().required().messages(validationGroup.id),
    }),
  }),
  nuevoAlumnoEnGrupo
);


module.exports = router;

export default router;