// Guardar errores de validacion de celebrate en un json
export const validationGroup = {
    nombre: {
      'number.base': '"nombre" debe ser un número',
      'number.max': '"nombre" no puede exceder los 250 caracteres',
    },
    carrera: {
      'string.base': '"carrera" debe ser una cadena de Texto',
      'string.max': '"carrera" no puede exceder los 250 caracteres',
    },
    materia: {
      'number.base': '" ID Materia" debe ser un numero',
      'number.empty': '"ID Materia" no puede estar vacío',
    },
  };