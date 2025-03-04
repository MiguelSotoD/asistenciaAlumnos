import API from "../Api";

export const getGroupId = async (id) => {
  try {
    const response = await API.get(`/api/grupo/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching group:', error);
    return error.response.data;
  }
}