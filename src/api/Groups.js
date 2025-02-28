import API from "../Api";

export const getGroup = async () => {
  try {
    const response = await API.get("/api/grupo");
    return response.data;
  } catch (error) {
    console.error('Error fetching group:', error);
    return error.response.data;
  }
}

export const postGroup = async (data) => {
  try {
    const response = await API.post("/api/grupo/nuevo", data);
    return response.data;
  } catch (error) {
    console.error('Error creating group:', error);
    return error.response.data;
  }
}