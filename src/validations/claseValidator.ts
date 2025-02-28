// Guardar errores de validacion de celebrate en un json
export const validationClase = {
    id: {
   'number.base': '" ID" debe ser un numero',
   'number.empty': '"ID" no puede estar vacío',
    },
    grupo_id: {
      'string.base': '"nombre" debe ser un número',
      'string.max': '"nombre" no puede exceder los 250 caracteres',
    },
    fecha: {
      'date.base': '"Fecha" debe ser una fecha',
      'date.empty': '"Fecha" es requerido',
    },
  };