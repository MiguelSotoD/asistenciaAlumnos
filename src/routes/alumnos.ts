// Rutas para grupos
import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import { validationAlumno } from '../validations/alumnoValidator';
import { nuevoAlumno, todosAlumnos, editarAlumno } from '../controller/alumnosController';
const router = Router();


// ESQUEMA PARA LAS RUTAS DE Alumnos
// Se define el esquema de las Alumnos para la documentación de Swagger
/**
/**
 * @swagger
 * components:
 *   schemas:
 *     Alumnos:
 *       type: object
 *       required:
 *         - nombre
 *         - apellido Paterno
 *         - apellido Materno
 *       properties:
 *         nombre:
 *           type: string
 *           description: Nombre de los Alumnos
 *         apellid_paterno:
 *           type: integer
 *           description: Apellido Paterno del Alumno
 *         apellid_materno:
 *           type: integer
 *           description: Apellido Materno del ALumno
 *       example:
 *         nombre: "José"
 *         apellido_paterno: "Contreras"
 *         apellido_materno: "Arevalos"
 */

/**
 * @swagger
 * /alumno:
 *   get:
 *     summary: Obtener todos los Alumnos
 *     description: Devuelve una lista de todos los Alumnos disponibles.
 *     tags:
 *       - Alumnos
 *     responses:
 *       200:
 *         description: Lista de Alumnos obtenida correctamente
 */
router.get("/", todosAlumnos);


/**
 * @swagger
 * /alumno/nuevo:
 *   post:
 *     summary: Registrar nuevo Alumno
 *     description: Registra un nuevo alumno
 *     tags:
 *       - Alumnos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Alumnos'
 *     responses:
 *       201:
 *         description: Alumno registrado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Alumno registrado con éxito"
 *       400:
 *         description: Error en los datos de entrada
 *       500:
 *         description: Error interno del servidor
 */
router.post(
    "/nuevo",
    celebrate({
      [Segments.BODY]: Joi.object({
        nombre: Joi.string().min(3).max(250).required().messages(validationAlumno.nombre),
        apellido_paterno: Joi.string().required().max(250).messages(validationAlumno.apellido_paterno),
        apellido_materno: Joi.string().required().max(250).messages(validationAlumno.apellido_materno),
      }),
    }),
    nuevoAlumno
  );

  
  /**
   * @swagger
   * /alumno/{id}:
   *   put:
   *     summary: Actualiza Datos de un alumno.
   *     description: Permite actualizar el nombre y apellidos del alumno
   *     tags:
   *       - Alumnos
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
   *                 example: "Juan"
   *               apellido_paterno:
   *                 type: string
   *                 description: Apellido Paterno
   *                 example: 'Contreras'
   *               apellido_materno:
   *                 type: string
   *                 description: Apellido Materno
   *                 example: 'Soto'
   *     responses:
   *       200:
   *         description: Alumno actualizado exitosamente.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: "Alumno actualizado exitosamente"
   *       400:
   *         description: Error en la validación de datos.
   *       404:
   *         description: Alumno no encontrada.
   *       500:
   *         description: Error interno del servidor.
   */
  router.put(
    "/:id",
    celebrate({
      [Segments.BODY]: Joi.object({
        nombre: Joi.string().min(3).max(250).required().messages(validationAlumno.nombre),
        apellido_paterno: Joi.string().required().max(250).messages(validationAlumno.apellido_paterno),
        apellido_materno: Joi.string().required().max(250).messages(validationAlumno.apellido_materno),
      }),
    }),
    editarAlumno
  );
  


module.exports = router;

export default router;
