import { Request, Response } from "express";
import { crearGrupo, obtenerGrupos, actualizarGrupo, verGrupoById, obtenerAlumnosConAsistencias, asignarAlumno } from "../services/groupsService";
import logger from "../utils/logger";

// Crear un Nuevo Grupo
export const nuevoGrupo = async (req: Request, res: Response): Promise<void> => {
    try {
      const groupData = req.body;
      const grupoNuevo = await crearGrupo(groupData);
  
    //Enviar respuesta exitosa (201) con los datos del grupo creado
       res.status(201).json({
        message: "Grupo Creado exitosamente",
        grupo: grupoNuevo
      });
    } catch (err) {
    // Mensaje de error al crear un nuevo grupo
      logger.error('Error al crear un nuevo Grupo: ', err.message); 
        res.status(500).json({
        error: "Error interno al procesar la solicitud. Intenta nuevamente más tarde.",
      });
    }
  };


  // Controller para obtener todos los grupos
  export const todosGrupos = async (req: Request, res: Response): Promise<void> => {
    try {
      const grupos = await obtenerGrupos();
      res.status(200).json(grupos);
    } catch (err) {
      logger.error('Error al obtener los Grupos: ', err.message);
      res.status(500).json({
        error: "Error interno al procesar la solicitud. Intenta nuevamente más tarde.",
      });
    }
  }

  // Controller para editar un grupo
  export const editarGrupo = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const groupData = req.body;
  
    // Convertir 'id' de string a number
    const idNumber = parseInt(id, 10);

    if (isNaN(idNumber)) {
      res.status(400).json({ error: "El ID proporcionado no es válido" });
      return;
    }

    try {
      // Verificar si el grupo existe antes de intentar editarlo
      const grupoExistente = await verGrupoById(idNumber);
      if (!grupoExistente) {
        res.status(404).json({ error: "Grupo no encontrado" });
        return;
      }
  
      // Llamar a la función de actualización
      const grupoEditado = await actualizarGrupo(groupData, idNumber);
  
      if (!grupoEditado) {
        res.status(400).json({ error: "No se pudo editar el grupo. Verifica los datos." });
        return;
      }
  
      // Respuesta exitosa
      res.status(200).json({
        message: "Grupo editado con éxito",
        grupo: grupoEditado,
      });
    } catch (err: any) {
      logger.error(`Error al editar el Grupo con ID ${idNumber}: ${err.message}`, {
        stack: err.stack,
        groupId: id,
      });
  
      // Respuesta para error de servidor
      res.status(500).json({
        error: "Error interno al procesar la solicitud. Intenta nuevamente más tarde.",
      });
    }
  };



  export const todasAsistenciasAlumno = async (req, res) => {
    try {
      const { id } = req.params;
      const idNumber = parseInt(id, 10);
  
      if (isNaN(idNumber)) {
        return res.status(400).json({ error: "El ID proporcionado no es válido" });
      }
  
      const rows = await obtenerAlumnosConAsistencias(idNumber);
  
      if (!rows.length) {
        return res.status(404).json({ message: "No se encontraron alumnos en este grupo." });
      }
  
      // Agrupar datos por alumno
      const alumnosMap = new Map();
  
      rows.forEach(row => {
        if (!alumnosMap.has(row.id_alumno)) {
          alumnosMap.set(row.id_alumno, {
            id_alumno: row.id_alumno,
            nombre: `${row.nombre} ${row.apellido_paterno} ${row.apellido_materno || ""}`.trim(),
            sesiones: []
          });
        }
  
        alumnosMap.get(row.id_alumno).sesiones.push({
          id_sesion: row.id_sesion,
          fecha: row.fecha_sesion,
          asistio: row.asistio
        });
      });
  
      const alumnosConAsistencias = Array.from(alumnosMap.values());
  
      res.status(200).json(alumnosConAsistencias);
    } catch (error) {
      logger.error("Error obteniendo alumnos y asistencias:", error);
      res.status(500).json({ message: "Error interno del servidor." });
    }
  };


  export const nuevoAlumnoEnGrupo = async (req, res)=>{
    const alumnoData = req.body

    try {
      // Verificar si el grupo existe antes de intentar editarlo
      const grupoExistente = await verGrupoById(alumnoData.grupo_id);
      if (!grupoExistente) {
        res.status(404).json({ error: "Grupo no encontrado" });
        return;
      } 

      const AlumnoAsignado = await asignarAlumno(alumnoData);
  
    //Enviar respuesta exitosa (201) con los datos del grupo creado
       res.status(201).json({
        message: "Grupo Creado exitosamente",
        grupo: AlumnoAsignado
      });

    }catch(error){
      logger.error(error)
      }

  }