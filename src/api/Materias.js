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
export const postMateria = async (data) => {
  try {
    const response = await API.post("/api/materia/nueva", data);
    return response.data;
  } catch (error) {
    console.error('Error creating materia:', error);
    return error.response.data;
  }
}