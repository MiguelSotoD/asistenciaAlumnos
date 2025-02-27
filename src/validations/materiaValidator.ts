// Guardar errores de validacion de celebrate en un json
export const validationMateria = {
    id: {
   'number.base': '" ID" debe ser un numero',
   'number.empty': '"ID" no puede estar vacío',
    },
    nombre: {
      'string.base': '"nombre" debe ser un número',
      'string.max': '"nombre" no puede exceder los 250 caracteres',
    },
    horas: {
      'number.base': '"carrera" debe ser una cadena de Texto',
      'number.max': '"carrera" no puede exceder los 250 caracteres',
    },
    profesor: {
      'number.base': '" ID Profesor" debe ser un numero',
      'number.empty': '"ID Profesor" no puede estar vacío',
    },
  };