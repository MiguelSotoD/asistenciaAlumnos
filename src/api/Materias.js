import API from "../Api";

export const getMaterias = async () => {
  try {
    const response = await API.get("/api/materia");
    return response.data;
  } catch (error) {
    console.error('Error fetching materias:', error);
    return error.response.data;
  }
}