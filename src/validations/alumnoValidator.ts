// Guardar errores de validacion de celebrate en un json
export const validationAlumno = {
    id: {
      'number.base': '" ID" debe ser un numero',
      'number.empty': '"ID" no puede estar vacío',
    },
    nombre: {
      'number.base': '"nombre" debe ser una cadena de texto',
      'number.max': '"nombre" no puede exceder los 250 caracteres',
    },
    apellido_paterno: {
      'number.base': '"apellido_paterno" debe ser una cadena de texto',
      'number.max': '"apellido_paterno" no puede exceder los 250 caracteres',
    },
    apellido_materno: {
      'number.base': '"apellido_materno" debe ser una cadena de texto',
      'number.max': '"apellido_materno" no puede exceder los 250 caracteres',
    },
  };