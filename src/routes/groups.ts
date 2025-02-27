// Rutas para grupos
import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import { validationGroup } from '../validations/groupsValidator';
import { nuevoGrupo, todosGrupos } from '../controller/groupsController';

const router = Router();
// Definir rutas Para Grupo
/**
/**
 * @route POST /api/grupo/nuevo
 * @desc Registrar un nuevo Grupo
 * @access private
 * @param {string} nombre - Nombre del Grupo
 * @param {string} descripcion - Descripcion del Grupo
 * @param {string} materia - Id de la Materia asignada al Grupo
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
 * @route GET /api/grupo/
 * @desc Obtener todos los grupos disponibles
 * @access private
 */
router.get("/", todosGrupos);


module.exports = router;

export default router;