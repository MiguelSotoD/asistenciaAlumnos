import API from "../Api";

export const sendRecoverPasswordEmail = async (email) => {
  try {
    const response = await API.post("/api/auth/recuperarContrasena", { email });
    return response.data;
  } catch (error) {
    console.error("Error enviando correo de recuperación:", error);
    return error.response?.data || { message: "Error al enviar la solicitud." };
  }
};

export const resetPassword = async (token, newPassword) => {
    try {
      const response = await API.post(`/api/auth/recuperarContrasena/:token`, {
        token,
        newPassword,
      });
      return response.data;
    } catch (error) {
      console.error("Error restableciendo la contraseña:", error);
      return error.response?.data || { message: "Error al restablecer la contraseña." };
    }
  };
