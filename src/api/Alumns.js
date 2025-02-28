import API from "../Api";

export const getAlumns = async () => {
  try {
    const response = await API.get("/api/alumno");
    return response.data;
  } catch (error) {
    console.error('Error fetching alumns:', error);
    return error.response.data;
  }
}