import API from "../Api";

export const getGroup = async () => {
  try {
    const response = await API.get("/api/grupo");
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}