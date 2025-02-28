// Guardar valores de errores de validacion provenientes de celebrate en las rutas
// Guardar errores de validacion de celebrate en un json
export const validationSession = {
    id: {
   'number.base': '" ID" debe ser un numero',
   'number.empty': '"ID" no puede estar vacío',
    },
    nombre: {
      'string.base': '"nombre" debe ser una cadena de texto',
      'string.max': '"nombre" no puede exceder los 250 caracteres',
    },
    email: {
      'string.base': '"email" debe ser una cadena de Texto',
      'string.max': '"email" no puede exceder los 250 caracteres',
      'string.email': '"email" debe ser un correo valido',
    },
    password: {
      'string.base': '"Password" debe ser mayor a 6 caracteres',
      'string.empty': '"Password" no puede estar vacío',
    },
  };