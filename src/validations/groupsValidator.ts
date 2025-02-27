// Guardar errores de validacion de celebrate en un json
export const validationGroup = {
    nombre: {
      'number.base': '"nombre" debe ser un número',
      'number.empty': '"nombre" no puede estar vacío',
    },
    carrera: {
      'string.base': '"descripcion" debe ser un número',
      'string.empty': '"descripcion" no puede estar vacío',
    },
    materia: {
      'number.base': '" ID Materia" debe ser un numero',
      'number.empty': '"ID Materia" no puede estar vacío',
    },
  };