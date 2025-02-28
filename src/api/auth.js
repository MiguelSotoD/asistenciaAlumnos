import API from "../Api";

export const login = async (email, password) => {
  try {
    const response = await API.post("/api/login", { email, password });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}